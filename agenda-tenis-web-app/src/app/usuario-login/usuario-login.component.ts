import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioLoginService } from './usuario-login.service';
import { UsuarioLoginRequest } from './usuario-login-request.model';

@Component({
  selector: 'app-usuario-login',
  templateUrl: './usuario-login.component.html',
  styleUrls: ['./usuario-login.component.css']
})
export class UsuarioLoginComponent {
  constructor(private usuarioLoginService: UsuarioLoginService, private router: Router) { }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const loginRequest: UsuarioLoginRequest = {
        email: form.value.email,
        senha: form.value.senha
      };

      this.usuarioLoginService.login(loginRequest).subscribe(
        response => {
          window.alert('Login realizado com sucesso');
          form.reset();
          this.router.navigate(['/']);
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
