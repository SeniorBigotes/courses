import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainService } from '../../main.service';
import { AppService } from '../../../../app.service';

@Component({
  selector: 'app-side-main',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './side-main.component.html',
  styleUrl: './side-main.component.scss'
})
export class SideMainComponent implements OnInit{
  

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
    this.appService.getCursoOrdenadoID(this.ordenarID).subscribe(data => this.mainService.setCursos(data));
  }

  porUsuario(): void {
    if(this.usuarioID) {
      this.appService.getCursoPorUsuario(parseInt(this.usuarioID)).subscribe(data => this.mainService.setCursos(data));
    }
  }

  porMateria(): void {
    // hacer el select para escojer la materia
  }
}
