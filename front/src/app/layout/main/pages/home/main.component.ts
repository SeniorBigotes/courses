import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SideMainComponent } from '../../components/side-main/side-main.component';
import { CoursesComponent } from '../../components/courses/courses.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [SideMainComponent, CoursesComponent, RouterModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  
  text: string = "correo@correo.com";
  cursoID: string | null = localStorage.getItem('cursoID')
  
  ngOnInit(): void {
    if(this.cursoID) localStorage.removeItem('cursoID');
  }
}
