import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { HotelesComponent } from './componentes/hoteles/hoteles.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { RegistrarAdminHotelComponent } from './componentes/registrar-admin-hotel/registrar-admin-hotel.component';
import { TusHotelesComponent } from './componentes/tus-hoteles/tus-hoteles.component';
import { TusReservacionesComponent } from './componentes/tus-reservaciones/tus-reservaciones.component';
import { AgregarHotelComponent } from './componentes/agregar-hotel/agregar-hotel.component';
import { ServiciosHotelComponent } from './componentes/servicios-hotel/servicios-hotel.component';
import { EventosComponent } from './componentes/eventos/eventos.component';
import { TipoEventoComponent } from './componentes/tipo-evento/tipo-evento.component';
import { HabitacionesComponent } from './componentes/habitaciones/habitaciones.component';
import { ReservacionesComponent } from './componentes/reservaciones/reservaciones.component';
import { AgregarReservacionComponent } from './componentes/agregar-reservacion/agregar-reservacion.component';
import { EditarHotelComponent } from './componentes/editar-hotel/editar-hotel.component';
import { FacturaComponent } from './componentes/factura/factura.component';
import { HotelesPopularesComponent } from './componentes/hoteles-populares/hoteles-populares.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    RegistroComponent,
    UsuariosComponent,
    HotelesComponent,
    PerfilComponent,
    RegistrarAdminHotelComponent,
    TusHotelesComponent,
    TusReservacionesComponent,
    AgregarHotelComponent,
    ServiciosHotelComponent,
    EventosComponent,
    TipoEventoComponent,
    HabitacionesComponent,
    ReservacionesComponent,
    AgregarReservacionComponent,
    EditarHotelComponent,
    FacturaComponent,
    HotelesPopularesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
