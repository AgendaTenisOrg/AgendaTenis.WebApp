import { Component, OnInit } from '@angular/core';
import { PartidasService } from '../../servicos/partidas/partidas.service';
import { Partida } from '../../servicos/partidas/models/historico-partidas.response';
import { TokenService } from '../../servicos/token/token.service';
import { NgForm } from '@angular/forms';
import { RegistrarPlacarRequest } from 'src/app/servicos/partidas/models/registrar-placar.request';
import { ResponderPlacarRequest } from 'src/app/servicos/partidas/models/responder.placar.request';

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
  modalDetalhesAberto: boolean = false;
  modalConfirmacaoAberto: boolean = false;
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
    private historicoPartidasService: PartidasService,
    private utilsService: TokenService
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
      this.fecharModal();
      window.location.reload(); // Recarregar a página
      console.log(`Convite aceito para a partida com ID: ${id}`);
    });
  }

  abrirModal(partida: Partida): void {
    this.partidaSelecionada = partida;
    this.modalAberto = true;
  }

  abrirModalDetalhes(partida: Partida): void {
    this.partidaSelecionada = partida;
    this.modalDetalhesAberto = true;
  }

  fecharModal(): void {
    this.modalAberto = false;
    this.modalDetalhesAberto = false;
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
        vencedorId: +form.value.vencedor,
        sets: this.sets
      };

      this.historicoPartidasService.registrarPlacar(request).subscribe(response => {
        window.alert('Placar registrado com sucesso');
        this.fecharModal();
        window.location.reload(); // Recarregar a página
      }, error => {
        window.alert('Erro ao registrar placar: ' + error.error);
      });
    }
  }

  mostrarRegistrarPlacar(partida: Partida): boolean {
    const dataAtual = new Date();
    const dataPartida = new Date(partida.dataDaPartida);
    return partida.statusConvite.id === 2 && dataAtual > dataPartida && this.usuarioId !== null && +this.usuarioId === partida.desafianteId && partida.statusPlacar.id === 0;
  }

  responderPlacar(id: string | null, confirmarPlacar: boolean): void {
    if (id) {
      const request: ResponderPlacarRequest = {
        id,
        confirmarPlacar
      };
      this.historicoPartidasService.responderPlacar(request).subscribe(response => {
        window.alert('Resposta ao placar enviada com sucesso');
        this.fecharModal();
        window.location.reload(); // Recarregar a página
      }, error => {
        window.alert('Erro ao responder ao placar: ' + error.error);
      });
    }
  }

  getVencedorNome(partida: Partida): string {
    if (partida.vencedorId === partida.desafianteId) {
      return partida.desafianteNome || 'Desafiante';
    } else if (partida.vencedorId === partida.adversarioId) {
      return partida.adversarioNome || 'Adversário';
    } else {
      return 'N/A';
    }
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
