import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainService } from '../../main.service';
import { AppService } from '../../../../app.service';
import { Materias } from '../../../../shared/materias.enum';
import { empty } from 'rxjs';

@Component({
  selector: 'app-side-main',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './side-main.component.html',
  styleUrl: './side-main.component.scss'
})
export class SideMainComponent implements OnInit{
  
  materias: any = Materias;

  usuario!: any;
  userRol: string | null = localStorage.getItem('rol');
  username: string | null = localStorage.getItem('username');
  usuarioID: string | null = localStorage.getItem('id');

  ordenarID: boolean = true;
  
  constructor(private mainService: MainService,
              private appService: AppService,
  ) {}

  ngOnInit(): void {
    if (this.username) this.mainService.getBuscarUsername(this.username).subscribe(usuario => this.usuario = usuario);
  }

  porID(): void {
    this.ordenarID = !this.ordenarID;
    const txt = this.ordenarID ? 'ASCENDENTE' : 'DESCENDENTE';
    this.mainService.setFiltroText(txt);
    this.appService.getCursoOrdenadoID(this.ordenarID).subscribe(data => this.mainService.setCursos(data));
  }

  porUsuario(): void {
    if(this.usuarioID) {
      this.appService.getCursoPorUsuario(parseInt(this.usuarioID)).subscribe(data => this.mainService.setCursos(data));
    }
    this.mainService.setFiltroText('MIS CURSOS');
  }

  porMateria(valor: any): void {
    valor !== '' ?
      this.appService.getCursoPorMateria(valor).subscribe(data => this.mainService.setCursos(data)) :
      this.porID();
    if(valor !== '') this.mainService.setFiltroText(valor);

  }
}
