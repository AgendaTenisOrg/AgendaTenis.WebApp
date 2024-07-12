import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ObterHistoricoDePartidasResponse } from './historico-partidas.model';
import { environment } from '../../environments/environment';
import { UtilsService } from '../shared/services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class HistoricoPartidasService extends UtilsService {
  private apiUrl = `${environment.partidas}/Partidas/Historico`;

  constructor(http: HttpClient) {
    super(http);
  }

  obterHistorico(pagina: number, itensPorPagina: number): Observable<ObterHistoricoDePartidasResponse> {
    const headers = this.obterTokenHeader().set('Content-Type', 'application/json');
    const url = `${this.apiUrl}?pagina=${pagina}&itensPorPagina=${itensPorPagina}`;
    return this.http.get<ObterHistoricoDePartidasResponse>(url, { headers });
  }

  aceitarConvite(id: string): Observable<any> {
    const headers = this.obterTokenHeader().set('Content-Type', 'application/json');
    const url = `${environment.partidas}/Partidas/Convites/Responder`;
    const body = { id, aceitar: true };
    return this.http.put<any>(url, body, { headers });
  }

  registrarPlacar(request: RegistrarPlacarRequest): Observable<any> {
    const headers = this.obterTokenHeader().set('Content-Type', 'application/json');
    const url = `${environment.partidas}/Partidas/Placar/Registrar`;
    return this.http.put<any>(url, request, { headers });
  }

  responderPlacar(request: ResponderPlacarRequest): Observable<any> {
    const headers = this.obterTokenHeader().set('Content-Type', 'application/json');
    const url = `${environment.partidas}/Partidas/Placar/Responder`;
    return this.http.put<any>(url, request, { headers });
  }
}

export interface RegistrarPlacarRequest {
  id: string;
  vencedorId: number;
  sets: {
    numeroSet: number;
    gamesDesafiante: number;
    gamesAdversario: number;
    tiebreakDesafiante: number | null;
    tiebreakAdversario: number | null;
  }[];
}

export interface ResponderPlacarRequest {
  id: string;
  confirmarPlacar: boolean;
}
