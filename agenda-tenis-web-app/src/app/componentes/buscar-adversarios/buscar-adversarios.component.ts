import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BuscarAdversariosResponse, Adversario, CategoriaEnum } from '../../services/partidas/models/buscar-adversarios.reponse';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CidadesService } from 'src/app/services/cidades/cidades.service';
import { CidadeResponse } from 'src/app/services/cidades/models/cidade.response';
import { JogadorResumo } from 'src/app/services/jogadores/models/jogador-resumo.response';
import { JogadoresService } from 'src/app/services/jogadores/jogadores.service';
import { PartidasService } from 'src/app/services/partidas/partidas.service';

@Component({
  selector: 'app-buscar-adversarios',
  templateUrl: './buscar-adversarios.component.html',
  styleUrls: ['./buscar-adversarios.component.css']
})
export class BuscarAdversariosComponent implements OnInit {
  adversarios: Adversario[] = [];
  cidades: CidadeResponse[] = [];
  cidadeInput$ = new Subject<string>();
  cidadeModalInput$ = new Subject<string>(); // Novo Subject para o campo Cidade do modal
  pagina: number = 1;
  itensPorPagina: number = 10;
  totalDeItens: number = 0;
  totalDePaginas: number = 0;
  idCidade: number | null = null; // Armazenar o ID da cidade
  nomeCidade: string = ''; // Campo para exibir o nome da cidade
  nomeCidadeModal: string = ''; // Campo para exibir o nome da cidade no modal
  categoria: number | null = null; // Campo para categoria
  modalAberto: boolean = false;
  adversarioSelecionado: Adversario | null = null;
  cidadeSelecionada: number | null = null;
  modeloSelecionado: number | null = null;
  jogadorResumo: JogadorResumo | null = null;

  categorias = [
    { valor: null, descricao: 'Todos' }, // Adiciona a opção "Todos"
    { valor: CategoriaEnum.Atp, descricao: 'ATP' },
    { valor: CategoriaEnum.Avancado, descricao: 'Avançado' },
    { valor: CategoriaEnum.Intermediario, descricao: 'Intermediário' },
    { valor: CategoriaEnum.Iniciante, descricao: 'Iniciante' }
  ];

  modelosPartida = [
    { valor: 1, descricao: 'Set Único' },
    { valor: 2, descricao: 'Melhor de Três Sets' },
    { valor: 3, descricao: 'Melhor de Cinco Sets' }
  ];

  constructor(
    private partidasService: PartidasService,
    private cidadesService: CidadesService,
    private jogadoresService: JogadoresService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buscarAdversarios();

    this.cidadeInput$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(parteNome => this.cidadesService.buscarCidades(parteNome))
    ).subscribe(response => {
      console.log('Cidades recebidas:', response);
      this.cidades = response || [];
    });

    this.cidadeModalInput$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(parteNome => this.cidadesService.buscarCidades(parteNome))
    ).subscribe(response => {
      console.log('Cidades do modal recebidas:', response);
      this.cidades = response || [];
    });
  }

  buscarAdversarios(): void {
    const idCidadeStr = this.idCidade !== null ? this.idCidade.toString() : '';
    this.jogadoresService.buscarAdversarios(this.pagina, this.itensPorPagina, idCidadeStr, this.categoria).subscribe(response => {
      this.adversarios = response.adversarios;
      this.totalDeItens = response.totalDeItens;
      this.totalDePaginas = Math.ceil(this.totalDeItens / this.itensPorPagina);
    });
  }

  abrirModal(adversario: Adversario): void {
    this.adversarioSelecionado = adversario;
    this.modalAberto = true;
  }

  fecharModal(): void {
    this.modalAberto = false;
    this.adversarioSelecionado = null;
    this.cidadeSelecionada = null;
    this.modeloSelecionado = null;
    this.nomeCidadeModal = '';
    this.cidades = [];
  }

  async convidar(): Promise<void> {
    try {
      this.jogadorResumo = await this.jogadoresService.obterResumoAsync();
      console.log(this.jogadorResumo);

      if (this.adversarioSelecionado && this.cidadeSelecionada && this.modeloSelecionado !== null) {
        const convite = {
          desafianteNome: this.jogadorResumo?.nomeCompleto || 'Desafiante', // Use o nome completo do jogador
          adversarioId: this.adversarioSelecionado.usuarioId,
          adversarioNome: this.adversarioSelecionado.nomeCompleto,
          dataDaPartida: new Date().toISOString(),
          idCidade: this.cidadeSelecionada,
          modeloDaPartida: Number(this.modeloSelecionado) // Assegura que é um número inteiro
        };

        // Chamada à API
        this.partidasService.convidarAdversario(convite).subscribe(response => {
          this.fecharModal();
          this.router.navigate(['/']);
        });
      }
    } catch (error) {
      console.error('Erro ao obter o resumo do jogador:', error);
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

  onCidadeModalInput(event: Event): void { // Novo método para o campo Cidade do modal
    const input = event.target as HTMLInputElement;
    const parteNome = input.value;
    console.log('Parte do nome digitado no modal:', parteNome);
    if (parteNome.length >= 3) { // Consultar quando pelo menos 3 caracteres foram digitados
      this.cidadeModalInput$.next(parteNome);
    }
  }

  selecionarCidade(cidade: CidadeResponse): void {
    console.log('Cidade selecionada:', cidade);
    this.idCidade = cidade.id;
    this.nomeCidade = cidade.nome;
    this.cidades = [];
  }

  selecionarCidadeModal(cidade: CidadeResponse): void { // Novo método para selecionar cidade no modal
    console.log('Cidade selecionada no modal:', cidade);
    this.cidadeSelecionada = cidade.id;
    this.nomeCidadeModal = cidade.nome;
    this.cidades = [];
  }

  paginaAnterior(): void {
    if (this.pagina > 1) {
      this.pagina--;
      this.buscarAdversarios();
    }
  }

  proximaPagina(): void {
    if (this.pagina < this.totalDePaginas) {
      this.pagina++;
      this.buscarAdversarios();
    }
  }
}
