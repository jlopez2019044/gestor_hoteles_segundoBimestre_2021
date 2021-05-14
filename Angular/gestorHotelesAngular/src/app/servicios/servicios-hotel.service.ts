import { Injectable } from '@angular/core';
import { Usuario } from '../componentes/models/usuario.model';
import { GLOBAL } from "./global.service";
import { Observable } from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Servicio } from '../componentes/models/servicios-hotel';

@Injectable({
  providedIn: 'root'
})
export class ServiciosHotelService {

  public url: String;
  public headersVariable = new HttpHeaders().set('Content-Type','application/json')

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url
  }

  visualizarServiciosHotel(id: String, token): Observable<any>{

    let headersToken = this.headersVariable.set('Authorization',token)

    return this._http.get(this.url+'/servicios/visualizarServiciosHotel/'+id,{headers: headersToken})
  }

  registrarServicio(id: String, servicio: Servicio, token): Observable<any> {

    let headersToken = this.headersVariable.set('Authorization',token);
    let params = JSON.stringify(servicio);

    return this._http.post(this.url+'/servicios/registrarServicio/'+id,params,{headers:headersToken})

  }

}
