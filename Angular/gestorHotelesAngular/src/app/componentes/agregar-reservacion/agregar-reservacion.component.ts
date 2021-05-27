import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelesService } from 'src/app/servicios/hoteles.service';
import { ReservacionService } from 'src/app/servicios/reservacion.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Reservacion } from '../models/reservacion.model';
import Swal from "sweetalert2";


@Component({
  selector: 'app-agregar-reservacion',
  templateUrl: './agregar-reservacion.component.html',
  styleUrls: ['./agregar-reservacion.component.scss'],
  providers: [ReservacionService, UsuarioService, HotelesService]
})
export class AgregarReservacionComponent implements OnInit {

  public reservacionModel: Reservacion;
  public reservacionModelGet: Reservacion
  public token;
  public identidadParseada;
  public idHotelRuta;
  public idHabitacionRuta;

  constructor(public _reservacionService: ReservacionService,
    public _router: Router,
    public _usuarioService: UsuarioService,
    public _activatedRoute: ActivatedRoute) {

      this.token = this._usuarioService.getToken();
      this.reservacionModel = new Reservacion("","","","","")
    }

  ngOnInit(): void {
    
    this._activatedRoute.paramMap.subscribe((dataRuta) => {
      this.idHabitacionRuta = dataRuta.get('idHabitacion');
    })
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

  agregarReservacion(){
    this._reservacionService.agregarReservacion(this.idHabitacionRuta, this.reservacionModel, this.token).subscribe(
      response =>{
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: 'Reservación Registrada',
        })
        this.visualizarReservacionesHabitacion();    
        this._router.navigate[('/hoteles')]

      },
      error  =>{
        Swal.fire({
          icon: 'error',
          title: 'Ha ocurrido un error',
          text: 'Prueba con otra fecha, posiblemente esté reservado ese día'
        })
      }
    )
  }

}
