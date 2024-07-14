import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class NaoPermitePerfilCompletoGuard implements CanActivate {

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.usuarioService.isPerfilCompleto().pipe(
      map((response: boolean) => {
        if (response) {
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });
          return false;
        }
        return true;
      }),
      catchError((error) => {
        console.error('Erro ao verificar perfil completo:', error);
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
        return of(false);
      })
    );
  }
}
