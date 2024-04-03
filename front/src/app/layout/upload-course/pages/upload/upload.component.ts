import { Component, OnInit } from '@angular/core';
import { FormComponent } from '../../components/form/form.component';
import { PreviewComponent } from '../../components/preview/preview.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [FormComponent, PreviewComponent ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent implements OnInit {
  
  usuarioUrl: string | null = localStorage.getItem('rol');

  constructor(private router: Router) {}

  ngOnInit(): void {
    if(this.usuarioUrl === 'Alumno') this.router.navigate(['/']);
  }
}
