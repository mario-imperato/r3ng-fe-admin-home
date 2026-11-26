import { Component } from '@angular/core';

import {LoginFormComponent} from "./login-form/login-form.component";
import {ToolbarComponent} from "../../../../shared/components/toolbar/toolbar.component";

@Component({
    selector: 'app-login-page',
    imports: [ToolbarComponent, LoginFormComponent],
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

}
