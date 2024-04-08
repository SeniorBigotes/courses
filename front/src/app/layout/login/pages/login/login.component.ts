import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../../../../app.service';
import { UserService } from '../../../user/user.service';
import { LoginService } from '../../login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup = this.formLogin();
  message: string = '';

  error: boolean = false;
  
  constructor(private fb: FormBuilder,
              private router: Router,
              private appService: AppService,
              private loginService: LoginService,
              ) {}
  
  ngOnInit(): void {
    this.loginService.cerrarSesion();
  }

  // Enviar datos para el inicio de sesión
  submit(): void {
    const userName = this.getUserName.value;
    const password = this.getPassword.value;

    if(userName && password) {
      this.appService.getUsuarioUsername(userName).subscribe({
        next: usuario => {
          if (usuario.nombre_U === userName && usuario.contraseña === password) {
            this.appService.getRol(usuario.rol_id).subscribe(rol => {
              this.loginService.almacenarUsuario(usuario.nombre_U, rol.nombre, usuario.id);
              this.router.navigate(['/']);
            });
          } else {
            this.generarError('Usuario o contraseña incorrecta');
          }
        },
        error: err => {
          this.generarError('Usuario o contraseña incorrecta')
        }
      })
    } else {
      this.generarError('Faltan campos por llenar');
    }

    this.formGroup.reset();
  }

  private generarError(msg: string): void {
    this.error = true;
    this.message = msg;
    setTimeout(() => this.error = false, 3000);
  }

  private formLogin(): FormGroup {
    return this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get getUserName(): FormControl {
    return this.formGroup.get('userName') as FormControl;
  }

  get getPassword(): FormControl {
    return this.formGroup.get('password') as FormControl;
  }

}
