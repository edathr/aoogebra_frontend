// import React
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Moment from 'moment';
import he from 'he';

// import selector
import { selectUserInfo, selectLoggedIn } from '@pages/AppLayout/selectors';

// import local components
import ImageWrapper from '../ImageWrapper';

// import lodash
import isEqual from 'lodash/isEqual';

// import utils
import { goto } from '@utils/goto';

// import local styling
import './index.scss';

// import Antd
import { Typography, Divider, Rate } from 'antd';

// Extract antd components
const { Text, Paragraph } = Typography;

const BookReview = ({ bookReview, showBookImg, showAuthor, showTimestamp, userInfo, loggedIn }) => {
  const { asin, title, imUrl, review_text, review_rating, username, unix_timestamp } = bookReview;
  const disabledUserPage = !loggedIn || isEqual(username, userInfo.username);

  return (
    <div className="book-review__container">
      {showBookImg ? (
        <div className="book-review__image-container" onClick={() => goto(`/book/${asin}`)}>
          <ImageWrapper imgSrc={imUrl || ''} imgAltText={title || ''} />
        </div>
      ) : null}
      <div className="book-review-content__container">
        <Paragraph
          className="book-review"
          ellipsis={{
            rows: 2,
            expandable: true,
          }}
        >
          {he.decode(review_text)}
        </Paragraph>
        <div className="book-review-details__container">
          {showAuthor ? (
            <>
              <Text>By </Text>
              <Text
                className={`author-name ${disabledUserPage ? 'author-name-disabled' : ''}`}
                strong
                onClick={disabledUserPage ? null : () => goto(`/user/${username}`)}
              >
                {username}
              </Text>
            </>
          ) : null}
          {showAuthor && showTimestamp ? (
            <Divider className="book-review-details-divider" type="vertical" />
          ) : null}
          {showTimestamp ? (
            <Text className="review-timestamp" strong>
              {Moment(unix_timestamp).format('DD MMM YYYY')}
            </Text>
          ) : null}
          <span className="book-review-details-rating__container">
            <Rate
              className="book-review-details-rating-star"
              allowHalf
              value={review_rating}
              disabled
            />
            <Text className="book-review-detials-rating-value" strong>
              {review_rating.toFixed(1)}
            </Text>
          </span>
        </div>
      </div>
    </div>
  );
};

BookReview.propTypes = {
  bookReview: PropTypes.shape({
    asin: PropTypes.string,
    title: PropTypes.string,
    imUrl: PropTypes.string,
    review_text: PropTypes.string,
    review_rating: PropTypes.number,
    username: PropTypes.string,
    unix_timestamp: PropTypes.number,
  }).isRequired,
  showBookImg: PropTypes.bool,
  showAuthor: PropTypes.bool,
  showTimestamp: PropTypes.bool,

  userInfo: PropTypes.shape({
    username: PropTypes.string,
    access_token: PropTypes.string,
  }).isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

BookReview.defaultProps = {
  showBookImg: true,
  showAuthor: true,
  showTimestamp: true,
};

const mapStateToProps = createStructuredSelector({
  userInfo: selectUserInfo,
  loggedIn: selectLoggedIn,
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default withConnect(BookReview);
