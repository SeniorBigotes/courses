import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../../../../app.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-form-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.scss'
})
export class FormUserComponent implements OnInit {

  formUser: FormGroup = this.formGroup();
  mostrarMensaje: boolean = false;
  mensaje: string = '';
  usuario?: any;
  usuarioID: number | undefined = this.userService.usuarioID;
  error: string = '';

  constructor(private fb: FormBuilder,
              private appService: AppService,
              private userService: UserService,
              private router: Router) { }


  ngOnInit(): void {
    // modificar usuario
    if(this.usuarioID) {
      this.appService.getUsuarioID(this.usuarioID).subscribe(usuario => {
        this.usuario = usuario;
        this.modificarFormulario(usuario);
      });
    }
    
  }

  verUsuarios(): void {
    this.router.navigate(['/users']);
  }

  // enviar datos al backend
  submit(): void {
    const body = {
      nombres: this.getUsuarios.value,
      apellido_P: this.getApellidoP.value,
      apellido_M: this.getApellidoM.value,
      nombre_U: this.getNombreU.value,
      contraseña: this.getContraseña.value,
      rol_id: this.getRol.value,
    }
    
    this.usuarioID ? 
    // actualizar usuario
      this.appService.putUsuario(this.usuarioID, body).
        subscribe(() => this.crearMensaje('Usuario actualizado con éxito', true))
    :
    // crear usuario
    this.formUser.valid ? 
      this.appService.
        postCrearUsuario(body).subscribe({
          next: () => this.crearMensaje('Usuario creado con éxito', true),
          error: err => this.crearMensaje('Nombre de usuario ya existente, escoja otro', false)
        })
    :
      this.crearMensaje('Faltan campos por llenar', false);
  }

  private crearMensaje(mensaje: string, redirigir: boolean): void {
    this.mostrarMensaje = true;
    this.mensaje = mensaje;
    setTimeout(() => {
      this.mostrarMensaje = false;
      this.mensaje = ''
      if(redirigir) this.router.navigate(['/users']);
    }, 1000);
  }

  // validar formulario
  private formGroup(): FormGroup {
    return this.fb.group({
      nombres: ['', Validators.required],
      apellido_P: ['', Validators.required],
      apellido_M: [''],
      nombre_U: ['', Validators.required],
      contraseña: ['', Validators.required],
      rol_id: ['', Validators.required],
    })
  }

  // editar datos
  private modificarFormulario(usuario: any): void {
    this.formUser.patchValue({
      nombres: usuario.nombres,
      apellido_P: usuario.apellido_P,
      apellido_M: usuario.apellido_M,
      nombre_U: usuario.nombre_U,
      contraseña: usuario.contraseña,
      rol_id: usuario.rol_id,
    })
  } 

  /* GETTERS */
  get getUsuarios(): FormControl {
    return this.formUser.get('nombres') as FormControl;
  }

  get getApellidoP(): FormControl {
    return this.formUser.get('apellido_P') as FormControl;
  }

  get getApellidoM(): FormControl {
    return this.formUser.get('apellido_M') as FormControl;
  }

  get getNombreU(): FormControl {
    return this.formUser.get('nombre_U') as FormControl;
  }

  get getContraseña(): FormControl {
    return this.formUser.get('contraseña') as FormControl;
  }

  get getRol(): FormControl {
    return this.formUser.get('rol_id') as FormControl;
  }
}
