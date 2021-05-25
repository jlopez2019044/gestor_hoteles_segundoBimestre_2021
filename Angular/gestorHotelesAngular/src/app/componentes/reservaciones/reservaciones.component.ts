import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservacionService } from 'src/app/servicios/reservacion.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Reservacion } from '../models/reservacion.model';

@Component({
  selector: 'app-reservaciones',
  templateUrl: './reservaciones.component.html',
  styleUrls: ['./reservaciones.component.scss'],
  providers: [ReservacionService, UsuarioService]
})
export class ReservacionesComponent implements OnInit {

  public token;
  public reservacionModelGet: Reservacion;
  public idHabitacionRuta;

  constructor(private _reservacionService: ReservacionService, public _usuarioService: UsuarioService, private _activatedRoute: ActivatedRoute) {
    this.token = _usuarioService.getToken();
   }

  ngOnInit(): void {

    this._activatedRoute.paramMap.subscribe((dataRuta=>{
      this.idHabitacionRuta = dataRuta.get('idHabitacion');
    }))
    this.visualizarReservacionesHabitacion();

  }

  visualizarReservacionesHabitacion(){
    this._reservacionService.visualizarReservacionesHabitacion(this.idHabitacionRuta,this.token).subscribe(
      response=>{

        console.log(response);
        this.reservacionModelGet = response.reservacionesEncontradas;

      },
      error =>{
        console.log(<any>error);
        
      }
    )
  }

  eliminarReservacion(idReservacion){

    this._reservacionService.eliminarReservacion(idReservacion,this.token).subscribe(
      response =>{
        console.log(response);
        this.reservacionModelGet = response.reservacionesEncontradas;
        
      },
      error=>{

      }
    )

  }

}
