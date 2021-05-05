import { Component, OnInit } from '@angular/core';
import { HotelesService } from 'src/app/servicios/hoteles.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Hotel } from '../models/hotel.model';

@Component({
  selector: 'app-hoteles',
  templateUrl: './hoteles.component.html',
  styleUrls: ['./hoteles.component.scss']
})
export class HotelesComponent implements OnInit {

  public identidadParseada;
  public hotelModel: Hotel;
  public hotelModelGet: Hotel;
  public token;

  constructor(private _hotelesService: HotelesService, private _usuarioService: UsuarioService) {
    this.token = _usuarioService.getToken();
    this.hotelModel = new Hotel("","","","",0,[{no_habitacion:0,descripcion:"",precio:0}],"")
   }

  ngOnInit(): void {
    this.mostrarHoteles();
    this.getIdentidad();
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

  mostrarHoteles(){
    this._hotelesService.mostrarHoteles(this.token).subscribe(
      response => {
        this.hotelModelGet = response.hotelesEncontrados
      },
      error =>{
        console.log(<any>error);
        
      }
    )
  }

}
