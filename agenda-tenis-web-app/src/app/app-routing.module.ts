import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioCadastroComponent } from './usuario-cadastro/usuario-cadastro.component';
import { UsuarioLoginComponent } from './usuario-login/usuario-login.component';
import { UsuarioCompletarPerfilComponent } from './usuario-completar-perfil/usuario-completar-perfil.component';
import { HomeComponent } from './home/home.component';
import { BuscarAdversariosComponent } from './buscar-adversarios/buscar-adversarios.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cadastro', component: UsuarioCadastroComponent },
  { path: 'login', component: UsuarioLoginComponent },
  { path: 'completar-perfil', component: UsuarioCompletarPerfilComponent, canActivate: [AuthGuard] },
  { path: 'buscar-adversarios', component: BuscarAdversariosComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
