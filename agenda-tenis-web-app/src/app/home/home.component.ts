import { Component, OnInit } from '@angular/core';
import { HistoricoPartidasService, RegistrarPlacarRequest } from './historico-partidas.service';
import { Partida } from './historico-partidas.model';
import { UtilsService } from '../shared/services/utils.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  partidas: Partida[] = [];
  pagina: number = 1;
  itensPorPagina: number = 10;
  totalDeItens: number = 0;
  totalDePaginas: number = 0;
  usuarioId: string | null = null;
  modalAberto: boolean = false;
  partidaSelecionada: Partida | null = null;
  sets: any[] = [
    {
      numeroSet: 1,
      gamesDesafiante: 0,
      gamesAdversario: 0,
      tiebreakDesafiante: 0,
      tiebreakAdversario: 0
    }
  ];

  constructor(
    private historicoPartidasService: HistoricoPartidasService,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.usuarioId = this.utilsService.obterUsuarioId();
    console.log('Usuário logado com ID:', this.usuarioId);
    this.obterHistorico();
  }

  obterHistorico(): void {
    this.historicoPartidasService.obterHistorico(this.pagina, this.itensPorPagina).subscribe(response => {
      this.partidas = response.partidas;
      this.totalDeItens = response.totalDeItens;
      this.totalDePaginas = Math.ceil(this.totalDeItens / this.itensPorPagina);
      console.log('Partidas:', this.partidas);
    });
  }

  aceitarConvite(id: string): void {
    console.log(`Tentando aceitar o convite para a partida com ID: ${id}`);
    this.historicoPartidasService.aceitarConvite(id).subscribe(() => {
      this.obterHistorico();
      console.log(`Convite aceito para a partida com ID: ${id}`);
    });
  }

  abrirModal(partida: Partida): void {
    this.partidaSelecionada = partida;
    this.modalAberto = true;
  }

  fecharModal(): void {
    this.modalAberto = false;
    this.partidaSelecionada = null;
    this.sets = [
      {
        numeroSet: 1,
        gamesDesafiante: 0,
        gamesAdversario: 0,
        tiebreakDesafiante: 0,
        tiebreakAdversario: 0
      }
    ];
  }

  adicionarSet(): void {
    this.sets.push({
      numeroSet: this.sets.length + 1,
      gamesDesafiante: 0,
      gamesAdversario: 0,
      tiebreakDesafiante: 0,
      tiebreakAdversario: 0
    });
  }

  registrarPlacar(form: NgForm): void {
    if (form.valid && this.partidaSelecionada) {
      const request: RegistrarPlacarRequest = {
        id: this.partidaSelecionada.id,
        vencedorId: form.value.vencedorId,
        sets: this.sets
      };

      this.historicoPartidasService.registrarPlacar(request).subscribe(response => {
        window.alert('Placar registrado com sucesso');
        this.fecharModal();
        this.obterHistorico();
      }, error => {
        window.alert('Erro ao registrar placar: ' + error.error);
      });
    }
  }

  mostrarRegistrarPlacar(partida: Partida): boolean {
    const dataAtual = new Date();
    const dataPartida = new Date(partida.dataDaPartida);
    return partida.statusConvite.id === 2 && dataAtual > dataPartida && this.usuarioId !== null && +this.usuarioId === partida.desafianteId;
  }

  paginaAnterior(): void {
    if (this.pagina > 1) {
      this.pagina--;
      this.obterHistorico();
    }
  }

  proximaPagina(): void {
    if (this.pagina < this.totalDePaginas) {
      this.pagina++;
      this.obterHistorico();
    }
  }
}
