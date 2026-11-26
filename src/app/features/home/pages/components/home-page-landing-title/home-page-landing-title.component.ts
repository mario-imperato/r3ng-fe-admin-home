import {Component, Input} from '@angular/core';
import {MatDivider} from "@angular/material/list";
import {environment} from "../../../../../../environments/environment";

@Component({
    selector: 'app-home-page-landing-title',
    imports: [MatDivider],
    templateUrl: './home-page-landing-title.component.html',
    styleUrls: ['./home-page-landing-title.component.scss']
})
export class HomePageLandingTitleComponent {
    @Input() title : string = ""
    @Input() summary : string = ""
    @Input() loggedUser : string = ""
    @Input() appVersion : string = environment.appVersion
    showFiller = false;
}
