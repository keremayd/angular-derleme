import { Component, OnInit } from '@angular/core';
import { AuthService } from './login/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'reactive-code';
  constructor(private authService: AuthService) {}

  ngOnInit() {
  }

}
