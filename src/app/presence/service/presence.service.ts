import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  pathPresence = '/api/guests';
  constructor(private http: HttpClient) { }


  getPresence(): Observable<any> {
    return this.http.get(this.pathPresence);
  }
}
