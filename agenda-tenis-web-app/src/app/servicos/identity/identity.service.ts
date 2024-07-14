import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsuarioLoginRequest } from './models/usuario-login-request';
import { Observable } from 'rxjs';
import { UsuarioCadastroRequest } from './models/usuario-cadastro.request';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  private apiUrl = `${environment.identityServer}/Identity`;

  constructor(private http: HttpClient) { }

  login(dados: UsuarioLoginRequest): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'accept': '*/*'
    });

    return this.http.post<any>(`${this.apiUrl}/gerartoken`, JSON.stringify(dados), { headers });
  }

  cadastrar(dados: UsuarioCadastroRequest): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'accept': '*/*'
    });

    return this.http.post<any>(`${this.apiUrl}/CriarConta`, JSON.stringify(dados), { headers });
  }
}
