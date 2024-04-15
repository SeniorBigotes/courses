import { CommonModule } from '@angular/common';
import { Component, ElementRef, model, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../../../../app.service';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {

  @ViewChild('input') input?: ElementRef; // input de busqueda
  usuarios: any[] = []; // todos los usuarios
  usuariosRespaldo: any[] = []
  roles: any = []; // todos los roles de los usuarios 
  mostrarUsuarios: boolean = false; // mostrar usuarios cuando esten cargados
  mostrarMensaje: boolean = false; // mostrar mensajes
  mensaje: string = "Usuario eliminado"; // mensaje a mostrar

  ascDescId: boolean = true; // orden ascendente o descendente por id
  ascDescNombre: boolean = true; // orden ascendente o descendente por nombre
  ascDescUsername: boolean = true; // orden ascendente o descendente por username
  ascDescRol: boolean = true; // orden ascendente o descendente por rol

  pagina: number = 1;
  totales: number = 0;
  limite: number = 10;
  resultados: number = this.limite;

  userRol: string | null = localStorage.getItem('rol');

  constructor(private appService: AppService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    // verificar rol
    if(!(this.userRol === 'Administrador')) this.router.navigate(['/']);

    this.appService.getTotalUsuarios().subscribe(data => this.totales = data[0].total);
    // obtener a todos los usuarios
    this.appService.getUsuarios(10, 1).subscribe(usuarios => {
      this.valoresPaginacion(usuarios);
      this.usuariosRespaldo = usuarios;
      this.mostrarUsuarios = true;
    });
  }

  private obtenerRoles(usuarios: any): void {
    usuarios.forEach((usuario: any) => {
      // obtener roles de los usuarios
      this.appService.getRol(usuario.rol_id).subscribe(rol => {
        this.roles[usuario.id] = rol.nombre;
      });
    })
  }

  // busca usuarios
  buscar(): void {
    const valorInput = this.input?.nativeElement.value;
    this.userService.getBuscarUsuarios(valorInput).subscribe(busqueda => this.usuarios = busqueda);
  }

  limpiarBusqueda(): void {
    if(this.input) this.input.nativeElement.value = '';
    this.usuarios = this.usuariosRespaldo;
  }

  // redireccinar al formulario para crear usuarios
  onClick(): void {
    this.userService.usuarioID = undefined;
    this.router.navigate(['/users/create'])
  }

  ordenarPorID(): void {    
    this.ordenar(this.ascDescId, 'id');
    this.ascDescId = !this.ascDescId;
    
  }

  ordenarPorNombre(): void {
    this.ordenar(this.ascDescNombre, 'nombres');
    this.ascDescNombre = !this.ascDescNombre;
  }

  ordenarPorUsuario(): void {
    this.ordenar(this.ascDescUsername, 'nombre_U');
    this.ascDescUsername = !this.ascDescUsername;
  }

  ordenarPorRol(): void {
    this.ordenar(this.ascDescRol, 'rol_id');
    this.ascDescRol = !this.ascDescRol;
  }

  private ordenar(ordenarPor: boolean, campo: string): void {    
    !ordenarPor ? 
      //ascendente
      campo ? this.usuarios.sort((a, b) => (a[campo] > b[campo]) ? 1 : -1) : ''
    :
      // descendiente
      campo ? this.usuarios.sort((a, b) => (a[campo] < b[campo]) ? 1 : -1) : '';
  }

  private resetarFiltro(campo: string): void {
    this.ascDescId = true;
    this.ascDescNombre = true;
    this.ascDescUsername = true;
    this.ascDescRol = true;
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

  // numero de pagina
  entrada(input: any): void {
    const valor = parseInt(input);
    if (!isNaN(valor)) {
      this.pagina = valor;
      if (this.pagina < 0) this.pagina = 1;
      this.appService.getUsuarios(this.limite, this.pagina).subscribe(data => this.valoresPaginacion(data))
    }
  }

  izqUno(): void {
    if (this.pagina > 1) {
      this.pagina -= 1;
      this.actualizarUsuarios();
    }
  }
  
  derUno(): void {
    if (!(this.usuarios.length < this.limite)) {
      this.pagina += 1;
      this.actualizarUsuarios();
    }
  }
  
  private actualizarUsuarios(): void {
    this.appService.getUsuarios(this.limite, this.pagina).subscribe(data => {
      this.valoresPaginacion(data);
    });
  }
  
  private valoresPaginacion(usuarios: any): void {
    this.usuarios = usuarios;
    this.obtenerRoles(usuarios);
  }
  
  get resultado() {
    const ultimoResultado = this.pagina * this.limite;
    return Math.min(ultimoResultado, this.totales);
  }
  
  cambiarPagina(pagina: number) {
    this.pagina = pagina;
  }

  reload(): void {
    window.location.reload()
  }
}
