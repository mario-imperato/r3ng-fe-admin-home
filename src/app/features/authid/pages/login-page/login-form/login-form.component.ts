

import {Component, computed, DestroyRef, EventEmitter, inject, Input, input, OnInit, Output, resource, signal} from '@angular/core';
import {CommonModule,Location} from '@angular/common';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {MatButton} from "@angular/material/button";
import {ApiMessageComponent} from "../../../../../shared/components/api-message/api-message.component";

import * as dictionary from "./login-form.dictionary";

import * as app_globals from "../../../../../app.globals";
import * as string_helpers from "../../../../../shared/helpers/string.helpers";
import * as form_helpers from "../../../../../shared/helpers/form.helpers";

import * as form_definition from "./login-form.model";
import {FieldTree, FormField, FieldState, form, WithFieldTree, ValidationError} from "@angular/forms/signals";

// @tpm-schematics:start-region("import-section-region")

import {CacheKVPService} from "../../../../../store/system/key-value-cache";
import * as store_user from "../../../../../store/system/user";
import {MatError, MatFormField, MatInput, MatLabel, MatSuffix} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {PasswdDirective} from "../../../../../shared/directives/forms/passwd.directive";
import {Router} from "@angular/router";
import * as app_store from "../../../../../ng-store/app-store/signal-app-store";
import {UserFormResponse} from "../../../../../store/system/user";
import {patchState} from "@ngrx/signals";

// @tpm-schematics:end-region("import-section-region")

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
       CommonModule, ApiMessageComponent, MatButton,

       // @tpm-schematics:start-region("component-import-section-region")
    // TODO: Uncomment and add
    FormField, MatFormField, MatLabel, MatInput, MatError, MatIcon, PasswdDirective, MatSuffix,
       // @tpm-schematics:end-region("component-import-section-region")

  ],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  public componentAppStatus : {status: 'success' | 'error' | 'none' | 'warn', description: string} = { status: 'none', description: '' };

  // @tpm-schematics:start-region("class-body-head-section-region")
  userStore = inject(app_store.AppStore)
  router=inject(Router)

  // @tpm-schematics:end-region("class-body-head-section-region")
     credsFieldHide = true;

  baseHrefInfo = inject(app_globals.BaseHrefDomainSiteIdAndLanguage)
  #location= inject(Location)
  // kvCache = inject(CacheKVPService)
  private destroyRef = inject(DestroyRef);

  protected readonly loginFormModel = signal<form_definition.LoginFormFormData>(form_definition.LoginFormFormDataInitialState);
  protected readonly loginForm = form(this.loginFormModel, form_definition.LoginFormFormSchema);

  // pwdCrossValidationMatcher = new FormValidatorsHelpers.CrossFieldErrorStateMatcher('passwordMismatch')

  constructor() {}

  ngOnInit(): void {
    // @tpm-schematics:start-region("ng-on-init-section-region")
    const formBean = undefined

    // @tpm-schematics:end-region("ng-on-init-section-region")
  }

  // @tpm-schematics:start-region("class-body-middle-section-region")
  // @tpm-schematics:end-region("class-body-middle-section-region")

  /*
   * field methods ----------------------------------------------------------
   */
  // @tpm-schematics:start-region("form-field-section-nickname-region")
  // @tpm-schematics:end-region("form-field-section-nickname-region")


  // @tpm-schematics:start-region("form-field-section-creds-region")
  // @tpm-schematics:end-region("form-field-section-creds-region")



  /*
   * form methods ----------------------------------------------------------
   */

  onSubmitAction(evt: any): void {
    evt.preventDefault();
    this.doSubmit();
  }

  onClearAction(): void {
    this.onResetAction()
  }

  onResetAction(): void {
    this.loginFormModel.set(form_definition.LoginFormFormDataInitialState)
    this.loginForm().reset(form_definition.LoginFormFormDataInitialState)
  }

  private http= inject(HttpClient)

  doSubmit(): void {
    const semLogContext = "login-form::do-submit"
    const jf = JSON.stringify(this.loginForm().value())
    console.log(semLogContext, jf);

    // @tpm-schematics:start-region("form-section-do-submit-region")

    const u = string_helpers.format(
            store_user.UserEndpointConfig.logIn,
            this.baseHrefInfo.domain, this.baseHrefInfo.site, this.baseHrefInfo.siteScope, this.baseHrefInfo.language,
    );

    form_helpers.submitForm(
        this.http,
        "POST",
        u,
        this.loginForm,
        {
          onResponse: (response: form_helpers.FormResponse, f?:FieldTree<form_definition.LoginFormFormData>) : WithFieldTree<ValidationError>[] | undefined => {
            if (response.status == 200) {
              // console.log('Returned User ' + user);
              this.componentAppStatus.status = 'none';
              //this.userStore.patchState(store, {user: u, site: s, domain: d});
              this.userStore.setUser((response as store_user.UserFormResponse).document)
              this.router.navigate(['/']);
            } else {
              return form_definition.mapFieldErrors2FieldTree(response, f)
            }

            return undefined
          },
          onHttpError: (error: HttpErrorResponse) : void => {
            this.componentAppStatus.status = 'error';
            this.componentAppStatus.description = dictionary.GetMessageFor(error.status)
          },

        },
        this.destroyRef)


    // @tpm-schematics:end-region("form-section-do-submit-region")
  }

  /*
   * Convenience methods ----------------------------------------------------------
   */

  /*
  selectStaticLUT(ctrlName :string) : fieldDef.FieldDefinitionStaticSelectOptions[] {
    for (var fdef of LoginFormDefinition.fields) {
      if (fdef.name == ctrlName) {
        return fdef.selectOptions || []
      }
    }

    return []
  }

  selectKVLUT(pkgName :string) : key_value_store.KeyValue[] {
    const kvp = this.kvCache.getPackage(pkgName)
    if (kvp) {
      return kvp.properties
    }

    return []
  }
  */

  protected formError(fieldState: FieldState<string, string>) : string[] {
    return form_helpers.formError(fieldState)
  }

  // @tpm-schematics:start-region("class-body-tail-section-region")
  // @tpm-schematics:end-region("class-body-tail-section-region")
}
