import { Component } from '@angular/core';

import {APP_CONFIG_CONST} from "../../../../app.globals";
import {MatIcon} from "@angular/material/icon";

@Component({
    selector: 'app-not-found-page',
    imports: [
        MatIcon
    ],
    templateUrl: './not-found-page.component.html',
    styleUrls: ['./not-found-page.component.scss']
})
export class NotFoundPageComponent {
  get appConfig(): any {
    return APP_CONFIG_CONST;
  }

}

