import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  almacenarUsuario(username: string, rol: string): void {
    localStorage.setItem('username', username);
    localStorage.setItem('rol', rol);
  }

  obtenerUsername(): string | null {
    return localStorage.getItem('username');
  }

  obtenerRol(): string | null {
    return localStorage.getItem('rol');
  }

  cerrarSesion(): void {
    localStorage.clear();
  }
}
