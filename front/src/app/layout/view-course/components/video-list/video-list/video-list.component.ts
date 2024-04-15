import { Component, OnDestroy, OnInit } from '@angular/core';
import { ViewService } from '../../../view.service';
import { AppService } from '../../../../../app.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-video-list',
  standalone: true,
  imports: [],
  templateUrl: './video-list.component.html',
  styleUrl: './video-list.component.scss'
})
export class VideoListComponent implements OnInit, OnDestroy {

  lecciones: any[] = []
  cursoID: string | null = localStorage.getItem('cursoID');
  indiceLeccion: any[] = [];

  leccionSub!: Subscription;

  constructor(private viewService: ViewService,
              private appService: AppService,
  ) {}
  
  ngOnInit(): void {
    if (this.cursoID) this.leccionSub = this.appService.getLecciones(parseInt(this.cursoID)).subscribe(data => {
      this.lecciones = data;
      this.obtenerIndice(data);
    });

    this.viewService.$cursoID.subscribe(id => { 
      if(id) {
        this.appService.getLecciones(id).subscribe(data => {
          this.lecciones = data;
          this.obtenerIndice(data);
        });
      }
    });
  }

  verLeccion(leccion: string): void {
    this.viewService.setLeccin(leccion);
    
  }

  private obtenerIndice(datos: any): void {
    let count = 0
    for (let d of datos) {
      count++
      this.indiceLeccion[d.id] = count;
    }
  }

  ngOnDestroy(): void {
    this.leccionSub.unsubscribe();
  }
}
