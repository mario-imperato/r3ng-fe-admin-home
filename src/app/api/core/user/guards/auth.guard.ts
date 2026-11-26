import {inject, Injectable} from '@angular/core';
import {
  Router,
} from '@angular/router';
import * as app_store  from '../../../../ng-store/app-store/signal-app-store';
import * as app_globals from '../../../../app.globals';
import * as user_pkg from '../../../../store/system/user';
import {APP_TYPE} from "../../../../app.globals";

interface  AuthGuardParams  {
  public: boolean
  roles?: string[]
  redirectUrl?: string
}

export const canActivate = (params: AuthGuardParams, router = inject(Router), authService = inject(app_store.AppStore)) => {
  const semLogContext = "auth-guard::fn"

  if (!params) {
    console.log(semLogContext, ` [${authService.user().nickname}] allowed... no params specified`)
    return true
  }

  if (params.public) {
    console.log(semLogContext, ` [${authService.user().nickname}]: allowed... public route`)
    return true;
  }

  if (authService.user()._et == "guest-user" ) {
    console.log(semLogContext, ` [${authService.user().nickname}]: NOT allowed... user is guest`);
    return router.parseUrl(params.redirectUrl || '/missed-route')
  }

  if (!authService.user().roles) {
    console.log(semLogContext, ` [${authService.user().nickname}]: NOT allowed... user has no roles`);
    return router.parseUrl(params.redirectUrl || '/missed-route');
  }


  // const roles = ai.roles;
  // if (this.authService.state.user.hasRole(this.siteStore.site.site?.siteid, this.siteStore.site.domain?.siteid, roles)) {
  //   return true;
  // }

  if (params.roles) {
    if (!user_pkg.HasRole(authService.user(), authService.appCtxInfo().domain, authService.appCtxInfo().site, APP_TYPE, authService.appCtxInfo().appId, ...params.roles)) {
      return router.parseUrl(params.redirectUrl || '/missed-route');
    }
  }
  return true // router.parseUrl(params.redirectUrl || '/missed-route');
}

export const canActivateGuest = (params: AuthGuardParams, router = inject(Router), authService = inject(app_store.AppStore)) => {
  const semLogContext = "auth-guard::can-activate-guest"
  console.log(semLogContext);

  if (authService.user()._et == "guest-user" ) {
    return true;
  }

  return router.parseUrl(params.redirectUrl || '/missed-route');
}

export const canActivateNOTGuest = (params: AuthGuardParams, router = inject(Router), authService = inject(app_store.AppStore)) => {
  const semLogContext = "auth-guard::can-activate-NOT-guest"
  console.log(semLogContext);

  if (authService.user()._et == "guest-user" ) {
    return router.parseUrl(params.redirectUrl || '/missed-route');
  }

  return true;
}

/*
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AppStore,
    private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    return true
  }
}
 */
