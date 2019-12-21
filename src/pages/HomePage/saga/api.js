import api from '@apis/api';
import apiConfig from '@apis/apiConfig';
import uuid from 'uuid/v4';

export function fetchRecommendBookList({ payload }) {
  const { username } = payload;

  return api.get({
    url: `${apiConfig.books.recommendation}/${username || uuid()}`,
  });
}

export function fetchBestsellBookList() {
  return api.get({
    url: apiConfig.books.bookList,
  });
}
