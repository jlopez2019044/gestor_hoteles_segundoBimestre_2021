import { Component, OnInit } from '@angular/core';
import { HotelesService } from 'src/app/servicios/hoteles.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Hotel } from '../models/hotel.model';
import Swal from "sweetalert2";


@Component({
  selector: 'app-tus-hoteles',
  templateUrl: './tus-hoteles.component.html',
  styleUrls: ['./tus-hoteles.component.scss'],
  providers: [HotelesService, UsuarioService]
})
export class TusHotelesComponent implements OnInit {

  public token;
  public hotelModelGet: Hotel;
  public hotelModelGetId: Hotel;

  constructor(private _hotelesService: HotelesService, private _usuarioService: UsuarioService) {
    this.token = _usuarioService.getToken()
   }

  ngOnInit(): void {
    this.mostrarHotelesAdmin();
  }

  mostrarHotelesAdmin(){
    this._hotelesService.mostrarHotelesAdmin(this.token).subscribe(
      response => {
        this.hotelModelGet = response.hotelesEncontrados;
      },
      error =>{
        console.log(<any>error);
        
      }
    )
  }

  obtenerHotelId(idHotel){
    this._hotelesService.mostrarHotelId(this.token, idHotel).subscribe(
      (response: any) =>{
        this.hotelModelGetId = response.hotelEncontrado;
        console.log(response);
      },
      error =>{
        console.log(<any>error);
        
      }
    )
  }

  crearPDF(idHotel){

    this._hotelesService.crearPDF(idHotel,this.token).subscribe(
      response =>{
        console.log(response);
        
      },
      error =>{
        console.log(<any>error);
        
      }
    )

  }

}
