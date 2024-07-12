import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UtilsService } from '../services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class IsAnonymousGuard implements CanActivate {

  constructor(private utilsService: UtilsService, private router: Router) {}

  canActivate(): boolean {
    const token = this.utilsService.obterToken();
    
    if (token) {
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }
}
