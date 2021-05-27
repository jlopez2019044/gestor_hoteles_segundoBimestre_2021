import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventoService } from 'src/app/servicios/evento.service';
import { HotelesService } from 'src/app/servicios/hoteles.service';
import { TipoEventoService } from 'src/app/servicios/tipo-evento.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from "sweetalert2";
import { Evento } from '../models/evento.model';
import { Hotel } from '../models/hotel.model';
import { TipoEvento } from '../models/tipo-evento.model';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
  providers: [EventoService, HotelesService, UsuarioService, TipoEventoService]
})
export class EventosComponent implements OnInit {

  public hotelModel: Hotel;
  public token;
  public eventoModel: Evento;
  public idHotelRuta;
  public eventoModelGet: Evento;
  public identidadParseada;
  public tipoEventoModelGet: TipoEvento;

  constructor(public _eventoService: EventoService,
    public _hotelService: HotelesService, 
    public _usuarioService: UsuarioService,
    public _activatedRoute: ActivatedRoute,
    public _tipoEventoService: TipoEventoService
    ) { 
      this.token = this._usuarioService.getToken();
      this.eventoModel = new Evento("","","","","");
    }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta)=>{
      this.idHotelRuta = dataRuta.get('idHotel');
    })
    this.mostrarHotelId(this.idHotelRuta);
    this.getIdentidad();
    this.visualizarEventosHotel();
    this.visualizarTiposEvento();

  }

  mostrarHotelId(idHotel) {
    this._hotelService.mostrarHotelId(this.token, idHotel)
      .subscribe(
        (response) => {
          this.hotelModel = response.hotelEncotrado;
          console.log(response);
        }
      );
  }

  visualizarEventosHotel(){
    this._eventoService.visualizarEventosHotel(this.idHotelRuta,this.token).subscribe(
      response => {
        this.eventoModelGet = response.eventosEncontrados
        console.log(response);
      },
      error=>{
        console.log(<any>error);
        
      }
    )
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

  registrarEvento(){
    this._eventoService.registrarEvento(this.idHotelRuta,this.eventoModel,this.token).subscribe(
      response => {
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: 'Evento Registrado',
        })
        this.eventoModel.evento='';
        this.eventoModel.descripcion='';
        this.eventoModel.fecha='';

        this.visualizarEventosHotel();
      },
      error=>{
        Swal.fire({
          icon: 'error',
          title: 'Ha ocurrido un error',
        })
        console.log(<any>error);
        
      }
    )
  }

  visualizarTiposEvento(){
    this._tipoEventoService.mostrarTipoEvento(this.token).subscribe(
      response => {
        this.tipoEventoModelGet = response.tiposEventoEncontrados
      },
      error => {
        console.log(<any>error);
      }
    )
  }

}
