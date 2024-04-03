import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private usuarioUrl: string = 'http://localhost:3000/api/usuarios';

  constructor(private http: HttpClient) { }

  getBuscarUsername(username: string): Observable<any> {
    return this.http.get(`${this.usuarioUrl}/username/${username}`);
  }
}
