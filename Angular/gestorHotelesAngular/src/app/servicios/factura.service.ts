import { Injectable } from '@angular/core';
import { Factura } from '../componentes/models/factura.model'
import {GLOBAL} from './global.service'
import { Observable } from "rxjs";
import { HttpClient,HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  public url: String;
  public token;
  public headersVariable = new HttpHeaders().set('Content-Type','application/json');

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  crearFactura(id:String, token): Observable<any>{

    let headersToken = this.headersVariable.set('Authorization',token)

    return this._http.get(this.url+'/facturas/crearFactura/'+id,{headers:headersToken});

  }

  visualizarFactura(id: String, token): Observable<any> {

    let headersToken = this.headersVariable.set('Authorization',token)

    return this._http.get(this.url+'/facturas/visualizarFactura/'+id,{headers: headersToken});

  }

}
