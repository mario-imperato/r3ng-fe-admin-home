import {AbstractControl, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {FieldDefinition} from "./field-def";

export interface FormValidators {
  updateOn?: 'change' | 'blur' | 'submit'
  validators: ValidatorFn[]
}

export interface FormOptions {
  readOnly: boolean;
}

const defaultFormOptions: FormOptions = {
  readOnly: false,
}

export interface FormDefinition {
  fields: FieldDefinition[];
  formValidators: FormValidators;
  opts: FormOptions;
}

export function NewFormDefinition(
  fieldDefs: FieldDefinition[],
  aListOfValidators: FormValidators = {updateOn: 'change', validators: []},
  opts: FormOptions = defaultFormOptions): FormDefinition {
  return {
    fields: fieldDefs,
    formValidators: aListOfValidators,
    opts: {...defaultFormOptions, ...opts},
  }
}

