// import React
import React from 'react';
import PropTypes from 'prop-types';

// import local components
import ImageWrapper from '@components/ImageWrapper';

// import local styling
import './index.scss';

// import Antd
import { Button, Typography, Icon } from 'antd';

// Extract antd components
const { Text } = Typography;

const BookCover = ({
  loading,
  bookCoverURL,
  bookTitle,
  wantToReadCount,
  faveBookHandler,
  userFave,
  bookId,
  isLoggedIn,
}) => {
  return (
    <div className="book-cover__container">
      <div className="backdrop-pattern" />
      <div className="book-cover-img__container">
        <ImageWrapper imgSrc={bookCoverURL} imgAltText={bookTitle} />
      </div>
      <div className="interest-status__container">
        {isLoggedIn ? (
          <Button
            className="faveit-btn"
            shape="round"
            disabled={loading}
            loading={loading}
            onClick={() => faveBookHandler(!userFave, bookId)}
          >
            {loading ? null : (
              <Icon className="faveit-icon" type="heart" theme={userFave ? 'filled' : 'outlined'} />
            )}
            FAVE IT!
          </Button>
        ) : (
          <div className="faveit-loginmessage">
            <Text>Please log in to fave this book!</Text>
          </div>
        )}
        <div className="interest-status__statistic-container">
          <Text className="people-count">{wantToReadCount || 0}</Text>
          <Text>people faved this book</Text>
        </div>
      </div>
    </div>
  );
};

BookCover.propTypes = {
  loading: PropTypes.bool.isRequired,
  bookCoverURL: PropTypes.string,
  bookTitle: PropTypes.string,
  wantToReadCount: PropTypes.number,
  faveBookHandler: PropTypes.func.isRequired,
  bookId: PropTypes.string.isRequired,
  userFave: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
};

BookCover.defaultProps = {
  bookCoverURL: '',
  bookTitle: '',
  wantToReadCount: 0,
  userFave: false,
  isLoggedIn: false,
};

export default BookCover;
