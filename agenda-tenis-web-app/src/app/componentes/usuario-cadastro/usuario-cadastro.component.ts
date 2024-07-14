import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioCadastroRequest } from '../../servicos/identity/models/usuario-cadastro.request';
import { IdentityService } from 'src/app/servicos/identity/identity.service';

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.css']
})
export class UsuarioCadastroComponent {
  constructor(private identityService: IdentityService, private router: Router) { }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const cadastroRequest: UsuarioCadastroRequest = {
        email: form.value.email,
        senha: form.value.senha,
        senhaConfirmacao: form.value.senhaConfirmacao
      };

      this.identityService.cadastrar(cadastroRequest).subscribe(
        response => {
          window.alert('Cadastro realizado com sucesso');
          form.reset();
          this.router.navigate(['/login']); // Redirecionar para a página de login após cadastro bem-sucedido
        },
        error => {
          window.alert('Erro ao cadastrar: ' + error.error);
        }
      );
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
