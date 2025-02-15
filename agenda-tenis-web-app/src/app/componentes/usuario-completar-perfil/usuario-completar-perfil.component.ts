import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioCompletarPerfilRequest } from '../../servicos/jogadores/models/usuario-completar-perfil.request';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { CidadesService } from 'src/app/servicos/cidades/cidades.service';
import { CidadeResponse } from 'src/app/servicos/cidades/models/cidade.response';
import { JogadoresService } from 'src/app/servicos/jogadores/jogadores.service';

@Component({
  selector: 'app-usuario-completar-perfil',
  templateUrl: './usuario-completar-perfil.component.html',
  styleUrls: ['./usuario-completar-perfil.component.css']
})
export class UsuarioCompletarPerfilComponent implements OnInit {
  cidades: CidadeResponse[] = [];
  cidadeInput$ = new Subject<string>();
  idCidade: number | null = null;
  nomeCidade: string = '';

  constructor(
    private jogadoresService: JogadoresService,
    private cidadesService: CidadesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cidadeInput$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(parteNome => this.cidadesService.buscarCidades(parteNome))
    ).subscribe(response => {
      console.log('Cidades recebidas:', response);
      this.cidades = response || [];
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const dataNascimento = new Date(form.value.dataNascimento);
      const dataNascimentoUTC = new Date(Date.UTC(
        dataNascimento.getFullYear(),
        dataNascimento.getMonth(),
        dataNascimento.getDate()
      )).toISOString();

      const completarPerfilRequest: UsuarioCompletarPerfilRequest = {
        nome: form.value.nome,
        sobrenome: form.value.sobrenome,
        dataNascimento: dataNascimentoUTC,
        telefone: form.value.telefone,
        idCidade: this.idCidade!,
        maoDominante: form.value.maoDominante,
        backhand: form.value.backhand,
        estiloDeJogo: form.value.estiloDeJogo
      };

      this.jogadoresService.completarPerfil(completarPerfilRequest).subscribe(
        response => {
          window.alert('Perfil completado com sucesso');
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });
        },
        error => {
          window.alert('Erro ao completar perfil: ' + error.error);
        }
      );
    }
  }

  onCidadeInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const parteNome = input.value;
    console.log('Parte do nome digitado:', parteNome);
    if (parteNome.length >= 3) { // Consultar quando pelo menos 3 caracteres foram digitados
      this.cidadeInput$.next(parteNome);
    }
  }

  selecionarCidade(cidade: CidadeResponse): void {
    console.log('Cidade selecionada:', cidade);
    this.idCidade = cidade.id;
    this.nomeCidade = cidade.nome;
    this.cidades = [];
  }
}
