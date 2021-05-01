import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelesComponent } from './componentes/hoteles/hoteles.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';

const routes: Routes = [
  {path: 'login',component: LoginComponent},
  {path: 'registro',component: RegistroComponent},
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'hoteles', component:HotelesComponent},
  {path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
