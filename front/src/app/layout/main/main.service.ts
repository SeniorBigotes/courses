import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private usuarioUrl: string = 'http://localhost:3000/api/usuarios';

  private cursos: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private filtroText: BehaviorSubject<string> = new BehaviorSubject<string>('ASCENDENTE');

  constructor(private http: HttpClient) { }

  // SETTERS
  setCursos(data: any[]): void {
    this.cursos.next(data);
  }

  setFiltroText(txt: string): void {
    this.filtroText.next(txt);
  }

  getBuscarUsername(username: string): Observable<any> {
    return this.http.get(`${this.usuarioUrl}/username/${username}`);
  }

  // GETTERS
  get $cursos(): Observable<any> {
    return this.cursos.asObservable();
  }

  get $filtroText(): Observable<any> {
    return this.filtroText.asObservable();
  }
}