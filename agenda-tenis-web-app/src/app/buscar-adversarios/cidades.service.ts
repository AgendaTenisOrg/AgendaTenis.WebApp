import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UtilsService } from '../shared/services/utils.service';

export interface Cidade {
  id: number;
  nome: string;
}

export interface BuscarCidadesResponse {
  cidades: Cidade[];
  totalDeItens: number;
}

@Injectable({
  providedIn: 'root'
})
export class CidadesService extends UtilsService {
  private apiUrl = `${environment.cidades}/Cidades/obter`;

  constructor(http: HttpClient) {
    super(http);
  }

  buscarCidades(parteNome: string, page: number = 1, itemsPerPage: number = 10): Observable<Cidade[]> {
    const headers = this.obterTokenHeader().set('Content-Type', 'application/json');
    const url = `${this.apiUrl}?page=${page}&itemsPerPage=${itemsPerPage}&parteNome=${parteNome}`;
    console.log('URL para buscar cidades:', url);  // Verificar a URL construída
    return this.http.get<Cidade[]>(url, { headers });
  }
}
