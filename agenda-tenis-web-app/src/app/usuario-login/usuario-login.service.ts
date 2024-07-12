import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioLoginRequest } from './usuario-login-request.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioLoginService {
  private apiUrl = `${environment.identityServer}/Identity/GerarToken`;

  constructor(private http: HttpClient) { }

  login(dados: UsuarioLoginRequest): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'accept': '*/*'
    });

    return this.http.post<any>(this.apiUrl, JSON.stringify(dados), { headers });
  }

  armazenarToken(token: string): void {
    localStorage.setItem('token', token);
  }
}
