import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UsuarioCadastroComponent } from './componentes/usuario-cadastro/usuario-cadastro.component';
import { UsuarioLoginComponent } from './componentes/usuario-login/usuario-login.component';
import { UsuarioCompletarPerfilComponent } from './componentes/usuario-completar-perfil/usuario-completar-perfil.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './componentes/home/home.component';
import { BuscarAdversariosComponent } from './componentes/buscar-adversarios/buscar-adversarios.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { JogadorResumoComponent } from './componentes/jogador-resumo/jogador-resumo.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuarioCadastroComponent,
    UsuarioLoginComponent,
    UsuarioCompletarPerfilComponent,
    HomeComponent,
    BuscarAdversariosComponent,
    NavbarComponent,
    JogadorResumoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
