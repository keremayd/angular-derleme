import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogin = false;
  loginUser: any = {};
  pathToken = '/oauth/token';
  pathCheckToken = '/oauth/check_token';

  constructor(private http: HttpClient, private router: Router) { }

  getToken(): Observable<any> {
    return this.http.post<any>(this.pathToken, {}, {
      headers: new HttpHeaders()
        .set('Authorization', 'Basic ' + btoa('airsight_test:123123123')),
      params: new HttpParams()
        .set('username', this.loginUser.username)
        .set('password', this.loginUser.password)
        .set('grant_type', 'password')
        .set('scope', 'read')
    });
  }

  checkToken(): Observable<any> {
    return this.http.post<any>(this.pathCheckToken, {}, {
      headers: new HttpHeaders()
        .set('Authorization', 'Basic ' + btoa('airsight_test:123123123')),
      params: new HttpParams()
        .set('token', localStorage.getItem('access_token'))
    });
  }

  refreshToken(): Observable<any> {
    return this.http.post<any>(this.pathToken, {}, {
      headers: new HttpHeaders()
        .set('Authorization', 'Basic ' + btoa('airsight_test:123123123')),
      params: new HttpParams()
        .set('grant_type', 'refresh_token')
        .set('refresh_token', localStorage.getItem('refresh_token'))
    }).do(
      data => {
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
    });
  }

  logout(): void {
    this.isLogin = false;
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['login']);
  }

}
