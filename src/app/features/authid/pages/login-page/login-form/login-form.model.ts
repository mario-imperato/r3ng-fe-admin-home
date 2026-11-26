

import {
  apply,
  readonly,
  required,
  schema,
  maxLength,
  minLength,
  pattern,
  validate,
  FieldTree,
  WithFieldTree, ValidationError,
  disabled
} from "@angular/forms/signals";

import * as form_helpers from "../../../../../shared/helpers/form.helpers";

export interface FieldDefinitionSelectOption {
  value: string;
  text: string;
}

export interface LoginFormFormData {
    nickname: string
    creds: string
}

export const LoginFormFormDataInitialState: LoginFormFormData = {
    nickname: "",
    creds: "",
}

/*  Custom Validator example [see also](https://angular.dev/guide/forms/signals/validation#custom-validation-rules)
 *  validate(schemaPath.--field-name--, ({value}) => {
 *       if (!value().startsWith('https://')) {
 *           return {
 *               kind: 'https',
 *               message: 'URL must start with https://'
 *           }
 *       }
 *       return null
 *  })
 */
export const LoginFormFormSchema = schema<LoginFormFormData>((schemaPath) => {
// @tpm-schematics:start-region("model-schema-section-nickname-region")
required(schemaPath.nickname, { message: "il nickname e' obbligatorio" })
// @tpm-schematics:end-region("model-schema-section-nickname-region")

// @tpm-schematics:start-region("model-schema-section-creds-region")
required(schemaPath.creds, { message: "il creds e' obbligatorio" })
// @tpm-schematics:end-region("model-schema-section-creds-region")

});

export interface LoginFormFieldDefinitionOptions {
  field: string
  placeHolder: string
  cssClass: string
  hidden: boolean
  required: boolean
  readOnly: boolean
  disabled: boolean
  selectOptions: FieldDefinitionSelectOption[]
  x_former : form_helpers.XFormFunction | undefined
  x_former_args: string[]
}

export const LoginFormFieldOptions : LoginFormFieldDefinitionOptions[] = [
{
  field: 'nickname',
  placeHolder : 'Username',
  cssClass: '<%=o.cssClass%>',
  hidden: false,
  required: true,
  readOnly: false,
  disabled: false,
  selectOptions: [
  ],
  x_former: undefined,
  x_former_args: []
},
{
  field: 'creds',
  placeHolder : 'Parola Chiave',
  cssClass: '<%=o.cssClass%>',
  hidden: false,
  required: true,
  readOnly: false,
  disabled: false,
  selectOptions: [
  ],
  x_former: undefined,
  x_former_args: []
},
]

export function mapFieldErrors2FieldTree(response: form_helpers.FormResponse, f?: FieldTree<LoginFormFormData>): WithFieldTree<ValidationError>[] {
  const errors: WithFieldTree<ValidationError>[] = [];

  if (!f) {
    return errors
  }

  if (response.fieldErrors) {
    for(const error of response.fieldErrors) {

      if (error.field == "nickname") {
        errors.push({
          fieldTree: f.nickname,
          kind: 'server',
          message: error.message,
        })
      }

      if (error.field == "creds") {
        errors.push({
          fieldTree: f.creds,
          kind: 'server',
          message: error.message,
        })
      }

    }
  }

  return errors
}
