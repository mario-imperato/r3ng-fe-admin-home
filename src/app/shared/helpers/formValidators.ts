
/* TODO
 * Review the validations.
 */


// import { AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn } from '@angular/forms';
// import { ErrorStateMatcher } from '@angular/material/core';
//
// export function NoNegativeNumbers(control: AbstractControl): { negativeNumber: boolean } {
//   return { negativeNumber: control.value < 0 }
// }
//
// export function wellFormedPasswordValidator(minLength: number): ValidatorFn {
//   return (control: AbstractControl): { [key: string]: any } | null => {
//     if (control.value && control.value.length < 6) {
//       return { passwordTooShort: true };
//     }
//
//     return null;
//   };
// }
//
// export class FieldValuesMustMatch {
//   public fieldValuesMustMatch(field1: string, field2: string, errorPropertyName: string): ValidatorFn {
//     return (formGroup: FormGroup): ValidationErrors | null => {
//       const f1 = formGroup.get(field1);
//       const f2 = formGroup.get(field2);
//
//       if (!f1 || !f2) {
//         return null;
//       }
//
//       const f1value = f1.value;
//       const f2value = f2.value;
//       if (!f1value || !f2value) {
//         return null;
//       }
//
//       if (f1value !== f2value) {
//         console.log('Validating false: ', f1value, f2value);
//         const obj: {[k: string]: any} = {};
//         obj[errorPropertyName] = true;
//         return obj;
//       }
//
//       return null;
//     };
//   }
// }
//
// export class CrossFieldErrorStateMatcher implements ErrorStateMatcher {
//   constructor(private errorPropertyName: string) {}
//
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//       return form.hasError(this.errorPropertyName) && control.touched;
//   }
// }

import {ErrorStateMatcher} from "@angular/material/core";
import {FormControl, FormGroupDirective, NgForm} from "@angular/forms";

export class CrossFieldErrorStateMatcher implements ErrorStateMatcher {
    constructor(private errorPropertyName: string) {}

    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        if (form && control) {
            return form?.hasError(this.errorPropertyName) && control?.touched
        }

        return false
    }
}
