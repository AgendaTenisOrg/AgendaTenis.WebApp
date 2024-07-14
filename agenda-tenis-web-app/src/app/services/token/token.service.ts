import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(protected http: HttpClient) { }

  public obterTokenHeader(): HttpHeaders {
    const token: string = localStorage.getItem('token') as string;
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  public obterToken(): string | null {
    return localStorage.getItem('token');
  }

  public obterUsuarioId(): string | null {
    const token = this.obterToken();
    if (!token) {
      return null;
    }
    const decodedToken: any = jwtDecode(token);
    return decodedToken.unique_name || null;
  }

  public logout(): void {
    localStorage.removeItem('token');
  }

  public armazenarToken(token: string): void {
    localStorage.setItem('token', token);
  }
}
