import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../upload.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppService } from '../../../../app.service';
import { LoginService } from '../../../login/login.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Materias } from '../../../../shared/materias.enum';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {

  materias: any = Materias;

  cursoFile!: any;
  miniatruaFile!: any;
  formFormulario: FormGroup = this.formGroup();

  inputMini: string = 'Seleccionar miniatura';
  inputCurso: string = 'Seleccionar curso';

  constructor(private uploadService: UploadService,
              private appService: AppService,
              private loginService: LoginService,
              private fb: FormBuilder,
              private router: Router) {}

  ngOnInit(): void {
  }

  // mostrar cambios en preview component
  cambiosTitulo(event: any): void {
    this.uploadService.setTituloVideo(event.target.value);
  }

  // mostrar cambios en preview component
  cambiosDescripcion(event: any): void {
    this.uploadService.setDescripcionVideo(event.target.value);
  }

  // agregar los cursos
  agregarCurso($event: any): void {
    this.cursoFile = this.agregarArchivo($event);
    this.inputCurso = this.cursoFile.archivoGral.name;
  }
  
  agregarMiniatura($event: any): void {
    const imagen: File = $event.target.files[0];    
    if(imagen) {
      const leer = new FileReader();
      leer.onload = (e: any) => this.uploadService.setImagenCurso(e.target.result);
      leer.readAsDataURL(imagen);
    }
    this.miniatruaFile = this.agregarArchivo($event);
    this.inputMini = this.miniatruaFile.archivoGral.name;

  }

  private agregarArchivo($event: any): any {
    const [archivo] = $event.target.files;
    const bodyArchivo = {
      archivoGral: archivo,
      nombreArchivo: archivo.name
    }

    return bodyArchivo;
  }

  enviar($event: any): void {
    if(this.formFormulario.valid && this.cursoFile && this.miniatruaFile) {
      this.enviarFormulario($event);
    }
  }

  enviarFormulario($event: any): void {
    // convertir a formData cuando se envien datos de tipo binario (archivos)
    const body = new FormData();
    
    const username = this.loginService.obtenerUsername();
    
    if(username) {
      this.crearCuerpoArchivos(body);
      this.appService.postCursos(body).subscribe({
        complete: () => {
          this.formFormulario.reset();
          this.uploadService.reiniciarValores();
          this.uploadService.setMensaje('Curso creado con exito');
          setTimeout(() => {
            this.uploadService.setMensaje('');
            this.router.navigate(['/']);
          }, 1500);
        },
        error: err => this.uploadService.setMensaje('Error al crear el curso'),
      });
    }
  }

  // agregar datos al FormData
  private crearCuerpoArchivos(body: FormData): void {
    
    const usuarioID = this.loginService.obtenerID();
    const username = this.loginService.obtenerUsername();

    body.append('archivo', this.cursoFile.archivoGral, this.cursoFile.nombreArchivo);
    body.append('miniatura', this.miniatruaFile.archivoGral, this.miniatruaFile.nombreArchivo);
    body.append('titulo', this.getTitulo.value);
    body.append('tema', this.getTema.value);
    body.append('descripcion', this.getDescripcion.value);
    if(username) body.append('username', username);
    if(usuarioID) body.append('usuarioID', usuarioID);
  }

  private formGroup(): FormGroup {
    return this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(65)]],
      tema: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  /*GETTERS*/
  get getTitulo(): FormControl {
    return this.formFormulario.get('titulo') as FormControl;
  }

  get getTema(): FormControl {
    return this.formFormulario.get('tema') as FormControl;
  }
  get getDescripcion(): FormControl {
    return this.formFormulario.get('descripcion') as FormControl;
  }
}
