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
import { fetchRecommendBookList, fetchBestsellBookList } from './actions';

// import selector
import { selectLoading, selectError, selectRecommendBooks, selectBestsellBooks } from './selectors';
import { selectUserInfo } from '@pages/AppLayout/selectors';

// import local components
import FilterBar from '@containers/FilterBar';
import BookCarousel from './components/BookCarousel';

// import lodash
import isEmpty from 'lodash/isEmpty';
import toUpper from 'lodash/toUpper';
import isEqual from 'lodash/isEqual';

// import local styling
import './index.scss';

// import Antd
import { Layout, Typography, Icon } from 'antd';

// Extract antd components
const { Content } = Layout;
const { Title } = Typography;

class HomePage extends PureComponent {
  componentDidMount() {
    const { fetchRecommendBookList, fetchBestsellBookList } = this.props;
    fetchRecommendBookList();
    fetchBestsellBookList();
  }

  componentDidUpdate(prevProps) {
    const {
      userInfo: { username: oldUsername },
    } = prevProps;

    const {
      userInfo: { username: newUsername },
      fetchRecommendBookList,
    } = this.props;

    if (!isEqual(oldUsername, newUsername)) {
      fetchRecommendBookList(newUsername);
    }
  }

  render() {
    const { loading, recommendBooks, bestsellBooks, userInfo } = this.props;
    return (
      <Content className="home-page__container">
        <Title className="home-page-greeting__header" level={1} ellipsis>
          {`Good Morning, ${isEmpty(userInfo) ? 'Friend' : toUpper(userInfo.username)}`}
        </Title>
        <FilterBar position="center" />
        {!loading.recommend && !loading.bestsell ? (
          <>
            <BookCarousel title="random picks" rows={1} books={recommendBooks} />
            <BookCarousel title="top rated" rows={1} books={bestsellBooks} />
          </>
        ) : (
          <div className="home-page-loading__container">
            <Icon className="loading-icon" type="loading" spin />
          </div>
        )}
      </Content>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.shape({
    recommend: PropTypes.bool,
    bestsell: PropTypes.bool,
  }).isRequired,
  error: PropTypes.shape({
    recommend: PropTypes.string,
    bestsell: PropTypes.string,
  }).isRequired,
  recommendBooks: PropTypes.arrayOf(PropTypes.object).isRequired,
  bestsellBooks: PropTypes.arrayOf(PropTypes.object).isRequired,
  userInfo: PropTypes.shape({
    username: PropTypes.string,
  }).isRequired,

  fetchRecommendBookList: PropTypes.func.isRequired,
  fetchBestsellBookList: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: selectLoading,
  error: selectError,
  recommendBooks: selectRecommendBooks,
  bestsellBooks: selectBestsellBooks,

  userInfo: selectUserInfo,
});

const mapDispatchToProps = {
  fetchRecommendBookList,
  fetchBestsellBookList,
};

const withReducer = injectReducer({ key: 'HomePage', reducer });
const withSaga = injectSaga({ key: 'HomePage', saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
