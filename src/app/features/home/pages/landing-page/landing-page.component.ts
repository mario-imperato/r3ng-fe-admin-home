import { Component, OnInit, inject, signal } from '@angular/core';
import {
    HomePageLandingTitleComponent
} from "../components/home-page-landing-title/home-page-landing-title.component";
import {MatButton} from "@angular/material/button";
import {
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardTitle
} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import * as app_store from "../../../../ng-store/app-store/signal-app-store";
import {GetFirstRoleInApp} from "../../../../store/system/user";
import * as app_globals from "../../../../app.globals";

@Component({
    selector: 'app-landing-page',
    imports: [
        HomePageLandingTitleComponent,
    ],
    templateUrl: './landing-page.component.html',
    styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent  implements OnInit {

    appStore = inject(app_store.AppStore)
    urlSiteInfo= inject(app_globals.BaseHrefDomainSiteIdAndLanguage)

    typeOfContext= signal<string>("")

    ngOnInit(): void {
        const semLogContext = "app-landing-page::ng-on-init"
        if (this.appStore.appCtxInfo.isDomain()) {
            if (this.appStore.appCtxInfo().domain == "root") {
                this.typeOfContext.set("root")
            } else {
                this.typeOfContext.set("domain")
            }
        } else {
            this.typeOfContext.set("site")
        }
    }

    get loggedUser() : string {
        if (this.appStore.user) {
            let n = [this.appStore.user().firstname, this.appStore.user().lastname].join(' ')
            const roleInApp = GetFirstRoleInApp(this.appStore.user(), this.urlSiteInfo.domain, this.urlSiteInfo.site, this.urlSiteInfo.appType, this.urlSiteInfo.appId)
            if (roleInApp) {
                n = n + " (" + roleInApp + ")"
            }

            return n.trim()
        }

        return ""
    }

    get titleSummary(): string {

        let summary = ""
        switch (this.typeOfContext()) {
            case "root": {
                summary = "Selezionare dalla lista il dominio sul quale si desidera operare"
                break
            }
            case "domain":{
                summary = "Selezionare dalla lista l'Istituto sul quale si desidera operare"
                break
            }
            case "site":{
                summary = "Selezionare dalla lista l'area funzionale sulla quale si desidera operare"
                break
            }
        }
        return summary;
    }

}
