import * as app_globals from '../../../../app.globals';

export const ENDPOINT_CONFIG = {
  requests: {
    get: {
      name: 'get',
      url: `${app_globals.APP_CONFIG_CONST.apiBaseUrl}/core/{0}/{1}/{2}/properties`,
    },
    postUserImage: {
      name: 'post',
      url: `${app_globals.APP_CONFIG_CONST.apiBaseUrl}/cms/{0}/{1}/{2}/user-cards/{3}/profile-image`,
    }
  },
};
