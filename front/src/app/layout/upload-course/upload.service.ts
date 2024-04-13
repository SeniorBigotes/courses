import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { AppService } from '../../app.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private tituloVideo: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private descripcionVideo: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private imagenCurso: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() { }

  reiniciarValores(): void {
    this.setTituloVideo('');
    this.setDescripcionVideo('');
    this.setImagenCurso('');
  }

  // ingresar el titulo del video
  setTituloVideo(titulo: string): void {
    this.tituloVideo.next(titulo);
  }
  
  // ingresar el titulo del video
  setDescripcionVideo(descripcion: string): void {
    this.descripcionVideo.next(descripcion);
  }

  // imgresar la miniatura del curso
  setImagenCurso(img: string): void {
    this.imagenCurso.next(img);
  }

  // obtener el titulo en tiempo real
  get $tituloVideo(): Observable<string> {
    return this.tituloVideo.asObservable()
  }

  // obtener la descripcion del video en tiempo real
  get $descripcionVideo(): Observable<string> {
    return this.descripcionVideo.asObservable();
  }

  // obtener la miniatura del curso
  get $imagenCurso(): Observable<string> {
    return this.imagenCurso.asObservable();
  }
}
