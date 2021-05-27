import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelesService } from 'src/app/servicios/hoteles.service';
import { ServiciosHotelService } from 'src/app/servicios/servicios-hotel.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Servicio } from '../models/servicios-hotel';
import Swal from "sweetalert2";
import { Hotel } from '../models/hotel.model';

@Component({
  selector: 'app-servicios-hotel',
  templateUrl: './servicios-hotel.component.html',
  styleUrls: ['./servicios-hotel.component.scss'],
  providers: [ServiciosHotelService, HotelesService, UsuarioService]
})
export class ServiciosHotelComponent implements OnInit {

  public hotelModel: Hotel;
  public token;
  public serviciosHotelModel: Servicio;
  public idHotelRuta;
  public identidadParseada;
  public serviciosModelGet: Servicio;

  constructor(public _serviciosHotelService: ServiciosHotelService, 
    public _hotelesService: HotelesService,
    public _usuarioService: UsuarioService,
    public _activatedRoute: ActivatedRoute,
    public _router: Router ) 
    { 
      this.token = this._usuarioService.getToken();
      this.serviciosHotelModel = new Servicio("","",0,"");
      this.hotelModel = new Hotel("","","","","",0,[{no_habitacion:0,descripcion:"",precio:0}],"")
    }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta)=>{
      this.idHotelRuta = dataRuta.get('idHotel');
    });
    this.mostrarHotelId(this.idHotelRuta);
    this.getIdentidad();
    this.visualizarServiciosHotel();
    }

  mostrarHotelId(idHotel) {
    this._hotelesService.mostrarHotelId(this.token, idHotel)
      .subscribe(
        (response) => {
          this.hotelModel = response.hotelEncotrado;
          console.log(response.hotelEncontrado);
          
        }
      );
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

  visualizarServiciosHotel(){
    this._serviciosHotelService.visualizarServiciosHotel(this.idHotelRuta,this.token).subscribe(
      response =>{
        this.serviciosModelGet = response.serviciosEncontrados;
        console.log(response)
      },
      error=>{
        console.log(<any>error);
        
      }
    )
  }

  registrarServicio(){
    this._serviciosHotelService.registrarServicio(this.idHotelRuta,this.serviciosHotelModel, this.token).subscribe(
      response =>{
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: 'Servicio Registrado',
        })
        this.visualizarServiciosHotel();

      },
      error =>{
        console.log(<any>error);
      }
    )
  }

}