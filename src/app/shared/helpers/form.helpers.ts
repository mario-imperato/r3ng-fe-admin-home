import {formatDate} from "@angular/common";
import {
  FieldState,
  FieldTree,
  submit,
  ValidationError,
  WithFieldTree,
} from '@angular/forms/signals';
import {DestroyRef} from "@angular/core";
import {firstValueFrom, Observable, take, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

export type XFormFunction = (v : any,  ...args:  string[]) => string;

export function field_def_x_form_date(v : any) : string {

    if (v) {
        try {
            return formatDate(v, 'longDate', 'it')
        } catch(e){
            console.log("form_helpers::XFormDate", e)
        }

    }

    return ""
}

export function formError(fieldState: FieldState<string, string>) : string[] {
    const res : string[] = []
    if (fieldState.touched() && fieldState.errors().length) {
        for (let error of fieldState.errors()) {
            if (error.message) {
                res.push(error.message)
            }
        }
    }

    return res
}

export function formDateError(fieldState: FieldState<Date, string>) : string[] {
    const res : string[] = []
    if (fieldState.touched() && fieldState.errors().length) {
        for (let error of fieldState.errors()) {
            if (error.message) {
                res.push(error.message)
            }
        }
    }

    return res
}

export interface FormFieldError {
    field: string
    message: string
}

export interface FormResponse  {
    status : number
    message : string
    fieldErrors?: FormFieldError[]
}

export interface submitFormCallbacks<TModel> {
    onResponse? : (obj : FormResponse, f?: FieldTree<TModel>) => WithFieldTree<ValidationError>[] | undefined;
    onHttpError? : (obj : HttpErrorResponse) => void;
}

export function submitForm<TModel>(http: HttpClient, method: string, url: string, form: FieldTree<TModel>, cbs: submitFormCallbacks<TModel>, destroyRef : DestroyRef) {

    const jf = JSON.stringify(form().value())
    submit(form, async (f) => {
        let errors: WithFieldTree<ValidationError>[] = [];
        console.log("-----", f);
        // try {
        let response : FormResponse | void = undefined

        switch (method.toUpperCase()) {
            case "POST":
                response = await httpPostForm(http, url, jf, destroyRef).
                catch((error: HttpErrorResponse) => {
                        console.log("####", error)
                        if (cbs && cbs.onHttpError) {
                            cbs.onHttpError(error)
                        }
                    }
                );
                break
            case "PUT":
                response = await httpPutForm(http, url, jf, destroyRef).
                catch((error: HttpErrorResponse) => {
                        console.log("####", error)
                        if (cbs && cbs.onHttpError) {
                            cbs.onHttpError(error)
                        }
                    }
                );
                break
            default:
                console.error("Unknown method " + method.toUpperCase())
        }

        if (response && cbs && cbs.onResponse) {
            const errs = cbs.onResponse(response, form)
            if (errs) {
                errors = errs;
            }
        }

        // } catch (e) {
        //     errors.push(
        //         {
        //             fieldTree: form,
        //             kind: 'serverError',
        //             message: 'There was an server error, please try again (should work after 3rd try)',
        //         }
        //     );
        // }

        // setTimeout(() => this.onResetAction(), 3000);

        return errors;
    });
}

export function httpPostForm(http: HttpClient, url: string, formJson: string, destroyRef: DestroyRef | undefined) : Promise<FormResponse> {
    const semLogContext = "form_helpers::http-post-form"
    const headers = { accept: 'application/json', 'Content-type': 'application/json' }

    return firstValueFrom(http.post<FormResponse>(url, formJson, { responseType: 'json', withCredentials: true, headers: headers })
        .pipe(
            map((response) => {
                return response;
            }),
            takeUntilDestroyed(destroyRef),
            take(1),
            catchError((error: HttpErrorResponse) => {
                console.error(semLogContext, error)
                return throwError(() => error);
            })
        ));
}

export function httpPutForm(http: HttpClient, url: string, formJson: string, destroyRef: DestroyRef | undefined) : Promise<FormResponse> {
    const semLogContext = "form_helpers::http-put-form"
    const headers = { accept: 'application/json', 'Content-type': 'application/json' }

    return firstValueFrom(http.put<FormResponse>(url, formJson, { responseType: 'json', withCredentials: true, headers: headers })
        .pipe(
            map((response) => {
                return response;
            }),
            takeUntilDestroyed(destroyRef),
            take(1),
            catchError((error: HttpErrorResponse) => {
                console.error(semLogContext, error)
                return throwError(() => error);
            })
        ));
}

/*
 * Single file submission
 */
export interface postFileCallbacks<TModel> {
    onResponse? : (obj : TModel) => void
    onHttpError? : (obj : HttpErrorResponse) => void
}

export interface FormFileResponse  {
    status : number
    message : string
}

export function postFile<TModel>(http: HttpClient, url: string, form: FormData, cbs: postFileCallbacks<TModel>, destroyRef : DestroyRef) {

    httpPostFile<TModel>(http, url, form, destroyRef).catch((error: HttpErrorResponse) => {
        console.log("####", error)
        if (cbs && cbs.onHttpError) {
            cbs.onHttpError(error)
        }
    }).then(response => {
        if (response && cbs && cbs.onResponse) {
            cbs.onResponse(response)
        }
    })
}

export function httpPostFile<TModel>(http: HttpClient, url: string,  formData: FormData, destroyRef: DestroyRef | undefined): Promise<TModel> {
    const semLogContext = "file-endpoint::post"
    const headers = { accept: 'application/json' };

    return firstValueFrom(http
    .post<TModel>(url, formData, {
        responseType: 'json',
        withCredentials: true,
        headers: headers,
    })
    .pipe(
        map((response) => { return response; }),
        takeUntilDestroyed(destroyRef),
        take(1),
        catchError((error: HttpErrorResponse) => {
            console.error(semLogContext, error)
            return throwError(() => error);
        })
    ));
}
