import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../app.service';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {

  usuarios: any = []; // todos los usuarios
  roles: any = []; // todos los roles de los usuarios 
  mostrarUsuarios: boolean = false; // mostrar usuarios cuando esten cargados
  mostrarMensaje: boolean = false; // mostrar mensajes
  mensaje: string = "Usuario eliminado"; // mensaje a mostrar

  constructor(private appService: AppService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    // obtener a todos los usuarios
    this.appService.getUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
      usuarios.forEach((usuario: any) => {
        // obtener roles de los usuarios
        this.appService.getRol(usuario.rol_id).subscribe(rol => {
          this.roles[usuario.id] = rol.nombre;
        });
      })
      this.mostrarUsuarios = true;
    });
  }

  // busca usuarios
  search(): void {
    const input = (document.querySelector('#input') as HTMLInputElement).value;
    console.log(input)
  }

  // redireccinar al formulario para crear usuarios
  onClick(): void {
    this.userService.usuarioID = undefined;
    this.router.navigate(['/users/create'])
  }
  
  // redireccionar para editar usuarios
  editarUsuario(usuarioID: number): void {
    this.userService.usuarioID = usuarioID;
    this.router.navigate(['/users/update']);
  }

  // eliminar usuario
  eliminarUsuario(usuarioID: number): void {
    const eliminar: boolean = confirm('¿Deseas eliminar al usuario?');
    if(eliminar) {
      this.appService.deleteUsuario(usuarioID).subscribe(() => {
        this.mostrarMensaje = true;
        setTimeout(() => {
          this.mostrarMensaje = false;
          window.location.reload();
        }, 1000);
      });
    }
  }
}
