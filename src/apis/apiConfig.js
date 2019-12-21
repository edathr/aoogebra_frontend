import prodConfig from './api.prod';
import devConfig from './api.dev';
import localConfig from './api.local';

let apiConfig;

if (process && process.env) {
  switch (process.env.REACT_APP_API_ENV) {
    case 'production':
      apiConfig = prodConfig;
      break;

    case 'development':
      apiConfig = devConfig;
      break;

    case 'local':
      apiConfig = localConfig;
      break;

    default:
      apiConfig = localConfig;
      break;
  }
}

export default apiConfig;
