// import React
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

// import reducer and saga
import reducer from './reducers';
import saga from './saga';
import injectReducer from '@utils/core/injectReducer';
import injectSaga from '@utils/core/injectSaga';

// import actions
import { searchBooks, autocompleteBooks } from './actions';

// import selector
import {
  selectError,
  selectLoading,
  selectAutocompleteResults,
  selectSelectedBook,
} from './selectors';

// import lodash
import debounce from 'lodash/debounce';
import map from 'lodash/map';
import isEqual from 'lodash/isEqual';

// import utils
import { goto } from '@utils/goto';

// import local styling
import './index.scss';

// import Antd
import { Icon, Button, Spin, AutoComplete } from 'antd';

// Extract antd components
const { Option } = AutoComplete;

const renderOptions = options =>
  map(options, option => (
    <Option className="search-result__option" key={option.asin} label={option.title}>
      <Icon className="search-result-icon" type="search" />
      {option.title}
    </Option>
  ));

class FilterBar extends PureComponent {
  constructor(props) {
    super(props);
    const { autocompleteBooks } = this.props;
    this.deboucedAutocompleteBooks = debounce(autocompleteBooks, 300);
  }

  render() {
    const {
      history: {
        location: { pathname },
      },
      position,
      loading,
      autocompleteResults,
      searchBooks,
      selectedBook,
    } = this.props;

    return (
      <div className={`filter-bar ${position}`}>
        <AutoComplete
          className="filter-autocomplete__container"
          showArrow={false}
          filterOption={false}
          defaultActiveFirstOption={false}
          optionLabelProp="label"
          defaultValue={selectedBook.searchVal}
          notFoundContent={loading.autocomplete ? <Spin className="filter-spining-icon" /> : null}
          placeholder={<Icon className="search-icon" type="search" />}
          dropdownClassName="filter-autocomplete-dropdown__container"
          dataSource={renderOptions(!loading.autocomplete ? autocompleteResults : [])}
          onSearch={this.deboucedAutocompleteBooks}
          onSelect={(_, option) => {
            searchBooks(option.key, option.props.label);
            if (!isEqual(pathname, '/browseresults')) {
              goto('/browseresults');
            }
          }}
        />
        <Button
          className="filter-button"
          type="primary"
          disabled={loading.autocomplete || loading.search}
          onClick={() => {
            searchBooks(selectedBook.bookId, selectedBook.searchVal);
            if (!isEqual(pathname, '/browseresults')) {
              goto('/browseresults');
            }
          }}
        >
          FILTER
        </Button>
      </div>
    );
  }
}

FilterBar.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
  position: PropTypes.oneOf(['left', 'center', 'right']),
  loading: PropTypes.shape({
    autocomplete: PropTypes.bool,
    search: PropTypes.bool,
  }).isRequired,
  autocompleteResults: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedBook: PropTypes.shape({
    bookId: PropTypes.string,
    selectedVal: PropTypes.string,
    searchVal: PropTypes.string,
  }).isRequired,

  searchBooks: PropTypes.func.isRequired,
  autocompleteBooks: PropTypes.func.isRequired,
};

FilterBar.defaultProps = {
  position: 'center',
};

const mapStateToProps = createStructuredSelector({
  error: selectError,
  loading: selectLoading,
  autocompleteResults: selectAutocompleteResults,
  selectedBook: selectSelectedBook,
});

const mapDispatchToProps = {
  searchBooks,
  autocompleteBooks,
};

const withReducer = injectReducer({ key: 'FilterBar', reducer });
const withSaga = injectSaga({ key: 'FilterBar', saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withRouter,
  withConnect,
)(FilterBar);
