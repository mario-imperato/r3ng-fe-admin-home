import {
  APP_INITIALIZER, ApplicationConfig, inject, LOCALE_ID,
  provideAppInitializer, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection
} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';

import { routes } from './app.routes';

import {PlatformLocation, registerLocaleData} from "@angular/common";
import * as app_globals from './app.globals';

import * as app_store from "./ng-store/app-store/signal-app-store";
import {firstValueFrom} from "rxjs";
import {APP_CONFIG_CONST} from "./app.globals";
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import {LoadingInterceptor} from "./shared/loader/interceptor/loading.interceptor";
import {ThemeService} from "./shared/themes/theme.service";
import * as keyValuePackage_pkg from "./store/system/key-value-package";
import {tap} from "rxjs/operators";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE,} from '@angular/material/core';
import localeItIt from '@angular/common/locales/it';
import { provideDateFnsAdapter } from '@angular/material-date-fns-adapter';
import { it } from 'date-fns/locale';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions} from "@angular/material/form-field";
import {CacheKVPService} from "./store/system/key-value-cache";
import {getKeyValuePackageProperty} from "./store/system/key-value-package";

registerLocaleData(localeItIt);

const IT_DATE_FORMAT = {
  parse: {
    dateInput: 'dd/MM/yyyy',
  }, display: {
    dateInput: 'dd/MM/yyyy', monthYearLabel: 'MMM yyyy', dateA11yLabel: 'PP', monthYearA11yLabel: 'MMMM yyyy',
  },
}

const MaterialFieldDefaultOptions: MatFormFieldDefaultOptions = {
  appearance: "outline",
}

/*
 * appConfig: used in main.ts when bootstrapping the application.
 * There is a number of providers. One is initailizeApp that doesn't do much at the moment but depends on
 * another injection app_globals.BaseHrefDomainSiteIdAndLanguage that gets instantiated and assigned.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    // Replaced by the provideZonelessChangeDetection()
    // provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptorsFromDi()),
    {provide: LOCALE_ID, useValue: 'it-IT'},
    { provide: MAT_DATE_LOCALE, useValue: it },
    provideDateFnsAdapter(IT_DATE_FORMAT),
    // {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: MaterialFieldDefaultOptions },
    provideHttpClient(
        // 302 Issue
        // DI-based interceptors must be explicitly enabled: questo apparentemente non serve almeno su questa versione (21.1.0).
        // Il provider HTTP_INTERCEPTORS viene comunque onorato
        withInterceptorsFromDi(),
        // Tetntativo alternativo con un interceptor diverso e abilitando le api di tipo fetch.
        // withInterceptors([authRedirectInterceptor]),
        // withFetch(),
    ),
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
/*
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: whoAmI,
      deps: [app_globals.BaseHrefDomainSiteIdAndLanguage, AppStore]
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: hostSite,
      deps: [app_globals.BaseHrefDomainSiteIdAndLanguage, AppStore]
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: hostDomain,
      deps: [app_globals.BaseHrefDomainSiteIdAndLanguage, AppStore]
    },
*/
    {
      provide: app_globals.BaseHrefDomainSiteIdAndLanguage, useFactory: app_globals.resolveBaseHrefDomainSiteIdAndLanguage,
      deps: [PlatformLocation]
    },

    provideAppInitializer(() => {
      const cacheService = inject(CacheKVPService);
      const themeService = inject(ThemeService);
      return firstValueFrom(cacheService.load().pipe(
          tap((res) => {
            useThemeService(res, themeService);
          })
      ))
    }),

    // Initialization of app store
    provideAppInitializer(() => {
      const baseService = inject(app_globals.BaseHrefDomainSiteIdAndLanguage);
      const appStore = inject(app_store.AppStore);
      return appStore.loadAll(baseService.isSite())
    }),

  ]
};

function useThemeService(response: Partial<keyValuePackage_pkg.KeyValuePackage>[], themeSvc: ThemeService) {
  const semLogContext = "app-initializer::select-theme"
  let theme = keyValuePackage_pkg.getKeyValuePackagePropertyFromPackage(response, keyValuePackage_pkg.KVPNames.KVP_THEME, "theme")
  console.log(semLogContext, " - using theme: ", theme)
  // to use a default theme: theme = "indigo-pink.css" look into angular.json for available themes.
  // if (theme != "theme-12") {
  //   theme = "greeneish-theme"
  // }

  themeSvc.setColor( theme)
}


