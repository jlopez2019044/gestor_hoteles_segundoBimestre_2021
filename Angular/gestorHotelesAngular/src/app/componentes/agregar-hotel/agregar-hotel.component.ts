import { Component, OnInit } from '@angular/core';
import { HotelesService } from 'src/app/servicios/hoteles.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Hotel } from '../models/hotel.model';
import { Usuario } from '../models/usuario.model';
import Swal from "sweetalert2";
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-hotel',
  templateUrl: './agregar-hotel.component.html',
  styleUrls: ['./agregar-hotel.component.scss'],
  providers: [HotelesService, UsuarioService]
})
export class AgregarHotelComponent implements OnInit {

  public hotelModel: Hotel;
  public usuarioModelGet: Usuario;

  constructor(private _hotelesService: HotelesService, private _usuarioService: UsuarioService, private _router: Router) {
    this.hotelModel = new Hotel("","","","",0,[{no_habitacion:0,descripcion:"",precio:0}],"")
  }

  ngOnInit(): void {
    this.verUsuariosAdmin();
  }

  registrarHotel(){
    this._hotelesService.registrarHotel(this.hotelModel).subscribe(
      response =>{
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: 'Hotel Registrado',
        })
        this._router.navigate(['/hoteles']);
      },
      error =>{
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ha ocurrido un error',
        })
        console.log(<any>error)
      }
    )
  }

  verUsuariosAdmin(){
    this._usuarioService.verUsuariosAdmin().subscribe(
      response =>{
        this.usuarioModelGet = response.usuariosEncontrados;
      },
      error =>{
        console.log(<any>error);
      }
    )
  }

}
