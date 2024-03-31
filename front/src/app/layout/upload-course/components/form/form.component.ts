import { Component } from '@angular/core';
import { UploadService } from '../../upload.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {

  constructor(private uploadService: UploadService) {}

  cambiosTitulo(event: any): void {
    this.uploadService.setTituloVideo(event.target.value);
  }

  cambiosDescripcion(event: any): void {
    this.uploadService.setDescripcionVideo(event.target.value);
  }

}
