import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioLoginService } from './usuario-login.service';
import { UsuarioLoginRequest } from './usuario-login-request.model';

@Component({
  selector: 'app-usuario-login',
  templateUrl: './usuario-login.component.html',
  styleUrls: ['./usuario-login.component.css']
})
export class UsuarioLoginComponent {
  constructor(private usuarioLoginService: UsuarioLoginService) { }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const loginRequest: UsuarioLoginRequest = {
        email: form.value.email,
        senha: form.value.senha
      };

      this.usuarioLoginService.login(loginRequest).subscribe(
        response => {
          this.usuarioLoginService.armazenarToken(response.token);
          window.alert('Login realizado com sucesso');
          form.reset();
        },
        error => {
          window.alert('Erro ao realizar login: ' + error.error);
        }
      );
    }
  }
}
