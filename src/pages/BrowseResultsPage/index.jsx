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
import { fetchBooksGenre } from './actions';

// import selector

import { selectSearchResults, selectLoading } from '@containers/FilterBar/selectors';
import {
  selectBooks,
  selectTotalCount,
  selectPageSize,
  selectPageNum,
  selectLoading as selectBrowseLoading,
  selectError,
} from './selectors';

// import lodash
import isEqual from 'lodash/isEqual';

// import local components
import BookInfo from '@components/BookInfo';
import FilterBar from '@containers/FilterBar';

// import local styling
import './index.scss';

// import Antd
import { Layout } from 'antd';

// Extract antd components
const { Content } = Layout;

class BrowseResultsPage extends PureComponent {
  componentDidMount() {
    const {
      match: {
        params: { genre },
      },
      pageSize,
    } = this.props;
    if (genre) {
      this.fetchBookGenreHandler(1, pageSize);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      match: {
        params: { genre: pastGenre },
      },
    } = prevProps;
    const {
      match: {
        params: { genre },
      },
      pageSize,
    } = this.props;

    if (!isEqual(pastGenre, genre)) {
      this.fetchBookGenreHandler(1, pageSize);
    }
  }

  fetchBookGenreHandler = (pageNum, pageSize) => {
    const {
      match: {
        params: { genre },
      },
      fetchBooksGenre,
    } = this.props;

    fetchBooksGenre(genre, pageNum, pageSize);
  };

  render() {
    const {
      match: {
        params: { genre },
      },
      books,
      totalCount,
      pageSize,
      pageNum,
      browseLoading,
      filterLoading,
      searchResults,
    } = this.props;

    return (
      <Content className="results-page__main-container">
        <FilterBar position="center" />
        <div className="results-page__content">
          <BookInfo
            books={genre ? books[pageNum] || [] : searchResults}
            pageSize={pageSize}
            pageNum={pageNum}
            loading={browseLoading || filterLoading.search}
            pagination={!!genre}
            total={totalCount}
            fetchPageHandler={genre ? this.fetchBookGenreHandler : null}
          />
        </div>
      </Content>
    );
  }
}

BrowseResultsPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      genre: PropTypes.string,
    }),
  }).isRequired,
  books: PropTypes.shape({}).isRequired,
  totalCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  pageNum: PropTypes.number.isRequired,
  browseLoading: PropTypes.bool.isRequired,
  filterLoading: PropTypes.shape({
    autocomplete: PropTypes.bool,
    search: PropTypes.bool,
  }).isRequired,
  searchResults: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

  fetchBooksGenre: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  books: selectBooks,
  totalCount: selectTotalCount,
  pageSize: selectPageSize,
  pageNum: selectPageNum,
  browseLoading: selectBrowseLoading,
  error: selectError,
  filterLoading: selectLoading,
  searchResults: selectSearchResults,
});

const mapDispatchToProps = {
  fetchBooksGenre,
};

const withReducer = injectReducer({ key: 'BrowseResultsPage', reducer });
const withSaga = injectSaga({ key: 'BrowseResultsPage', saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(BrowseResultsPage);
