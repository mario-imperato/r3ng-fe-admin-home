import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import * as app_store from "../../../ng-store/app-store/signal-app-store";
import {Router} from "@angular/router";
import * as key_value_store_module from "../../../store/system/key-value";
import * as user_pkg from "../../../store/system/user";
import { HttpErrorResponse } from "@angular/common/http";

import {App} from "../../../store/commons/app";
import {APP_TYPE, APP_NAME} from "../../../app.globals";
import {CacheKVPService} from "../../../store/system/key-value-cache";
import {ProfileImageComponent} from "../profile-image/profile-image.component";
import {MatDivider} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";

// export interface AppKvpDefinition {
//     id: string
//     icon: string
//     url: string
//     hint: string
//     current: boolean
// }

@Component({
    selector: 'app-apps-palette',
    standalone: true,
    imports: [CommonModule, ProfileImageComponent, ProfileImageComponent, MatDivider, MatIcon, MatTooltip],
    templateUrl: './apps-palette.component.html',
    styleUrls: ['./apps-palette.component.scss']
})
export class AppsPaletteComponent implements OnInit {

    apps: key_value_store_module.KeyValueApp[] = [];
    private destroyRef = inject(DestroyRef);
    #cacheKvService = inject(CacheKVPService)
    appStore = inject(app_store.AppStore)

    constructor( private router: Router) {
    }


    ngOnInit(): void {
        const semLogContext = "app-apps-palette::ng-on-init"

        let siteDomainApps = this.appStore.domain().apps
        if (this.appStore.appCtxInfo.isSite()) {
            siteDomainApps = this.appStore.site().apps
        }

        if (!siteDomainApps || siteDomainApps.length == 0) {
            return
        }

        const appsKVP = this.#cacheKvService.getPackage("apps")
        console.log(semLogContext, appsKVP)
        if (appsKVP) {
            if (appsKVP) {
                for (const p of appsKVP.properties!) {
                    if (this.isAppInSet(p.key, siteDomainApps)) {
                        const appDef = key_value_store_module.getAppDefinitionFromKeyValue(this.appStore.appCtxInfo().domain, this.appStore.appCtxInfo().site, this.appStore.appCtxInfo().siteScope, this.appStore.appCtxInfo().language,p)
                        this.apps.push(appDef)
                        // if (p.kind.startsWith("record:")) {
                        //     let items = p.value.split(",")
                        //     let appDef = {
                        //         id: p.key,
                        //         icon: items[0],
                        //         url: string_helpers.format(items[1], this.appStore.appCtxInfo.domain, this.appStore.appCtxInfo.site, this.appStore.appCtxInfo.language),
                        //         hint: items[2],
                        //         current: false,
                        //     }
                        //
                        //     this.apps.push(appDef)
                        // }
                    }
                }
            }
        }

    }

    isCurrentApp(n: string): boolean {
        return APP_NAME == n
    }

    isAppInSet(appId: string, listOfApps: App[]): boolean {
        for (const a of listOfApps) {
            if (a.id == appId) {
                return true
            }
        }
        return false
    }

    logOut(): void {
        const semLogContext = "apps-palette-component::log-out"

        this.appStore.logOut(this.destroyRef).then((resp) => {
            console.log("apps-palette-component::log-out")
            if (resp && resp.status == 302) {
                document.location = resp.message!
            } else {
                this.router.navigate(['/login']);
            }
        }).catch((error: HttpErrorResponse ) => {
                console.error(semLogContext, `There was an error! ${error.status} - ${error}`);
            }
        )
    }

    userHasAnyRoleForApps(appUser: Partial<user_pkg.User>): boolean {
        const semLogContext = "apps-palette::user-has-any-role-for-apps"
        for (const a of this.apps) {
            if (user_pkg.HasRole(appUser, this.appStore.appCtxInfo().domain, this.appStore.appCtxInfo().site, APP_TYPE, a.id)) {
                console.debug(semLogContext, `got role for ${a.id}`)
                return true
            }
        }
        return false
    }

    userHasAnyRoleForApp(appUser: Partial<user_pkg.User>, appId: string): boolean {
        const semLogContext = "apps-palette::user-has-any-role-for-app"
        return user_pkg.HasRole(appUser, this.appStore.appCtxInfo().domain, this.appStore.appCtxInfo().site, APP_TYPE, appId)
    }

}
