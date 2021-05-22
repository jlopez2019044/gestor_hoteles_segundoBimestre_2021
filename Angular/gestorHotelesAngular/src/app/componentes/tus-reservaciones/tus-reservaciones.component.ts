import { Component, OnInit } from '@angular/core';
import { ReservacionService } from 'src/app/servicios/reservacion.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Reservacion } from '../models/reservacion.model';

@Component({
  selector: 'app-tus-reservaciones',
  templateUrl: './tus-reservaciones.component.html',
  styleUrls: ['./tus-reservaciones.component.scss'],
  providers: [ReservacionService, UsuarioService]
})
export class TusReservacionesComponent implements OnInit {

  public token;
  public reservacionModelGet: Reservacion;

  constructor(private _reservacionService: ReservacionService, public _usuarioService: UsuarioService) {
    this.token = _usuarioService.getToken();
   }

  ngOnInit(): void {
    this.visualizarReservacionesUsuario();
  }

  visualizarReservacionesUsuario(){

    this._reservacionService.visualizarReservacionesUsuario(this.token).subscribe(
      response =>{
        console.log(response);
        this.reservacionModelGet = response.reservacionesEncontradas
      },
      error=>{
        console.log(<any>error);
        
      }
    )

  }

}
