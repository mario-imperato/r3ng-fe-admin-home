import {Component, inject} from '@angular/core';

import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {ToolbarComponent} from "../../../../shared/components/toolbar/toolbar.component";
import * as app_store from "../../../../ng-store/app-store/signal-app-store";

import {AppsPaletteComponent} from "../../../../shared/components/apps-palette/apps-palette.component";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {Site} from "../../../../store/system/site";
import {Domain} from "../../../../store/system/domain";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";

@Component({
    selector: 'app-home-page',
    imports: [RouterOutlet, ToolbarComponent, AppsPaletteComponent, MatNavList, MatIcon, MatListItem, RouterLink, MatSidenavContainer, MatSidenav, MatSidenavContent],
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
    site : Partial<Site>
    domain : Partial<Domain>
    sideNavCollapsed = true

    appStore = inject(app_store.AppStore)

    constructor(private router: Router) {
        this.site = this.appStore.site()
        this.domain = this.appStore.domain()
    }

    toggleSideNavStart() {
        this.sideNavCollapsed = !this.sideNavCollapsed
    }
}
