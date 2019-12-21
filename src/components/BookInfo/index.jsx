// import React
import React from 'react';
import PropTypes from 'prop-types';

// import local components
import ImageWrapper from '../ImageWrapper';

// import lodash
import isEmpty from 'lodash/isEmpty';

// import utils
import { goto } from '@utils/goto';

// import local styling
import './index.scss';

// import Antd
import { List, Typography, Skeleton, Empty } from 'antd';

// Extract antd components
const { Title, Paragraph } = Typography;

const getBookImage = (imgURL, rating) => (
  <div className="book-image__container">
    <ImageWrapper imgSrc={imgURL} imgAltText="" />
    <span className="book-rating">{rating}</span>
  </div>
);

const BookInfo = ({ books, pageSize, pageNum, loading, pagination, total, fetchPageHandler }) => {
  const paginationSettings = {
    position: 'both',
    hideOnSinglePage: true,
    pageSize,
  };

  if (pagination) {
    paginationSettings.current = pageNum;
    paginationSettings.total = total;
    paginationSettings.onChange = (pageNum, pageSize) => {
      fetchPageHandler(pageNum, pageSize);
    };
  }

  return (
    <div className="book-info__container">
      <Skeleton loading={isEmpty(books) && loading} active>
        <List
          className="book-info__list-container"
          itemLayout="vertical"
          split={false}
          dataSource={books}
          loading={loading}
          rowKey={data => data._id}
          pagination={paginationSettings}
          locale={{ emptyText: <Empty description="No book found" /> }}
          renderItem={book => (
            <List.Item key={book.id}>
              <List.Item.Meta
                avatar={getBookImage(
                  book.imUrl || '',
                  book.avg_rating > 0 ? book.avg_rating.toFixed(1) : 'NIL',
                )}
                title={
                  <span>
                    <Title
                      className="book-title"
                      level={4}
                      ellipsis={{ rows: 2 }}
                      onClick={() => goto(`/book/${book.asin}`)}
                    >
                      {book.title}
                    </Title>
                  </span>
                }
                description={
                  <Paragraph className="book-author" ellipsis={{ rows: 2 }}>
                    {`By ${book.author}`}
                  </Paragraph>
                }
              />
            </List.Item>
          )}
        />
      </Skeleton>
    </div>
  );
};

BookInfo.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      asin: PropTypes.string,
      title: PropTypes.string,
      imUrl: PropTypes.string,
      author: PropTypes.string,
      avg_rating: PropTypes.number,
    }),
  ).isRequired,
  pageSize: PropTypes.number,
  pageNum: PropTypes.number,
  loading: PropTypes.bool,
  pagination: PropTypes.bool,
  total: PropTypes.number,
  fetchPageHandler: PropTypes.func,
};

BookInfo.defaultProps = {
  pageSize: 8,
  pageNum: 1,
  loading: false,
  pagination: false,
  total: null,
  fetchPageHandler: () => {},
};

export default BookInfo;
