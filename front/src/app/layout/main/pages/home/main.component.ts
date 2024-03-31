import { Component } from '@angular/core';
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
export class MainComponent {

  text: string = "correo@correo.com";

}
