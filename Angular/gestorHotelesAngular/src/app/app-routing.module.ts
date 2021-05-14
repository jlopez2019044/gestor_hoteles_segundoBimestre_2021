import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarHotelComponent } from './componentes/agregar-hotel/agregar-hotel.component';
import { EventosComponent } from './componentes/eventos/eventos.component';
import { HotelesComponent } from './componentes/hoteles/hoteles.component';
import { LoginComponent } from './componentes/login/login.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { RegistrarAdminHotelComponent } from './componentes/registrar-admin-hotel/registrar-admin-hotel.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ServiciosHotelComponent } from './componentes/servicios-hotel/servicios-hotel.component';
import { TipoEventoComponent } from './componentes/tipo-evento/tipo-evento.component';
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
  {path: 'agregarHotel',component: AgregarHotelComponent},
  {path: 'serviciosHotel/:idHotel', component: ServiciosHotelComponent},
  {path: 'eventos', component: EventosComponent},
  {path: 'tipoEventos', component: TipoEventoComponent},
  {path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
