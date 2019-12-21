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
import { fetchUserDetails } from './actions';

// import selector
import { selectUserDetails, selectLoading, selectError } from './selectors';

// import lodash

// import local components
import UserInfo from './components/UserInfo';
import TabMenuContainer from '@components/TabMenuContainer';
import BookInfo from '@components/BookInfo';
import BooksReviewedList from './components/BooksReviewedList';

// import local styling
import './index.scss';

// import Antd
import { Layout, Typography } from 'antd';

// Extract antd components
const { Content } = Layout;
const { Text } = Typography;

class UserPage extends PureComponent {
  componentDidMount() {
    const {
      fetchUserDetails,
      match: {
        params: { id: username },
      },
    } = this.props;
    fetchUserDetails({ username });
  }

  render() {
    const { userDetails, loading } = this.props;

    return (
      <Content className="user-page__container">
        {userDetails ? (
          <UserInfo loading={loading} userInfo={userDetails} />
        ) : (
          <Text> Username not found in database </Text>
        )}
        {userDetails ? (
          <TabMenuContainer
            menuObj={[
              {
                title: 'Favourite',
                reactNode: (
                  <BookInfo
                    books={userDetails.books_favourite || []}
                    loading={loading}
                    pageSize={5}
                  />
                ),
              },
              {
                title: 'Books Reviewed',
                reactNode: (
                  <BooksReviewedList
                    loading={loading}
                    books={userDetails.books_reviewed || []}
                    pageSize={5}
                  />
                ),
              },
            ]}
            autoFit
          />
        ) : null}
      </Content>
    );
  }
}

UserPage.propTypes = {
  userDetails: PropTypes.shape({
    username: PropTypes.string,
    num_reviews: PropTypes.number,
    avg_rating: PropTypes.number,
    num_fav: PropTypes.number,
    books_reviewed: PropTypes.arrayOf(PropTypes.object),
    books_favourite: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,

  fetchUserDetails: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userDetails: selectUserDetails,
  loading: selectLoading,
  error: selectError,
});

const mapDispatchToProps = {
  fetchUserDetails,
};

const withReducer = injectReducer({ key: 'UserPage', reducer });
const withSaga = injectSaga({ key: 'UserPage', saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UserPage);
