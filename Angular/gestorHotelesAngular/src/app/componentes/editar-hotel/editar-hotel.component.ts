import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelesService } from 'src/app/servicios/hoteles.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Hotel } from '../models/hotel.model';
import Swal from "sweetalert2";

@Component({
  selector: 'app-editar-hotel',
  templateUrl: './editar-hotel.component.html',
  styleUrls: ['./editar-hotel.component.scss'],
  providers: [HotelesService, UsuarioService]
})
export class EditarHotelComponent implements OnInit {

  public hotelModel: Hotel;
  public token;
  public idHotelRuta

  constructor(private _hotelesService: HotelesService, 
    private _usuarioService: UsuarioService, 
    private _router: Router,
    private _activatedRoute: ActivatedRoute) { 
    this.hotelModel = new Hotel("","","","","",0,[{no_habitacion:0,descripcion:"",precio:0}],"")
  }

  ngOnInit(): void {
    this.token = this._usuarioService.getToken();
    this._activatedRoute.paramMap.subscribe((dataRuta)=>{
      this.idHotelRuta = dataRuta.get('idHotel')
    })

    this.obtenerHotel(this.idHotelRuta);

  }


  editarHotel(){
    this._hotelesService.editarHotel(this.hotelModel,this.token).subscribe(
      response=>{
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: 'Hotel editado con éxito',
        })
        this._router.navigate(['/hoteles'])
      },
      error=>{
        console.log(<any>error);
        
      }
    )
  }

  obtenerHotel(idHotel){
    this._hotelesService.mostrarHotelId(this.token,idHotel).subscribe(
      response =>{
        this.hotelModel = response.hotelEncontrado;
      },
      error=>{
        console.log(<any>error);
        
      }
    )
  }

}
