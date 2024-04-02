import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usuarioID?: number;

  busquedaUsuarioUrl: string = 'http://localhost:3000/api/usuarios/busqueda'

  constructor(private http: HttpClient) { }

  getBuscarUsuarios(busqueda: any): Observable<any> {
    return this.http.get(`${this.busquedaUsuarioUrl}/${busqueda}`);
  }
}
