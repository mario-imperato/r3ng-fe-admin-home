import {HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

export function authRedirectInterceptor(
    req: HttpRequest<unknown>,
    next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
    return next(req).pipe(
        tap((event) => {
            console.log('***************** redirect', event.type, event);
            if (event.type === HttpEventType.Response && event.redirected) {
                console.log('***************** redirect', event.type, event.redirected, event);
                document.location = "/ui-admin/card/10000/it/app-system"
                // Check if we were redirected to a login page
                if (event.url?.includes('/login')) {
                    // Handle authentication redirect
                    console.log('***************** redirect');
                }
            }
        }),
    );
}