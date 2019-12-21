// import React
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// import local styling
import './index.scss';

// import Antd
import { Rate, Typography } from 'antd';

// Extract antd components
const { Text } = Typography;

const BookRatingStar = ({ ratingValue, updateRatingHandler }) => {
  const [hoverStar, setHoverStar] = useState(null);

  return (
    <div className="book-rating-star__container">
      <Rate
        className="rating-star"
        allowHalf
        disabled={!updateRatingHandler}
        value={ratingValue}
        onHoverChange={value => {
          if (updateRatingHandler) {
            setHoverStar(value);
          }
        }}
        onChange={value => updateRatingHandler(value)}
      />
      <Text className="rating-value-text" strong>
        {`${hoverStar || ratingValue >= 0 ? ratingValue : 'NIL'}`}
      </Text>
    </div>
  );
};

BookRatingStar.propTypes = {
  ratingValue: PropTypes.number.isRequired,
  updateRatingHandler: PropTypes.func,
};

BookRatingStar.defaultProps = {
  updateRatingHandler: null,
};

export default BookRatingStar;
