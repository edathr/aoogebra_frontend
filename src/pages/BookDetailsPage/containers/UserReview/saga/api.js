import api from '@apis/api';
import apiConfig from '@apis/apiConfig';

export function fetchUserReview({ payload }) {
  const { username, bookId } = payload;

  return api.get({
    url: apiConfig.books.userReviewsByBook
      .replace('{username}', username)
      .replace('{asin}', bookId),
  });
}

export function updateUserReview({ payload }) {
  const { bookId, rating, review } = payload;

  return api.patch({
    url: apiConfig.books.reviews.replace('{asin}', bookId),
    body: {
      review_rating: rating,
      review_text: review,
    },
    needAuthenticate: true,
  });
}

export function submitUserReview({ payload }) {
  const { bookId, rating, review } = payload;

  return api.post({
    url: apiConfig.books.reviews.replace('{asin}', bookId),
    body: {
      review_rating: rating,
      review_text: review,
    },
    needAuthenticate: true,
  });
}
