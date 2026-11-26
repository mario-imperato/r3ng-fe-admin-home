
import {ValidatorFn} from "@angular/forms";
import {formatDate} from "@angular/common";

type FieldType = 'text' | 'textarea' | 'select' | 'password' | 'recaptcha' | 'empty' | 'checkbox' | 'radio' | 'date';

let fieldSequence : number = 1;

type XFormFunction = (v : any,  ...args:  string[]) => string;

export function field_def_x_form_date(v : any) : string {
    return formatDate(v, 'longDate', 'it')
}

/*
 * Field base
 */
export interface FieldDefinitionOptions {
  cssClass: string;
  hidden: boolean;
  required: boolean;
  readOnly: boolean;
  disabled: boolean;
  x_former : XFormFunction | undefined;
  x_former_args: string[];
}

export interface FieldDefinitionStaticSelectOptions {
  value: string;
  text: string;
}

export const FieldDefinitionOptions_Default : FieldDefinitionOptions= {
  cssClass: '',
  hidden: false,
  required: false,
  readOnly: false,
  disabled: false,
  x_former : undefined,
  x_former_args: []
}

export interface FieldDefinition {
  type: FieldType;
  name: string;
  placeHolder: string;
  validators: ValidatorFn[];
  opts: FieldDefinitionOptions;
  selectOptions?: FieldDefinitionStaticSelectOptions[];
}

export function NewFieldDefinition( fieldName: string, t : FieldType, placeHolder: string, validators: ValidatorFn[] = [], opts: FieldDefinitionOptions = FieldDefinitionOptions_Default) : FieldDefinition {

  return {
  type : t,
  name : fieldName,
  placeHolder : placeHolder,
  validators : validators,
  opts : { ...FieldDefinitionOptions_Default, ...opts },
  }
}


/*
 * Field: simple
 */
export function NewFieldDefinitionText(fieldName: string, label: string, validators: ValidatorFn[], opts?: FieldDefinitionOptions) : FieldDefinition {
   return NewFieldDefinition(fieldName,'text',  label, validators, opts);
}

export function FieldDefinitionEmpty() : FieldDefinition {
  return NewFieldDefinition('empty' + fieldSequence++, 'empty', '', []);
}

export function NewFieldDefinitionStaticSelect(fieldName: string, label: string, selectOptions: FieldDefinitionStaticSelectOptions[],validators: ValidatorFn[], opts?: FieldDefinitionOptions) : FieldDefinition {
  let fieldDef =  NewFieldDefinition(fieldName,'select',  label, validators, opts);
  fieldDef.selectOptions = selectOptions
  return fieldDef
}
