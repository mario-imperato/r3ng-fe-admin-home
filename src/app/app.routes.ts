import { Routes } from '@angular/router';
import {NotFoundPageComponent} from "./features/system-pages/pages/not-found-page/not-found-page.component";
import {canActivate, canActivateNOTGuest} from "./api/core/user/guards/auth.guard";
import {LoginPageComponent} from "./features/authid/pages/login-page/login-page.component";


export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'admin/landing-page'
    },
    /*{
      path: 'home',
      component: HomePageComponent,
      canActivate: [() => canActivate({ public: false, redirectUrl: '/login' })],
    },*/
    {
        path: 'admin',
        loadChildren: () =>
            import('./features/home/home-page.routes')
                .then(m => m.HOME_PAGE_ROUTES),
        canActivate: [() => canActivate({ public: false, roles: ['admin','manager','user'], redirectUrl: '/login' })],
    },
    {
        path: 'login',
        component: LoginPageComponent,
    },
    {
        path: '**',
        component: NotFoundPageComponent,
    },
];
