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
  private resumoSubject = new BehaviorSubject<JogadorResumo | null>(null);

  resumo$ = this.resumoSubject.asObservable();

  constructor(http: HttpClient) {
    super(http);
  }

  obterResumo(): Observable<JogadorResumo> {
    const headers = this.obterTokenHeader().set('Content-Type', 'application/json');
    return this.http.get<JogadorResumo>(this.apiUrl, { headers });
  }

  atualizarResumo(resumo: JogadorResumo): void {
    this.resumoSubject.next(resumo);
  }
}
