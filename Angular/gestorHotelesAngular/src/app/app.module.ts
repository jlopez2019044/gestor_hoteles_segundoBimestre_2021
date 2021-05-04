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
    TusReservacionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
