import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Router} from '@angular/router';
import {AuthService} from '../login/service/auth.service';
import {catchError, switchMap} from 'rxjs/operators';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';

export class AuthInterceptor implements HttpInterceptor {

  refreshTokenInProgress = false;

  tokenRefreshedSource = new Subject();
  tokenRefreshed$ = this.tokenRefreshedSource.asObservable();

  constructor(private authService: AuthService) {}

  addAuthHeader(request) {
    if (localStorage.getItem('access_token')) {
      return request.clone({
        headers: request.headers
          .set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
      });
    }
    return request;
  }

  refreshToken() {
    if (this.refreshTokenInProgress) {
      return new Observable(observer => {
        this.tokenRefreshed$.subscribe(() => {
          observer.next();
          observer.complete();
        });
      });
    } else {
      this.refreshTokenInProgress = true;

      return this.authService.refreshToken()
        .do(() => {
          this.refreshTokenInProgress = false;
          this.tokenRefreshedSource.next();
        });
    }
  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (request.url === '/oauth/token' || request.url === '/oauth/check_token') {
      return next.handle(request);
    }

    // Handle request
    request = this.addAuthHeader(request);

    // Handle response
    return next.handle(request).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.refreshToken()
            .pipe(
              switchMap(() => {
                request = this.addAuthHeader(request);
                return next.handle(request);
              }),
              catchError(err => {
                this.authService.logout();
                return Observable.empty();
              })
            );
        }
        return Observable.throwError(error);
      })
    );
  }
}
