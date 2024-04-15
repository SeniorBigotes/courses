import { Component } from '@angular/core';
import { AppService } from '../../../../app.service';
import { MainService } from '../../main.service';
import { Router, RouterModule } from '@angular/router';
import { ViewService } from '../../../view-course/view.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {

  cursos: any = [];
  usuarios: Array<any> = [];
  miniaturas: any = [];
  filtroText: string = 'ASCENDENTE';

  constructor(private appService: AppService,
              private mainService: MainService,
              private viewService: ViewService,
              private router: Router,
  ) { }

  ngOnInit(): void {    
    this.appService.getCursos().subscribe(c => {
      this.cursos = c;
      
      c.forEach((datos: any) => {
        this.appService.getMiniatura(datos.id).subscribe({
          next: mini => this.miniaturas[datos.id] = mini,
          error: err => console.error('mini no encontrada', err)
        });

        this.appService.getUsuarioID(datos.usuario_id).subscribe(u => {
          const usuario = `${u.nombres} ${u.apellido_M}`
          this.usuarios[u.id] = usuario;
        })
      });
    });

    this.mainService.$cursos.subscribe(data => this.cursos = data);
    this.mainService.$filtroText.subscribe(data => this.filtroText = data);
  }

  navegar(curso: any) {
    this.router.navigate([`view/${curso.titulo.replace(/ /g, '_')}`]);
    this.viewService.setCursoID(curso.id);
    this.viewService.setLocalStorage('cursoID', curso.id);
  }

}
