import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UtilsService } from '../shared/services/utils.service';
import { UsuarioCompletarPerfilRequest } from './usuario-completar-perfil-request.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioCompletarPerfilService extends UtilsService {
  private apiUrl = `${environment.jogadores}/Jogadores/Perfil/Completar`;

  completarPerfil(dados: UsuarioCompletarPerfilRequest): Observable<any> {
   const headers = this.obterTokenHeader().set('Content-Type', 'application/json');

    return this.http.post<any>(this.apiUrl, JSON.stringify(dados), { headers: headers });
  }
}
