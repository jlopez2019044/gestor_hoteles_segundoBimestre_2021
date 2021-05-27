import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelesService } from 'src/app/servicios/hoteles.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Hotel } from '../models/hotel.model';
import Swal from "sweetalert2";

@Component({
  selector: 'app-habitaciones',
  templateUrl: './habitaciones.component.html',
  styleUrls: ['./habitaciones.component.scss'],
  providers: [HotelesService, UsuarioService]
})
export class HabitacionesComponent implements OnInit {

  public hotelModel: Hotel;
  public token;
  public idHotelRuta;
  public identidadParseada;
  public hotelModelGet: Hotel;

  constructor(public _hotelesService: HotelesService,
    public _usuarioService: UsuarioService,
    public _activatedRoute: ActivatedRoute) { 

      this.token = this._usuarioService.getToken();
      this.hotelModel = new Hotel("","","","","",0,[{no_habitacion:0,descripcion:"",precio:0}],"");
      this.hotelModelGet = new Hotel("","","","","",0,[{no_habitacion:0,descripcion:"",precio:0}],"");
    
    }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta)=>{
      this.idHotelRuta = dataRuta.get('idHotel');
    })
    this.getIdentidad();
    this.mostrarHotelId(this.idHotelRuta);
  }

  mostrarHotelId(idHotel) {
    this._hotelesService.mostrarHotelId(this.token, idHotel)
      .subscribe(
        (response) => {
          this.hotelModelGet = response.hotelEncontrado;
          console.log(response);
        },
        error =>{
          console.log(<any>error);
          
        }
      );
  }

  agregarHabitacion(){

    this._hotelesService.agregarHabitacion(this.token, this.idHotelRuta, this.hotelModel).subscribe(
      response=>{
        this.hotelModel = response.habitacionAgregada;
        Swal.fire({
          icon: 'success',
          title: 'Habitacion Registrada',
        })
        this.mostrarHotelId(this.idHotelRuta);
      },
      error =>{
        console.log(<any>error);
        Swal.fire({
          icon: 'error',
          title: 'Ha ocurrido un error',
        })
        
      }
    )

  }

  agregarReservacion(idHabitacion){
    
  }

  getIdentidad(){

    var identidadX = JSON.parse(localStorage.getItem('identidad'));
    if(identidadX!='undefined'){
      this.identidadParseada = identidadX
    }else{
      this.identidadParseada = null;
    }

    return this.identidadParseada;

  }

}
