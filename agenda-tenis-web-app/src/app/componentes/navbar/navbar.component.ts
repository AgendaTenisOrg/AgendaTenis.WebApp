import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router, private utilsService: TokenService) { }

  logout(): void {
    this.utilsService.logout();
    this.router.navigate(['/login']);
    window.location.reload();
  }
}
