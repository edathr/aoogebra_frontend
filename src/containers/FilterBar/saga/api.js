import api from '@apis/api';
import apiConfig from '@apis/apiConfig';
import isEmpty from 'lodash/isEmpty';

export function searchBooks({ payload }) {
  const { searchVal } = payload;
  if (isEmpty(searchVal)) {
    return {
      data: [],
    };
  }

  return api.get({
    url: apiConfig.books.autocomplete
      .replace('{prefix}', encodeURIComponent(searchVal))
      .replace('{limit}', 100),
  });
}

export function autocompleteBooks({ payload }) {
  const { autocompleteVal } = payload;
  if (isEmpty(autocompleteVal)) {
    return {
      data: [],
    };
  }
  return api.get({
    url: apiConfig.books.autocomplete
      .replace('{prefix}', encodeURIComponent(autocompleteVal))
      .replace('{limit}', 5),
  });
}
