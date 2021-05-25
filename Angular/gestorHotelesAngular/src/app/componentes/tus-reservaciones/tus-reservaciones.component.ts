import { Component, OnInit } from '@angular/core';
import { ReservacionService } from 'src/app/servicios/reservacion.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Reservacion } from '../models/reservacion.model';
import Swal from "sweetalert2";

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

  eliminarReservacion(idReservacion){

    this._reservacionService.eliminarReservacion(idReservacion,this.token).subscribe(
      response =>{
        console.log(response);
        this.visualizarReservacionesUsuario()
        Swal.fire({
          icon: 'success',
          title: 'Reservación eliminada',
        })
        
      },
      error=>{
        console.log(<any>error);
        
        Swal.fire({
          icon: 'error',
          title: 'No se pudo eliminar la Reservación',
        })
      }
    )

  }

}
