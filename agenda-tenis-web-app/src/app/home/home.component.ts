import { Component, OnInit } from '@angular/core';
import { HistoricoPartidasService } from './historico-partidas.service';
import { Partida } from './historico-partidas.model';
import { UtilsService } from '../shared/services/utils.service';

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
