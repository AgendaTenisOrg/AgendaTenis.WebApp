import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { JogadoresService } from '../servicos/jogadores/jogadores.service';

@Injectable({
  providedIn: 'root'
})
export class NaoPermitePerfilCompletoGuard implements CanActivate {

  constructor(private jogadoresService: JogadoresService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.jogadoresService.isPerfilCompleto().pipe(
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
