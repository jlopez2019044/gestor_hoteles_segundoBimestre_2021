import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelesComponent } from './componentes/hoteles/hoteles.component';
import { LoginComponent } from './componentes/login/login.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { RegistrarAdminHotelComponent } from './componentes/registrar-admin-hotel/registrar-admin-hotel.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { TusHotelesComponent } from './componentes/tus-hoteles/tus-hoteles.component';
import { TusReservacionesComponent } from './componentes/tus-reservaciones/tus-reservaciones.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';

const routes: Routes = [
  {path: 'login',component: LoginComponent},
  {path: 'registro',component: RegistroComponent},
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'hoteles', component:HotelesComponent},
  {path: 'perfil',component:PerfilComponent},
  {path: 'registrarAdminHotel',component: RegistrarAdminHotelComponent},
  {path: 'tusHoteles', component: TusHotelesComponent},
  {path: 'tusReservaciones',component: TusReservacionesComponent},
  {path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }