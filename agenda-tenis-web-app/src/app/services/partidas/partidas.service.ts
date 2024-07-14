import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HistoricoDePartidasResponse, Partida } from './models/historico-partidas.response';
import { environment } from '../../../environments/environment';
import { TokenService } from '../token/token.service';
import { RegistrarPlacarRequest } from './models/registrar-placar.request';
import { ResponderPlacarRequest } from './models/responder.placar.request';

@Injectable({
  providedIn: 'root'
})
export class PartidasService {
  private apiUrl = `${environment.partidas}/Partidas`;

  constructor(private http: HttpClient, private tokenService: TokenService) {
  }

  obterHistorico(pagina: number, itensPorPagina: number): Observable<HistoricoDePartidasResponse> {
    const headers = this.tokenService.obterTokenHeader().set('Content-Type', 'application/json');
    const url = `${this.apiUrl}/historico?pagina=${pagina}&itensPorPagina=${itensPorPagina}`;
    return this.http.get<HistoricoDePartidasResponse>(url, { headers });
  }

  aceitarConvite(id: string): Observable<any> {
    const headers = this.tokenService.obterTokenHeader().set('Content-Type', 'application/json');
    const url = `${this.apiUrl}/Convites/Responder`;
    const body = { id, aceitar: true };
    return this.http.put<any>(url, body, { headers });
  }

  registrarPlacar(request: RegistrarPlacarRequest): Observable<any> {
    const headers = this.tokenService.obterTokenHeader().set('Content-Type', 'application/json');
    const url = `${this.apiUrl}/Placar/Registrar`;
    return this.http.put<any>(url, request, { headers });
  }

  responderPlacar(request: ResponderPlacarRequest): Observable<any> {
    const headers = this.tokenService.obterTokenHeader().set('Content-Type', 'application/json');
    const url = `${this.apiUrl}/Placar/Responder`;
    return this.http.put<any>(url, request, { headers });
  }

  convidarAdversario(convite: any): Observable<any> {
    const headers = this.tokenService.obterTokenHeader().set('Content-Type', 'application/json');
    return this.http.post<any>(`${this.apiUrl}/Convites/Convidar`, JSON.stringify(convite), { headers });
  }
}