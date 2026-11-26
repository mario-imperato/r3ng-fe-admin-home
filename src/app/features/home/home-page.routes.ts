import {HomePageComponent} from "./pages/home-page/home-page.component";
import {Routes} from "@angular/router";
import {LandingPageComponent} from "./pages/landing-page/landing-page.component";

export const HOME_PAGE_ROUTES: Routes = [{
    path: '',
    component: HomePageComponent,
    children: [
        {path: 'landing-page', component: LandingPageComponent },
    ]
}]

