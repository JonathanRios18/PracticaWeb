import { inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Función de interceptor usando la firma correcta de HttpInterceptorFn
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);  // Usar inject() para acceder a AuthService
  const router = inject(Router);  // Usar inject() para acceder a Router

  const token = authService.getToken();

  if (token) {
    // Clonar la solicitud y agregar el token
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req).pipe(
    catchError((error) => {
      console.error('Interceptor Error:', error); // Debugging
      if (error.status === 401 || error.status === 403) {
        authService.removeToken();
        router.navigate(['/login']);
      }
      return throwError(error);
    })
  );  
};
