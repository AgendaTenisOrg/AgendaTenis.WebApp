import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { UsuarioLoginRequest } from './usuario-login-request.model';
import { environment } from '../../environments/environment';
import { JogadorResumoService } from '../shared/services/jogador-resumo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioLoginService {
  private apiUrl = `${environment.identityServer}/Identity/GerarToken`;

  constructor(private http: HttpClient, private jogadorResumoService: JogadorResumoService) { }

  login(dados: UsuarioLoginRequest): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'accept': '*/*'
    });

    return this.http.post<any>(this.apiUrl, JSON.stringify(dados), { headers }).pipe(
      tap(response => {
        this.armazenarToken(response.token);
      }),
      switchMap(() => this.jogadorResumoService.obterResumo()),  // Fetch jogador resumo after login
      tap(resumo => {
        this.jogadorResumoService.atualizarResumo(resumo);
      })
    );
  }

  armazenarToken(token: string): void {
    localStorage.setItem('token', token);
  }
}
