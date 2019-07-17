import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import 'rxjs/add/operator/do.js';
import { AuthService } from '../login/service/auth.service';

export class AppInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // @ts-ignore
    if (request.url !== '/oauth/token' && request.url !== '/oauth/check_token') {
      const newRequest = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
      });
      return next.handle(newRequest).do(
        data => {
          console.log(`İstek başarılı: ${data}`);
        },
        error => {
          if (error.status === 401) {
              this.authService.refreshToken().subscribe(
                data => {
                  console.log(`Refresh token başarılı: ${data}`);
                  localStorage.setItem('access_token', data.access_token);
                  localStorage.setItem('refresh_token', data.refresh_token);

                  const reloadRequest = request.clone({
                    headers: request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
                  });
                  next.handle(reloadRequest).subscribe()
                },
                error1 => {
                  console.log(`Refreh token hatası: ${error1}`);
                  // TODO redirect login
                });
          } else {
            console.log(`İstek başarılı (401 hatası dışı): ${error}`);
            // TODO show error log
          }
        }
      );
    }

    return next.handle(request);
  }
}
