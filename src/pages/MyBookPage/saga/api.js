import api from '@apis/api';
import apiConfig from '@apis/apiConfig';

export function fetchFavourite({ payload }) {
  const { username } = payload;
  return api.get({
    url: apiConfig.userDetails.replace('{username}', username),
  });
}

export function fetchMyReviews({ payload }) {
  const { username, pageNum, pageSize } = payload;

  return api
    .get({
      url: apiConfig.books.userReviews.replace('{username}', username),
      query: {
        'pg-num': pageNum,
        'pg-size': pageSize,
      },
    })
    .then(({ data }) => ({ data, pageNum }));
}
