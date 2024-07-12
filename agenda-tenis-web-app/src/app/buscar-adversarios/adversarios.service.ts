import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BuscarAdversariosResponse } from './adversarios.model';
import { environment } from '../../environments/environment';
import { UtilsService } from '../shared/services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class AdversariosService extends UtilsService {
  private apiUrl = `${environment.jogadores}/Jogadores/Adversarios/Buscar`;
  private conviteUrl = `${environment.partidas}/Partidas/Convites/Convidar`;

  constructor(http: HttpClient) {
    super(http);
  }

  buscarAdversarios(pagina: number, itensPorPagina: number, idCidade: string, categoria: number | null): Observable<BuscarAdversariosResponse> {
    const headers = this.obterTokenHeader().set('Content-Type', 'application/json');
    let url = `${this.apiUrl}?pagina=${pagina}&itensPorPagina=${itensPorPagina}&idCidade=${idCidade}`;
    if (categoria !== null) {
      url += `&categoria=${categoria}`;
    }
    return this.http.get<BuscarAdversariosResponse>(url, { headers });
  }

  convidarAdversario(convite: any): Observable<any> {
    const headers = this.obterTokenHeader().set('Content-Type', 'application/json');
    return this.http.post<any>(this.conviteUrl, JSON.stringify(convite), { headers });
  }
}
