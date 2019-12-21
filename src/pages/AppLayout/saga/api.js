import api from '@apis/api';
import apiConfig from '@apis/apiConfig';

export function loginFromStorage() {
  const {
    sessionStorage: { user },
  } = window;

  if (user) {
    const userCredentials = JSON.parse(user);
    return userCredentials;
  }
  throw new Error('User credential not found!');
}

export function logout() {
  return api
    .post({
      url: apiConfig.auth.logout,
      needAuthenticate: true,
    })
    .then(response => {
      const { sessionStorage } = window;
      sessionStorage.removeItem('user');
    });
}

export function fetchGenres() {
  return api.get({
    url: apiConfig.books.genres.genres,
  });
}
