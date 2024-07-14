import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { JogadorResumo } from './models/jogador-resumo.response';
import { Observable } from 'rxjs';
import { UsuarioCompletarPerfilRequest } from './models/usuario-completar-perfil.request';
import { BuscarAdversariosResponse } from '../partidas/models/buscar-adversarios.reponse';

@Injectable({
  providedIn: 'root'
})
export class JogadoresService {

  private apiUrl = `${environment.jogadores}/Jogadores`;

  constructor(private http: HttpClient, private tokenService: TokenService) {
  }

  async obterResumoAsync(): Promise<JogadorResumo> {
    const headers = this.tokenService.obterTokenHeader().set('Content-Type', 'application/json');
    try {
      const resumo = await this.http.get<JogadorResumo>(`${this.apiUrl}/Resumo`, { headers }).toPromise();
      return resumo!;
    } catch (error) {
      console.error('Erro ao obter resumo do jogador:', error);
      throw new Error('Erro ao obter resumo do jogador');
    }
  }
  
  obterResumo(): Observable<JogadorResumo> {
    const headers = this.tokenService.obterTokenHeader().set('Content-Type', 'application/json');
    return this.http.get<JogadorResumo>(`${this.apiUrl}/Resumo`, { headers });
  }

  completarPerfil(dados: UsuarioCompletarPerfilRequest): Observable<any> {
    const headers = this.tokenService.obterTokenHeader().set('Content-Type', 'application/json');
 
     return this.http.post<any>(`${this.apiUrl}/Perfil/Completar`, JSON.stringify(dados), { headers: headers });
   }

  isPerfilCompleto(): Observable<boolean> {
    const headers = this.tokenService.obterTokenHeader().set('Content-Type', 'application/json');
    return this.http.get<boolean>(`${this.apiUrl}/Perfil/Completo`, { headers });
  }

  
  buscarAdversarios(pagina: number, itensPorPagina: number, idCidade: string, categoria: number | null): Observable<BuscarAdversariosResponse> {
    const headers = this.tokenService.obterTokenHeader().set('Content-Type', 'application/json');
    let url = `${this.apiUrl}/Adversarios/Buscar?pagina=${pagina}&itensPorPagina=${itensPorPagina}&idCidade=${idCidade}`;
    if (categoria !== null) {
      url += `&categoria=${categoria}`;
    }
    return this.http.get<BuscarAdversariosResponse>(url, { headers });
  }
}
