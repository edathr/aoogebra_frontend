// import React
import React from 'react';
import PropTypes from 'prop-types';

// import local styling
import './index.scss';

// import Antd
import { Tooltip } from 'antd';

const BookRatingBubble = ({ ratingValue, userRating }) => {
  return (
    <Tooltip title={userRating ? 'Average Rating' : 'User Rating'}>
      <div
        className={`book-rating-bubble__container ${
          userRating ? 'book-rating-bubble-user-rating' : ''
        }`}
      >
        {ratingValue > 0 ? ratingValue.toFixed(1) : 'NIL'}
      </div>
    </Tooltip>
  );
};

BookRatingBubble.propTypes = {
  ratingValue: PropTypes.number.isRequired,
  userRating: PropTypes.bool,
};

BookRatingBubble.defaultProps = {
  userRating: false,
};

export default BookRatingBubble;
