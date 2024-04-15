import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from '../../../../../app.service';
import { ViewService } from '../../../view.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [],
  templateUrl: './video.component.html',
  styleUrl: './video.component.scss'
})
export class VideoComponent implements OnInit, OnDestroy {
  
  videoUrl: string = '';
  videoNombre: string = 'Sin titulo';
  cursoID: string | null = localStorage.getItem('cursoID');
  curso: any = {};
  autor: any = {}

  cursoSub!: Subscription;
  autorSub!: Subscription;
  leccionSub!: Subscription;
  
  constructor(private appService: AppService,
              private viewService: ViewService
  ) {}

  ngOnInit(): void {
    if(this.cursoID) {
      const idCurso = parseInt(this.cursoID);
      this.cursoSub = this.appService.getCursoPorID(idCurso).subscribe(data => {
        this.curso = data;
        this.autorSub = this.appService.getUsuarioID(data.usuario_id).subscribe(usuario => this.autor = usuario);
      });

      this.viewService.$leccion.subscribe(data => {
        if(data) {
          this.leccionSub = this.appService.getLeccion(idCurso, data).subscribe(data => this.videoUrl = data.tumbnaiUrl);
          this.videoNombre = data;
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.cursoSub.unsubscribe();
    this.autorSub.unsubscribe();
    this.leccionSub.unsubscribe();
  }
}

