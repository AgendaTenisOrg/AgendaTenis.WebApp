import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioCompletarPerfilRequest } from '../../services/jogadores/models/usuario-completar-perfil.request';
import { TokenService } from 'src/app/services/token/token.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioCompletarPerfilService extends TokenService {
  private apiUrl = `${environment.jogadores}/Jogadores/Perfil/Completar`;

  completarPerfil(dados: UsuarioCompletarPerfilRequest): Observable<any> {
   const headers = this.obterTokenHeader().set('Content-Type', 'application/json');

    return this.http.post<any>(this.apiUrl, JSON.stringify(dados), { headers: headers });
  }
}
