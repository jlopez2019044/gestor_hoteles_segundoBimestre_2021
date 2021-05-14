import { Component, OnInit } from '@angular/core';
import { HotelesService } from 'src/app/servicios/hoteles.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Hotel } from '../models/hotel.model';

@Component({
  selector: 'app-tus-hoteles',
  templateUrl: './tus-hoteles.component.html',
  styleUrls: ['./tus-hoteles.component.scss'],
  providers: [HotelesService, UsuarioService]
})
export class TusHotelesComponent implements OnInit {

  public token;
  public hotelModelGet: Hotel;

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

}
