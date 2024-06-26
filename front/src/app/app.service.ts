import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppService {

  private usuariosUrl: string = `${environment.url}/api/usuarios`;
  private rolesUrl: string = `${environment.url}/api/roles/`;
  private cursosUrl: string = `${environment.url}/api/cursos`;
  private leccionesUrl: string = `${environment.url}/api/lecciones`;

  constructor(private http: HttpClient) { }

  getUsuarios(limite: number, pagina: number): Observable<any>  {
    return this.http.get(`${this.usuariosUrl}/${limite}/${pagina}`);
  }

  getBuscarUsuarios(busqueda: string, limite: number,pagina: number): Observable<any> {
    return this.http.get(`${this.usuariosUrl}/busqueda/${busqueda}/${limite}/${pagina}`);
  }

  getTotalUsuarios(): Observable<any> {
    return this.http.get(`${this.usuariosUrl}/total`);
  }

  getUsuarioID(id: number): Observable<any> {
    return this.http.get(`${this.usuariosUrl}/${id}`);
  }

  getUsuarioUsername(username: string): Observable<any> {
    return this.http.get(`${this.usuariosUrl}/inicio/${username}`);
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

  getCursoPorID(id: number): Observable<any> {
    return this.http.get(`${this.cursosUrl}/${id}`);
  }

  getCursoOrdenadoID(ordenado: boolean): Observable<any> {
    return this.http.get(`${this.cursosUrl}/por_id/${ordenado}`);
  }

  getCursoPorUsuario(usuarioID: number): Observable<any> {
    return this.http.get(`${this.cursosUrl}/por_usuario/${usuarioID}`);
  }
  
  getCursoPorMateria(materia: string): Observable<any> {
    return this.http.get(`${this.cursosUrl}/por_materia/${materia}`);
  }

  getMiniatura(miniUrl: string): Observable<any> {
    return this.http.get(`${this.cursosUrl}/miniaturas/${miniUrl}`);
  }

  postCursos(body: any): Observable<any> {
    return this.http.post(this.cursosUrl, body);
  }

  getLecciones(cursoID: number): Observable<any> {
    return this.http.get(`${this.leccionesUrl}/${cursoID}`);
  }

  getLeccion(cursoID: number, leccion: string): Observable<any> {
    return this.http.get(`${this.leccionesUrl}/${cursoID}/${leccion}`);
  }
}
