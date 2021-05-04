import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Usuario } from '../models/usuario.model';
import Swal from "sweetalert2";

@Component({
  selector: 'app-registrar-admin-hotel',
  templateUrl: './registrar-admin-hotel.component.html',
  styleUrls: ['./registrar-admin-hotel.component.scss'],
  providers: [UsuarioService]
})
export class RegistrarAdminHotelComponent implements OnInit {

  public userHotel: Usuario  

  constructor(private _usuarioService: UsuarioService,private _router: Router) { 
    this.userHotel = new Usuario("","","","","","")
  }

  ngOnInit(): void {
  }

  registrarAdminHotel(){
    this._usuarioService.registro(this.userHotel).subscribe(
      response =>{
        console.log(response)
        Swal.fire({
          icon: 'success',
          title: 'Usuario Registrado',
        })
        this._router.navigate(['/usuarios'])
      },
      error =>{
        Swal.fire({
          icon: 'error',
          title: 'Ha ocurrido un error',
          text: 'Ya existe un usuario registrado',
        })
        console.log(<any>error)
      }
    )
  }

}
