declare const AppVersion: string;

export const environment = {
  themesBaseUrl: '/www/r3ng-fe-admin-home/' + AppVersion + '/assets',
  assetsBaseUrl: '/www/r3ng-fe-admin-home/' + AppVersion + '/assets',
  apiBaseUrl: '/api',
  recaptchaKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
  appVersion: AppVersion,
  // used to handle redirects in the loading interceptors when cors gets in the way
  homeLocationPattern: '/ui-admin/{0}/{1}/{2}/{3}/{4}',
  rootLocation: '/ui-admin/r3ng-fe',
};
