import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../token/token.service';
import { environment } from 'src/environments/environment';
import { CidadeResponse } from './models/cidade.response';



@Injectable({
  providedIn: 'root'
})
export class CidadesService {
  private apiUrl = `${environment.cidades}/Cidades`;

  constructor(private http: HttpClient, private tokenService: TokenService) {
  }

  buscarCidades(parteNome: string, page: number = 1, itemsPerPage: number = 10): Observable<CidadeResponse[]> {
    const headers = this.tokenService.obterTokenHeader().set('Content-Type', 'application/json');
    const url = `${this.apiUrl}/obter?page=${page}&itemsPerPage=${itemsPerPage}&parteNome=${parteNome}`;
    console.log('URL para buscar cidades:', url);  // Verificar a URL construída
    return this.http.get<CidadeResponse[]>(url, { headers });
  }
}
