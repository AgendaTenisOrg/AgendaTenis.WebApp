import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UtilsService } from './utils.service';

export interface JogadorResumo {
  id: number;
  usuarioId: number;
  nomeCompleto: string;
  idade: number;
  pontuacao: number;
  categoria: number;
}

@Injectable({
  providedIn: 'root'
})
export class JogadorResumoService extends UtilsService {
  private apiUrl = `${environment.jogadores}/Jogadores/Resumo`;

  constructor(http: HttpClient) {
    super(http);
  }

  async obterResumo(): Promise<JogadorResumo> {
    const headers = this.obterTokenHeader().set('Content-Type', 'application/json');
    try {
      const resumo = await this.http.get<JogadorResumo>(this.apiUrl, { headers }).toPromise();
      return resumo!;
    } catch (error) {
      console.error('Erro ao obter resumo do jogador:', error);
      throw new Error('Erro ao obter resumo do jogador');
    }
  }
}
