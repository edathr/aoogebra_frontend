// import React
import React from 'react';
import PropTypes from 'prop-types';

// import local components
import BookRatingStar from '../BookRatingStar';

// import lodash
import map from 'lodash/map';

// import local styling
import './index.scss';

// import Antd
import { Typography, Icon, Tag, Skeleton } from 'antd';

// Extract antd components
const { Title, Text } = Typography;

const BookDescriptions = ({ loading, title, author, ratingValue, reviewCount, genres }) => {
  return (
    <div className="book-descriptions__main-container">
      <Skeleton loading={loading} active>
        <div className="book-description__basic-details">
          <Title className="book-descriptions__title" level={3}>
            {title}
          </Title>
          <Text className="book-descriptions__author" ellipsis>
            {`By ${author}`}
          </Text>
        </div>
        <div className="book-rating__container">
          <BookRatingStar ratingValue={ratingValue} />
          <Text className="review-count" strong>
            <Icon className="review-icon" type="message" />
            {`${reviewCount}`}
          </Text>
        </div>
        <div className="book-genre-tags__container">
          {map(genres, genre => (
            <Tag key={genre} className="book-genre-tag">
              {genre}
            </Tag>
          ))}
        </div>
      </Skeleton>
    </div>
  );
};

BookDescriptions.propTypes = {
  loading: PropTypes.bool.isRequired,
  title: PropTypes.string,
  author: PropTypes.string,
  ratingValue: PropTypes.number,
  reviewCount: PropTypes.number.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

BookDescriptions.defaultProps = {
  title: '',
  author: '',
  ratingValue: 0,
};

export default BookDescriptions;
