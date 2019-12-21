import api from '@apis/api';
import apiConfig from '@apis/apiConfig';

export function fetchBookDetails({ payload }) {
  const { bookId } = payload;
  try {
    return api.get({
      url: apiConfig.books.info.replace('{asin}', bookId),
      needAuthenticate: true,
    });
  } catch {
    return api.get({
      url: apiConfig.books.info.replace('{asin}', bookId),
    });
  }
}

export function fetchBookReviews({ payload }) {
  const { bookId, pageNum, pageSize } = payload;

  return api
    .get({
      url: apiConfig.books.reviews.replace('{asin}', bookId),
      query: {
        'pg-num': pageNum,
        'pg-size': pageSize,
      },
    })
    .then(({ data }) => ({ data, pageNum }));
}

export function faveBook({ payload }) {
  const { bookId } = payload;
  return api.post({
    url: apiConfig.books.favourites,
    body: { book_asin: bookId },
    needAuthenticate: true,
  });
}

export function unfaveBook({ payload }) {
  const { bookId } = payload;
  return api.delete({
    url: apiConfig.books.favourites,
    body: { book_asin: bookId },
    needAuthenticate: true,
  });
}
