import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioCadastroComponent } from './componentes/usuario-cadastro/usuario-cadastro.component';
import { UsuarioLoginComponent } from './componentes/usuario-login/usuario-login.component';
import { UsuarioCompletarPerfilComponent } from './componentes/usuario-completar-perfil/usuario-completar-perfil.component';
import { HomeComponent } from './componentes/home/home.component';
import { BuscarAdversariosComponent } from './componentes/buscar-adversarios/buscar-adversarios.component';
import { AuthGuard } from './guards/auth.guard';
import { JogadorResumoComponent } from './componentes/jogador-resumo/jogador-resumo.component';
import { IsAnonymousGuard } from './guards/is-anonymous-guard.guard';
import { NaoPermitePerfilCompletoGuard } from './guards/nao-permite-perfil-completo.guard';

const routes: Routes = [
  { path: 'cadastro', component: UsuarioCadastroComponent, canActivate: [IsAnonymousGuard] },
  { path: 'login', component: UsuarioLoginComponent, canActivate: [IsAnonymousGuard] },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'completar-perfil', component: UsuarioCompletarPerfilComponent, canActivate: [AuthGuard, NaoPermitePerfilCompletoGuard] },
  { path: 'buscar-adversarios', component: BuscarAdversariosComponent, canActivate: [AuthGuard] },
  { path: 'resumo', component: JogadorResumoComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
