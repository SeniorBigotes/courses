import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {

  private usuariosUrl: string = 'http://localhost:3000/api/usuarios/';
  private rolesUrl: string = 'http://localhost:3000/api/roles/';
  private cursosUrl: string = 'http://localhost:3000/api/cursos';

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<any>  {
    return this.http.get(this.usuariosUrl);
  }

  getUsuarioID(id: number): Observable<any> {
    return this.http.get(`${this.usuariosUrl}/${id}`);
  }

  getUsuarioUsername(username: string): Observable<any> {
    return this.http.get(`${this.usuariosUrl}/login/${username}`);
  }

  getRol(id: number): Observable<any> {
    return this.http.get(`${this.rolesUrl}/${id}`);
  }

  postCrearUsuario(body: any): Observable<any> {
    return this.http.post(`${this.usuariosUrl}`, body);
  }

  putUsuario(usuarioID: number, body: any): Observable<any> {
    return this.http.put(`${this.usuariosUrl}/${usuarioID}`, body);
  }

  deleteUsuario(usuarioID: number): Observable<any> {
    return this.http.delete(`${this.usuariosUrl}/${usuarioID}`);
  }

  getCursos(): Observable<any> {
    return this.http.get(this.cursosUrl);
  }

  getCursoOrdenadoID(ordenado: boolean): Observable<any> {
    return this.http.get(`${this.cursosUrl}/por_id/${ordenado}`);
  }

  getCursoPorUsuario(usuarioID: number): Observable<any> {
    return this.http.get(`${this.cursosUrl}/por_usuario/${usuarioID}`);
  }

  getMiniatura(miniUrl: string): Observable<any> {
    return this.http.get(`${this.cursosUrl}/miniaturas/${miniUrl}`);
  }

  postCursos(body: any): Observable<any> {
    return this.http.post(this.cursosUrl, body);
  }
}
