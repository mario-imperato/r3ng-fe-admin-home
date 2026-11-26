import {FieldDefinition} from "./field-def";
import {Validators} from "@angular/forms";
import {FormDefinition} from "./form-def";

function  getFieldDefinition(fd: FormDefinition, id: string): FieldDefinition {
    for (let f of fd.fields) {
      if (f.name == id)
        return f;
    }

    throw new Error(`Cannot find field definition id:${id}`);
  }


function  isFieldRequired(fd: FormDefinition, fieldName: string): boolean {
    for (const tField of fd.fields) {
      if (tField.name === fieldName
        && tField.validators != null && tField.validators.length > 0
        && tField.validators.filter(function (el) {
          return el === Validators.required;
        }).length > 0) {
        return true;
      }
    }
    return false;
  }

function  isFieldHidden(fd: FormDefinition, fieldName: string): boolean {
    return false;
  }

