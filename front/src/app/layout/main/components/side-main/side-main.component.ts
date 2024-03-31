import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-main',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './side-main.component.html',
  styleUrl: './side-main.component.scss'
})
export class SideMainComponent {

    text: string = 'correo@correo.com'
}
