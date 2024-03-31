import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private tituloVideo: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private descripcionVideo: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() { }

  // ingresar el titulo del video
  setTituloVideo(titulo: string): void {
    this.tituloVideo.next(titulo);
  }

  setDescripcionVideo(descripcion: string): void {
    this.descripcionVideo.next(descripcion);
  }

  // obtener el titulo en tiempo real
  get $tituloVideo(): Observable<string> {
    return this.tituloVideo.asObservable()
  }

  // obtener la descripcion del video en tiempo real
  get $descripcionVideo(): Observable<string> {
    return this.descripcionVideo.asObservable();
  }
}
