import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  almacenarUsuario(username: string, rol: string, id: number): void {
    localStorage.setItem('username', username);
    localStorage.setItem('rol', rol);
    localStorage.setItem('id', id.toString());
  }

  obtenerUsername(): string | null {
    return localStorage.getItem('username');
  }

  obtenerRol(): string | null {
    return localStorage.getItem('rol');
  }

  obtenerID(): string | null {
    return localStorage.getItem('id');
  }

  cerrarSesion(): void {
    localStorage.clear();
  }
}
