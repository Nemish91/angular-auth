import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthenticationService } from './auth.service';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthenticationService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('hi');
    request = request.clone({
      setHeaders: {
        OTCSTICKET: `${this.auth.getToken()}`
      }
    });
    
    return next.handle(request);
  }
}