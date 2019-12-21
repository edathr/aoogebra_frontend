// import React
import React from 'react';
import PropTypes from 'prop-types';

// import lodash
import size from 'lodash/size';

// import local styling
import './index.scss';

// import Antd
import { Typography } from 'antd';

// Extract antd components
const { Text } = Typography;

const UserTextInfo = ({ userInfo }) => {
  const { username, avg_rating, books_reviewed, books_favourite } = userInfo;

  return (
    <div className="user-text-info__container">
      <div className="user-followers">
        <Text className="user-name" ellipsis>
          {username.toUpperCase()}
        </Text>
        <Text>has made</Text>
        <Text className="user-num-reviews">{size(books_reviewed)}</Text>
        <Text>reviews</Text>
      </div>
      <div className="user-review-rating">
        <Text>Average review rating of</Text>
        <Text className="user-input-review-rating">{avg_rating}</Text>
      </div>
      <div className="user-fave-books">
        <Text className="user-input-fave-books">{size(books_favourite)}</Text>
        <Text>favourite books</Text>
      </div>
    </div>
  );
};

UserTextInfo.propTypes = {
  userInfo: PropTypes.shape({
    username: PropTypes.string,
    num_reviews: PropTypes.number,
    avg_rating: PropTypes.number,
    num_fav: PropTypes.number,
    books_reviewed: PropTypes.arrayOf(PropTypes.object),
    books_favourite: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default UserTextInfo;
