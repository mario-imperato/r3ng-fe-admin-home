export const AppVersion: string | undefined = "latest";

export const environment = {
    // Esempio di property dipendente dall'environment.
    themesBaseUrl: './',
    //assetsBaseUrl: './public',
    // assetsBaseUrl: '/ui-admin/{0}/{1}/{2}/app-magazzino/public',
    assetsBaseUrl: './assets',
    // http://localhost:4200/ui-console/cvf/champ42/it/app-home/assets/console/icon-avatar.png
    apiBaseUrl: '/api',
    recaptchaKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
    appVersion: AppVersion,
    // used to handle redirects in the loading interceptors when cors gets in the way
    homeLocationPattern: '/ui-admin/{0}/{1}/{2}/{3}/{4}',
    rootLocation: '/ui-admin/r3ng-fe',
};
