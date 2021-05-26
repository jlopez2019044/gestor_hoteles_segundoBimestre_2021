import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Usuario } from '../models/usuario.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  providers: [UsuarioService]
})
export class UsuariosComponent implements OnInit {

  public usuarios;
  public usuarioModel: Usuario;

  constructor(private _usuarioService: UsuarioService) {
    this.usuarioModel = new Usuario("","","","","","","")
   }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(){
    this._usuarioService.obtenerUsuarios().subscribe(
      response =>{
        this.usuarios = response.usuariosEncontrados;
        console.log(response)
      },
      error =>{
        console.log(<any>error);
        
      }
    )
  }

  editarUsuario(){
    this._usuarioService.editarUsuario(this.usuarioModel).subscribe(
      response =>{
        console.log(response);
        this.obtenerUsuarios();
      }
    )
  }

}
