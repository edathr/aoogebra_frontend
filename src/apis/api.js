import axios from 'axios';
import queryString from 'querystring';
import { generateUUID } from '@utils/generateUUID';

const buildHeader = headers => {
  // Get session ID
  let clientId = window.sessionStorage.getItem('clientId');

  if (!clientId) {
    clientId = generateUUID();
    window.sessionStorage.setItem('clientId', clientId);
  }

  return {
    Accept: 'application/json, text/html',
    'Content-Type': 'application/json',
    'X-Client-ID': clientId,
    ...headers,
  };
};

const request = (props, method) => {
  const { url, needAuthenticate, headers, query, body } = props;

  const strQuery = queryString.stringify(query);
  const apiURL = `${url}${strQuery ? `?${strQuery}` : ''}`;

  const configureJWT = headers => {
    if (needAuthenticate) {
      const { access_token } = JSON.parse(window.sessionStorage.getItem('user'));
      return {
        ...headers,
        Authorization: `Bearer ${access_token}`,
      };
    }
    return headers;
  };

  const handleResponse = response => {
    return response.data;
  };

  const handleError = error => {
    return Promise.reject(error);
  };

  const axiosOptions = {
    url: apiURL,
    method,
    // withCredentials: needAuthenticate,
    headers: buildHeader(configureJWT(headers)),
    data: body,
  };

  return axios(axiosOptions)
    .then(response => handleResponse(response))
    .catch(error => handleError(error));
};

const API = {
  get: props => request(props, 'GET'),
  post: props => request(props, 'POST'),
  put: props => request(props, 'PUT'),
  patch: props => request(props, 'PATCH'),
  delete: props => request(props, 'DELETE'),
};

export default API;
