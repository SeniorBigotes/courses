import { Component, OnInit } from '@angular/core';
import { FormComponent } from '../../components/form/form.component';
import { PreviewComponent } from '../../components/preview/preview.component';
import { Router } from '@angular/router';
import { UploadService } from '../../upload.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [FormComponent, PreviewComponent, CommonModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent implements OnInit {
  
  usuarioUrl: string | null = localStorage.getItem('rol');
  mensaje: string = ''; 

  constructor(private router: Router,
              private uploadService: UploadService,
  ) {}

  ngOnInit(): void {
    if(this.usuarioUrl === 'Alumno') this.router.navigate(['/']);
    this.uploadService.$mensaje.subscribe(msj => this.mensaje = msj);
  }
}
