// import React
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

// import reducer and saga
import reducer from './reducers';
import saga from './saga';
import injectReducer from '@utils/core/injectReducer';
import injectSaga from '@utils/core/injectSaga';

// import actions
import { fetchUserReview, updateUserReview, submitUserReview } from './actions';

// import selector
import { selectLoading, selectReview } from './selectors';
import { selectUserInfo, selectLoggedIn } from '@pages/AppLayout/selectors';

// import local components
import BookRatingStar from '../../components/BookRatingStar';

// import lodash
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import trim from 'lodash/trim';

// import local styling
import './index.scss';

// import Antd
import { Input, Typography, Button, Icon, Modal } from 'antd';

// Extract antd components
const { Text, Title } = Typography;
const { TextArea } = Input;
const { confirm } = Modal;

const renderUserReviewPlaceholder = () => (
  <div className="user-review__placeholder-container">
    <div className="user-review-placeholder-icon__container">
      <Icon className="user-review-placeholder-icon" type="message" />
    </div>
    <Title className="user-review-placeholder-title" level={4}>
      Please login to leave a review.
    </Title>
  </div>
);

class UserReview extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userInput: '',
      userRating: 0,
      editing: false,
    };
  }

  componentDidMount() {
    const { loggedIn } = this.props;
    if (loggedIn) {
      this.fetchUserReviewHandler();
    }
  }

  componentDidUpdate(prevProps) {
    const { loading, loggedIn } = this.props;
    if (!isEqual(prevProps.loggedIn, loggedIn)) {
      this.fetchUserReviewHandler();
    }
    if (prevProps.loading && !loading) {
      this.resetStateHandler();
    }
  }

  resetStateHandler = () => {
    this.setState({
      userInput: '',
      userRating: 0,
      editing: false,
      dirty: false,
    });
  };

  fetchUserReviewHandler = () => {
    const { bookId, userInfo, fetchUserReview } = this.props;
    const { username } = userInfo;
    fetchUserReview(bookId, username);
  };

  reviewOnFocusHandler = () => {
    const { review } = this.props;
    const { userInput, userRating, editing } = this.state;
    const newState = {};

    if (!isEmpty(review)) {
      newState.userInput = userInput || review.review_text;
      newState.userRating = userRating || review.review_rating;
    }
    if (!editing) {
      newState.editing = true;
    }
    this.setState(newState);
  };

  updateUserRatingHandler = value => {
    this.setState({ userRating: value, dirty: true });
  };

  updateUserInputHandler = ({ target: { value } }) => {
    this.setState({ userInput: value, dirty: true });
  };

  submitUserReviewHandler = () => {
    const { bookId, review, updateUserReview, submitUserReview } = this.props;
    const { userInput, userRating, dirty } = this.state;

    if (!isEmpty(review)) {
      if (dirty) {
        confirm({
          title: 'Are you sure you want to update your previous review?',
          centered: true,
          autoFocusButton: null,
          onOk() {
            updateUserReview(bookId, userRating, userInput);
          },
        });
      }
    } else {
      submitUserReview(bookId, userRating, userInput);
    }
  };

  render() {
    const { loading, loggedIn } = this.props;
    const { userInput, userRating, editing } = this.state;

    return (
      <div className="user-review__container">
        {loggedIn ? (
          <>
            <div className="user-review-rating__container">
              <Text className="user-review-rating-header">My Review</Text>
              {editing ? (
                <BookRatingStar
                  ratingValue={userRating}
                  updateRatingHandler={this.updateUserRatingHandler}
                />
              ) : null}
            </div>
            <TextArea
              className="user-review__input-container"
              autoSize={{ minRows: 6, maxRows: 6 }}
              value={userInput}
              onChange={this.updateUserInputHandler}
              onFocus={this.reviewOnFocusHandler}
              onBlur={this.reviewOnBlurHandler}
            />
            <Button
              className="user-review__submit-btn"
              shape="round"
              loading={loading}
              disabled={!userRating || !trim(userInput)}
              onClick={this.submitUserReviewHandler}
            >
              RATE NOW
            </Button>
          </>
        ) : (
          renderUserReviewPlaceholder()
        )}
      </div>
    );
  }
}

UserReview.propTypes = {
  bookId: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  review: PropTypes.shape({
    review_rating: PropTypes.number,
    review_text: PropTypes.string,
  }).isRequired,

  userInfo: PropTypes.shape({
    username: PropTypes.string,
  }).isRequired,
  loggedIn: PropTypes.bool.isRequired,

  fetchUserReview: PropTypes.func.isRequired,
  updateUserReview: PropTypes.func.isRequired,
  submitUserReview: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: selectLoading,
  review: selectReview,

  userInfo: selectUserInfo,
  loggedIn: selectLoggedIn,
});

const mapDispatchToProps = {
  fetchUserReview,
  updateUserReview,
  submitUserReview,
};

const withReducer = injectReducer({ key: 'BookDetailsPage.UserReview', reducer });
const withSaga = injectSaga({ key: 'BookDetailsPage.UserReview', saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UserReview);
