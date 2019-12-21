const ACTIONS = {
  LOGIN_FROM_STORAGE: '@pages/AppLayout/LOGIN_FROM_STORAGE',
  LOGIN_FROM_STORAGE_SUCCESS: '@pages/AppLayout/LOGIN_FROM_STORAGE_SUCCESS',
  LOGIN_FROM_STORAGE_FAILURE: '@pages/AppLayout/LOGIN_FROM_STORAGE_FAILURE',
  LOGOUT: '@pages/AppLayout/LOGOUT',
  LOGOUT_SUCCESS: '@pages/AppLayout/LOGOUT_SUCCESS',
  LOGOUT_FAILURE: '@pages/AppLayout/LOGOUT_FAILURE',
  FETCH_GENRES: '@pages/AppLayout/FETCH_GENRES',
  FETCH_GENRES_SUCCESS: '@pages/AppLayout/FETCH_GENRES_SUCCESS',
  FETCH_GENRES_FAILURE: '@pages/AppLayout/FETCH_GENRES_FAILURE',
  LOAD_PREV_PATH: '@pages/AppLayout/LOAD_PREV_PATH',
  CLEAR_PREV_PATH: '@pages/AppLayout/CLEAR_PREV_PATH',
};

export default ACTIONS;

export const loginFromStorage = () => ({
  type: ACTIONS.LOGIN_FROM_STORAGE,
});

export const logout = () => ({
  type: ACTIONS.LOGOUT,
});

export const fetchGenres = () => ({
  type: ACTIONS.FETCH_GENRES,
});

export const loadPrevPath = prevPath => ({
  type: ACTIONS.LOAD_PREV_PATH,
  payload: prevPath,
});

export const clearPrevPath = () => ({
  type: ACTIONS.CLEAR_PREV_PATH,
});
