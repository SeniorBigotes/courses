import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../user/user.service';
import { LoginService } from '../../../login/login.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit {

  rol: string | null = this.loginService.obtenerRol();

  constructor(private loginService: LoginService,
              private router: Router) {}

  ngOnInit(): void {
    if(localStorage.length === 0) this.router.navigate(['/login']);
  }

}
