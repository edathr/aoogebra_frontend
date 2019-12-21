import api from '@apis/api';
import apiConfig from '@apis/apiConfig';

export function fetchBooksGenre({ payload }) {
  const { genre, pageNum, pageSize } = payload;

  return api
    .get({
      url: apiConfig.books.genres.search.replace('{genre}', genre),
      query: {
        'pg-num': pageNum,
        'pg-size': pageSize,
      },
    })
    .then(({ data }) => ({ data, pageNum }));
}
