import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewService {

  private cursoID: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  private leccion:  BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() { }

  setLocalStorage(llave: string, valor: any): void {
    localStorage.setItem('cursoID', valor);
  }

  getLocalStorage(llave: string): any {
    localStorage.getItem(llave);
  }

  // SETTERS
  setCursoID(id: number | null): void {
    this.cursoID.next(id);
  }

  setLeccin(leccion: string): void {
    this.leccion.next(leccion);
  }

  // GETTERS
  get $cursoID(): Observable<number | null> {
    return this.cursoID.asObservable();
  }

  get $leccion(): Observable<string> {
    return this.leccion.asObservable();
  }
}
