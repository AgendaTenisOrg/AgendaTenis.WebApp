import { Component, OnInit } from '@angular/core';
import { JogadoresService } from 'src/app/servicos/jogadores/jogadores.service';
import { JogadorResumo } from 'src/app/servicos/jogadores/models/jogador-resumo.response';

@Component({
  selector: 'app-jogador-resumo',
  templateUrl: './jogador-resumo.component.html',
  styleUrls: ['./jogador-resumo.component.css']
})
export class JogadorResumoComponent implements OnInit {
  jogadorResumo: JogadorResumo | null = null;

  categorias = [
    { valor: 1, descricao: 'ATP' },
    { valor: 2, descricao: 'Avançado' },
    { valor: 3, descricao: 'Intermediário' },
    { valor: 4, descricao: 'Iniciante' }
  ];

  constructor(private jogadoresService: JogadoresService) {}

  ngOnInit(): void {
    this.jogadoresService.obterResumo().subscribe(
      (resumo) => {
        this.jogadorResumo = resumo;
      },
      (error) => {
        console.error('Erro ao buscar o resumo do jogador', error);
      }
    );
  }

  getCategoriaDescricao(valor: number): string {
    const categoria = this.categorias.find(cat => cat.valor === valor);
    return categoria ? categoria.descricao : 'Desconhecida';
  }
}
