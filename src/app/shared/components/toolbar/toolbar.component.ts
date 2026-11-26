import {Component, EventEmitter, inject, Input, Output, Signal} from '@angular/core';

import {Router} from "@angular/router";
import * as app_store from "../../../ng-store/app-store/signal-app-store";
import {Site} from "../../../store/system/site";
import {Domain} from "../../../store/system/domain";
import {User} from "../../../store/system/user";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";

@Component({
    selector: 'app-toolbar',
  imports: [
    MatToolbar,
    MatIcon,
    MatIconButton
  ],
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Input() withSideBar: boolean = false;
  @Input() withEndSideBar: boolean = false;

  @Output() toggleStartSideBar = new EventEmitter();
  @Output() toggleEndSideBar = new EventEmitter();

  siteInfo : Signal<Partial<Site>>
  domainInfo : Signal<Partial<Domain>>
  userInfo: Signal<Partial<User>>
  appStore = inject(app_store.AppStore)
  constructor(private router: Router) {
    this.siteInfo = this.appStore.site // toSignal(this.appStore.site$, { initialValue: {} });
    this.domainInfo = this.appStore.domain // toSignal(this.appStore.domain$, { initialValue: {} });
    this.userInfo = this.appStore.user // toSignal(this.appStore.user$, { initialValue: {} });
  }

  get toolBarTitle() : string {
    if (this.appStore.isSite()) {
      return this.siteInfo().name || ""
    }

    return this.domainInfo().name || ""
  }

  get toolBarSubTitle() : string {
    if (this.appStore.isSite()) {
      //return this.userInfo().firstname + " " + this.userInfo().lastname
      return "Giuseppe Celitti - PCWebAdministrator"
    }

    return this.domainInfo().name || ""
  }

  logOut(): void {
    const semLogContext = "app-toolbar::logout"
    console.log(semLogContext);
  }
}
