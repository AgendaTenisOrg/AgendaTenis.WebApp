import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioCadastroRequest } from './usuario-cadastro-request.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioCadastroService {
  private apiUrl = `${environment.identityServer}/Identity/CriarConta`;

  constructor(private http: HttpClient) { }

  cadastrar(dados: UsuarioCadastroRequest): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'accept': '*/*'
    });

    return this.http.post<any>(this.apiUrl, JSON.stringify(dados), { headers });
  }
}
