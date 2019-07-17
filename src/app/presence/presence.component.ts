import { Component, OnInit } from '@angular/core';
import { PresenceService } from './service/presence.service';
import { AuthService } from '../login/service/auth.service';
import {GuestsModel} from '../models/guests.model';

@Component({
  selector: 'app-presence',
  templateUrl: './presence.component.html',
  styleUrls: ['./presence.component.css']
})
export class PresenceComponent implements OnInit {
  guestsModel: GuestsModel[];
  constructor(private presenceService: PresenceService, private authService: AuthService) { }

  ngOnInit() {
    this.presenceService.getPresence().subscribe(data => {
      this.guestsModel = data;
      this.authService.isLogin = true;
    });
  }

}
