import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainService } from '../../main.service';

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
  
  constructor(private mainService: MainService) {}

  ngOnInit(): void {
    if (this.username) this.mainService.getBuscarUsername(this.username).subscribe(usuario => this.usuario = usuario);
  }
}
