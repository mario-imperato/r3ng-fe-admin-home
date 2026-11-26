import {inject, Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpEventType,
    HttpHandlerFn, HttpErrorResponse
} from '@angular/common/http';
import {finalize, Observable, throwError} from 'rxjs';
import {LoaderService} from "../services/loader.service";
import {catchError, tap} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import * as app_globals from "../../../app.globals"

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  private totalRequests = 0;
  private router=inject(Router)
  private loadingService = inject(LoaderService)

  constructor() {}


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.totalRequests++;
    this.loadingService.setLoading(true);
    return next.handle(request).pipe(
        tap((resp) => {
            console.log('http-interceptor - tap: ', resp.type, resp)
            if (resp.type == HttpEventType.Response) {
                if (resp.status === 302) {
                    console.log('http-interceptor - caught 302 redirect! (2)')
                    // here you can implement your logic, or simply redirect as below
                    this.router.navigate(['/']);
                }
            }
            // if (resp instanceof HttpResponse) {
            //     if (resp.status === 302) {
            //         console.log('http-interceptor - caught 302 redirect')
            //         // here you can implement your logic, or simply redirect as below
            //         this.router.navigate(['/']);
            //     }
            // }
        }),
        catchError((err: HttpErrorResponse) => {
            let errorMsg = err.error.message;
            console.log('http-interceptor - caught error on route:', this.router.url, " with-error: ", err)

            if (err.status === 0) {
                if (err.url) {
                    console.log('http-interceptor - forcing document location to:', app_globals.APP_CONFIG_CONST.rootLocation)
                    document.location = app_globals.APP_CONFIG_CONST.rootLocation
                } else {
                    console.log('http-interceptor - routing to: /')
                    this.router.navigate(['/']);
                }
            }

            if (err.status == 401) {
                // here you can implement your logic, or simply redirect as below
                console.log('http-interceptor - caught error', err.status)
                if (err.url) {
                    document.location = err.url
                } else {
                    this.router.navigate(['/']);
                }

            }

            if (err.error instanceof ErrorEvent) {
                console.log('http-interceptor - client side error caught in interceptor');
            } else {
                console.log('http-interceptor - server side error caught in interceptor');
            }
            return throwError(() => err);
        }),
        finalize(() => {
          this.totalRequests--;
          if (this.totalRequests == 0) {
            this.loadingService.setLoading(false);
          }
        })
    );
  }
}
