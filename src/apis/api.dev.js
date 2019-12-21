const config = {
  auth: {
    signIn: 'http://localhost:5000/auth/login',
    signUp: 'http://localhost:5000/auth/register',
    logout: 'http://localhost:5000/auth/logout',
  },
  books: {
    info: 'http://localhost:5000/books/{asin}',
    bookList: 'http://localhost:5000/books',
    recommendation: 'http://localhost:5000/books/recommended',
    autocomplete: 'http://localhost:5000/books/search/autocomplete/{prefix}/{limit}',
    search: 'http://localhost:5000/books/search/{query}',
    reviews: 'http://localhost:5000/books/reviews/{asin}',
    userReviews: 'http://localhost:5000/books/reviews/user/{username}',
    userReviewsByBook: 'http://localhost:5000/books/reviews/user/{username}/{asin}',
    genres: {
      genres: 'http://localhost:5000/books/genres',
      search: 'http://localhost:5000/books/genres/{genre}',
    },
    favourites: 'http://localhost:5000/books/favourite/',
  },
  userDetails: 'http://localhost:5000/user/{username}',
};

export default config;
