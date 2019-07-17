import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';
import { PresenceService } from '../presence/service/presence.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private presenceService: PresenceService) { }

  ngOnInit() {
  }

  login() {
    this.authService.getToken().subscribe(
      data => {
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        this.authService.isLogin = true;
        this.router.navigate(['/presence']);
      },
      error => {
        console.log(error);
      });
  }
}
