import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {
  urlbase='https://localhost:7291/api/'
  controlador='Personas/'

  constructor(private httpClient:HttpClient) { }
  
  getPersonas():Observable<any>{
    var metodo='ObtenerPersonas'
    return this.httpClient.get<any>(this.urlbase+this.controlador+metodo);
  }
  getProvincias():Observable<any>{
    var metodo='ObtenerProvincias'
    return this.httpClient.get<any>(this.urlbase+this.controlador+metodo);
  }
  getCiudadesById(id: number): Observable<any> {
    var metodo = 'ObtenerCiudadesbyId'
    const params = new HttpParams().append('id', id);
    let headers = new HttpHeaders().set('Type-content', 'aplication/json')
    return this.httpClient.get<any>(this.urlbase + this.controlador + metodo, { params });
  }
  getParroquiasById(id: number): Observable<any> {
    var metodo = 'ObtenerParroquiasbyId'
    const params = new HttpParams().append('id', id);
    let headers = new HttpHeaders().set('Type-content', 'aplication/json')
    return this.httpClient.get<any>(this.urlbase + this.controlador + metodo, { params });
  }
  getPersonasbyFiltros(idProvincia:number, idCiudad:number,idParroquia:number): Observable<any> {
    var metodo = 'ObtenerPersonasbyFiltros'
    const filtro = {
      idProvincia,
      idCiudad,
      idParroquia
    }
    let params = new HttpParams()
      .append("provincia", filtro.idProvincia)
      .append("ciudad", filtro.idCiudad)
      .append("parroquia",filtro.idParroquia)

    const headers = new HttpHeaders().set('content-type', 'application/json')
    return this.httpClient.post<any>(this.urlbase + this.controlador + metodo, filtro, { headers, params });
  }
  setPersonas(datosPersonas: any) {
    var metodo = 'SetPersonas'
    return this.httpClient.post<any>(this.urlbase + this.controlador + metodo, datosPersonas)
  }
  updatePersonas(datosPersonas: any) {
    var metodo = 'PutPersonas'
    return this.httpClient.post<any>(this.urlbase + this.controlador + metodo, datosPersonas)
  }
  deletePersonas(id: number) {
    var metodo='DeletePersonas'
    let params = new HttpParams()
      .append("id", id)
    console.log(id);
    const headers = new HttpHeaders().set('content-type', 'application/json')
    return this.httpClient.post<any>(this.urlbase + this.controlador + metodo, id, { headers, params });
  }
}
