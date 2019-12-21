let backendURL;

if (process && process.env) {
  backendURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
}

const config = {
  auth: {
    signIn: `${backendURL}/auth/login`,
    signUp: `${backendURL}/auth/register`,
    logout: `${backendURL}/auth/logout`,
  },
  books: {
    info: `${backendURL}/books/{asin}`,
    bookList: `${backendURL}/books`,
    recommendation: `${backendURL}/books/recommended`,
    autocomplete: `${backendURL}/books/search/autocomplete/{prefix}/{limit}`,
    search: `${backendURL}/books/search/{query}`,
    reviews: `${backendURL}/books/reviews/{asin}`,
    userReviews: `${backendURL}/books/reviews/user/{username}`,
    userReviewsByBook: `${backendURL}/books/reviews/user/{username}/{asin}`,
    genres: {
      genres: `${backendURL}/books/genres`,
      search: `${backendURL}/books/genres/{genre}`,
    },
    favourites: `${backendURL}/books/favourite/`,
  },
  userDetails: `${backendURL}/user/{username}`,
};

export default config;
