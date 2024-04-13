import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../upload.service';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss'
})
export class PreviewComponent implements OnInit{

  titulo: string = '';
  descripcion: string = '';
  imagen?: string;

  constructor(private uploadService: UploadService) {}

  ngOnInit(): void {
    this.uploadService.$tituloVideo.subscribe(titulo => this.titulo = titulo);
    this.uploadService.$descripcionVideo.subscribe(descripcion => this.descripcion = descripcion);
    this.uploadService.$imagenCurso.subscribe(img => this.imagen = img);
  }
}
