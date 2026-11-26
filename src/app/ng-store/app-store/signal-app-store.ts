import {User} from "../../store/system/user";
import {Site} from "../../store/system/site";
import {Domain} from "../../store/system/domain";
import {patchState, signalStore, withMethods, withState} from "@ngrx/signals";
import {UserEndpoint} from "../../store/system/user.endpoint";
import {DestroyRef, inject} from "@angular/core";
import {DomainEndpoint} from "../../store/system/domain.endpoint";
import {SiteEndpoint} from "../../store/system/site.endpoint";
import * as app_globals from "../../app.globals";

export type AppStoreState = {
    user: Partial<User>;
    site: Partial<Site>;
    domain: Partial<Domain>;
    appCtxInfo: app_globals.BaseHrefDomainSiteIdAndLanguage
}

const initialState: AppStoreState = {
    user: {},
    site: {},
    domain: {},
    appCtxInfo: new app_globals.BaseHrefDomainSiteIdAndLanguage('',  '',   '',   '', '',  '')
}

export const AppStore = signalStore(
    {providedIn: 'root'},
    withState(initialState),
    withMethods(
        (store, urlInfo = inject(app_globals.BaseHrefDomainSiteIdAndLanguage), domainSvc = inject(DomainEndpoint), siteSvc = inject(SiteEndpoint), userService = inject(UserEndpoint)) =>  ({
            async loadAll(withSite : boolean) {
                const d = await domainSvc.hostDomain();
                console.log("signal-app-store::domain", d);

                let s : Partial<Site> = {}
                if (withSite) {
                    s = await siteSvc.hostSite();
                    console.log("signal-app-store::site", s);
                }

                const u = await userService.whoAmI();
                console.log("signal-app-store::user", u);

                patchState(store, {user: u, site: s, domain: d, appCtxInfo: urlInfo});
            },

            async logOut(destroyRef: DestroyRef | undefined) {
                const fu = await userService.logOut(destroyRef);
                console.log("signal-app-store::user", fu);
                patchState(store, {user: fu.document});
                return fu
            },

            setUser: (u: Partial<User>) => {
                patchState(store, { user: u });
            },

            isSite() : boolean {
                return store.appCtxInfo().isSite()
            }
        }),
    ),
)
