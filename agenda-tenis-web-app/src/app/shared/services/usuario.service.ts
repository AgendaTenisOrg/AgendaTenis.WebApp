import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends UtilsService {
  private apiUrl = `${environment.jogadores}/Jogadores/Perfil/Completo`;

  constructor(http: HttpClient) {
    super(http);
  }

  isPerfilCompleto(): Observable<boolean> {
    const headers = this.obterTokenHeader().set('Content-Type', 'application/json');
    return this.http.get<boolean>(this.apiUrl, { headers });
  }
}
