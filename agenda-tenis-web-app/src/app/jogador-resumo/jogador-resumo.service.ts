import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UtilsService } from '../shared/services/utils.service';

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

  obterResumo(): Observable<JogadorResumo> {
    const headers = this.obterTokenHeader().set('Content-Type', 'application/json');
    return this.http.get<JogadorResumo>(this.apiUrl, { headers });
  }
}
