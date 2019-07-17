import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PresenceComponent} from './presence/presence.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {path: 'presence', component: PresenceComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
