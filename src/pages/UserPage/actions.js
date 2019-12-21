const ACTIONS = {
  FETCH_USER_DETAILS: '@pages/UserPage/FETCH_USER_DETAILS',
  FETCH_USER_DETAILS_SUCCESS: '@pages/UserPage/FETCH_USER_DETAILS_SUCCESS',
  FETCH_USER_DETAILS_FAILURE: '@pages/UserPage/FETCH_USER_DETAILS_FAILURE',
};

export default ACTIONS;

export const fetchUserDetails = userId => ({
  type: ACTIONS.FETCH_USER_DETAILS,
  payload: userId,
});
