import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioLoginRequest } from '../../servicos/identity/models/usuario-login-request';
import { IdentityService } from 'src/app/servicos/identity/identity.service';
import { TokenService } from 'src/app/servicos/token/token.service';

@Component({
  selector: 'app-usuario-login',
  templateUrl: './usuario-login.component.html',
  styleUrls: ['./usuario-login.component.css']
})
export class UsuarioLoginComponent {
  constructor(private identityService: IdentityService, private utilsService: TokenService, private router: Router) { }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const loginRequest: UsuarioLoginRequest = {
        email: form.value.email,
        senha: form.value.senha
      };

      this.identityService.login(loginRequest).subscribe(
        response => {
          this.utilsService.armazenarToken(response.token);
          window.alert('Login realizado com sucesso');
          form.reset();
          this.router.navigate(['/completar-perfil'])
        },
        error => {
          window.alert('Erro ao realizar login: ' + error.error);
        }
      );
    }
  }

  navigateToCadastro() {
    this.router.navigate(['/cadastro']);
  }
}
