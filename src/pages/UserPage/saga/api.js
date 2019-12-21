import api from '@apis/api';
import apiConfig from '@apis/apiConfig';

export function fetchUserDetails({ payload }) {
  const { username } = payload;
  return api.get({
    url: apiConfig.userDetails.replace('{username}', username),
  });
}
