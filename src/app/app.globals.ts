import {PlatformLocation} from "@angular/common";
import * as pathHelpers from './shared/helpers/path.helpers';
import {environment} from "../environments/environment";
import * as string_helpers  from "./shared/helpers/string.helpers";

export let APP_TYPE = 'admin'
export let APP_NAME = 'r3ng-fe-admin-home'

export let APP_CONFIG_CONST = {
  /* Location to prefix for public resolution. No trailing slash.
     When on regular server use '/r3ds9'. In dev mode use: '.'
   */
  assetsBaseUrl: environment.assetsBaseUrl, // environment.assetsBaseUrl, "./public"
  apiBaseUrl: environment.apiBaseUrl, // environment.apiBaseUrl, "/api"
  homeLocation: environment.homeLocationPattern,
  rootLocation: environment.rootLocation,
};

// export class Defaults {
//   static readonly AVATAR_USER_DEFAULT = `url(${APP_CONFIG_CONST.assetsBaseUrl}/console/icon-avatar.png)`
// }

export class BaseHrefDomainSiteIdAndLanguage {
  constructor(public appType: string, public domain : string, public site: string, public siteScope: string, public language: string, public appId: string) {
      APP_CONFIG_CONST.homeLocation = string_helpers.format(APP_CONFIG_CONST.homeLocation, domain, site, siteScope, language, appId);
    }

  isDomain() : boolean {
    if (this.domain == "root" || this.site == "*" || this.site == "star")  {
      return true
    }

    return false
  }

  isSite() : boolean {
    return !this.isDomain()
  }
}

export let CONTEXT_SITE: BaseHrefDomainSiteIdAndLanguage;
export function setContextDomainSiteIdAndLanguage(domSiteLang: BaseHrefDomainSiteIdAndLanguage): void {
  CONTEXT_SITE = domSiteLang;
  APP_CONFIG_CONST.assetsBaseUrl = string_helpers.format(APP_CONFIG_CONST.assetsBaseUrl, domSiteLang.domain, domSiteLang.site, domSiteLang.siteScope, domSiteLang.language)
  console.log("initializing CONTEXT-SITE", APP_CONFIG_CONST)
}

export function resolveBaseHrefDomainSiteIdAndLanguage(platformLocation: PlatformLocation): BaseHrefDomainSiteIdAndLanguage {
  const urlSiteInfo = pathHelpers.slicePathString(platformLocation.getBaseHrefFromDOM(), 1, 6);
  let appType = "www"
  if (urlSiteInfo[0] == 'ui-admin') {
    appType = APP_TYPE
  }
  setContextDomainSiteIdAndLanguage(new BaseHrefDomainSiteIdAndLanguage(appType, urlSiteInfo[1], urlSiteInfo[2], urlSiteInfo[3], urlSiteInfo[4], urlSiteInfo[5]));
  return CONTEXT_SITE;
}

