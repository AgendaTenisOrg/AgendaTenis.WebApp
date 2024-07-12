import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioCompletarPerfilService } from './usuario-completar-perfil.service';
import { UsuarioCompletarPerfilRequest } from './usuario-completar-perfil-request.model';

@Component({
  selector: 'app-usuario-completar-perfil',
  templateUrl: './usuario-completar-perfil.component.html',
  styleUrls: ['./usuario-completar-perfil.component.css']
})
export class UsuarioCompletarPerfilComponent {
  constructor(private usuarioCompletarPerfilService: UsuarioCompletarPerfilService) { }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const dataNascimento = new Date(form.value.dataNascimento);
      const dataNascimentoUTC = new Date(Date.UTC(
        dataNascimento.getFullYear(),
        dataNascimento.getMonth(),
        dataNascimento.getDate()
      )).toISOString();

      const completarPerfilRequest: UsuarioCompletarPerfilRequest = {
        nome: form.value.nome,
        sobrenome: form.value.sobrenome,
        dataNascimento: dataNascimentoUTC,
        telefone: form.value.telefone,
        idCidade: form.value.idCidade,
        maoDominante: form.value.maoDominante,
        backhand: form.value.backhand,
        estiloDeJogo: form.value.estiloDeJogo
      };

      this.usuarioCompletarPerfilService.completarPerfil(completarPerfilRequest).subscribe(
        response => {
          window.alert('Perfil completado com sucesso');
          form.reset();
        },
        error => {
          window.alert('Erro ao completar perfil: ' + error.error);
        }
      );
    }
  }
}
