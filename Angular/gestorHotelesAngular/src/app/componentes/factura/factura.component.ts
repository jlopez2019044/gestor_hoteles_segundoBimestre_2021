import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FacturaService } from 'src/app/servicios/factura.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Factura } from '../models/factura.model';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss'],
  providers: [FacturaService, UsuarioService]
})
export class FacturaComponent implements OnInit {

  public facturaModel: Factura;
  public token;
  public idReservacionRuta;

  constructor(public _facturaService: FacturaService,
    public _usuarioService: UsuarioService,
    public _activatedRoute: ActivatedRoute) {

      this.token = this._usuarioService.getToken();
      this.facturaModel = new Factura("","","","","",[{}],0);

    }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta)=>{
      this.idReservacionRuta = dataRuta.get('idReservacion');
    })
    this.visualizarFactura();
  }

  visualizarFactura(){
    this._facturaService.visualizarFactura(this.idReservacionRuta,this.token).subscribe(
      response=>{
        this.facturaModel = response.facturaEncontrada;
        console.log(response);
        
      },
      error=>{
        console.log(<any>error);
        
      }
    )
  }

}
