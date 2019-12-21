import api from '@apis/api';
import apiConfig from '@apis/apiConfig';

export function signInFromAPI({ payload }) {
  const { username, password } = payload;

  return api
    .post({
      url: apiConfig.auth.signIn,
      body: { username, password },
    })
    .then(response => {
      window.sessionStorage.setItem('user', JSON.stringify(response.data));
      return response;
    });
}

export function signUpFromAPI({ payload }) {
  const { username, password, email } = payload;

  return api
    .post({
      url: apiConfig.auth.signUp,
      body: { username, password, email },
    })
    .then(response => {
      window.sessionStorage.setItem('user', JSON.stringify(response.data));
      return response;
    });
}
