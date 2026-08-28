import {Injectable} from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {Router} from '@angular/router';
import {AlertService} from '../services/alert.service';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {
  language = localStorage.getItem('language') || 'en';
  userRole = localStorage.getItem('role');

  constructor(private alert: AlertService, private router: Router) {
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Create initial headers with language and authorization
    let headers = request.headers
      .set('lang', this.language)
      .set('Authorization', `Bearer ${localStorage.getItem('temToken') || localStorage.getItem('token') || ''}`);

    // Conditionally add companyId if the user role is 'admin'
    if (this.userRole === 'Admin') {
      headers = headers.set('companyId', localStorage.getItem('temCompanyId') || localStorage.getItem('companyId') || '');
    }

    // Clone the request with the updated headers
    request = request.clone({headers});

    return next.handle(request).pipe(
      tap(
        (event: any) => {
          if (event instanceof HttpResponse) {
            if (event.url?.includes('api')) {
              if (!!event.body.success && !event.body.success) {
                this.alert.showAlert(event.body.errorMessage[0], 'bg-danger');
              }
            }
          }
        },
        (error) => {
          const errorMessage = error?.error?.errorMessage?.[0];
          if (errorMessage) {
            this.alert.showAlert(errorMessage, 'bg-danger');
          }
          if (error.status == 401) {
            let lang = localStorage.getItem('language') || 'en';
            localStorage.clear();
            localStorage.setItem('language', lang);
            this.router.navigate(['/auth/login']);
          }
        }
      )
    );
  }
}
