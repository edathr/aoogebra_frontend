// import React
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// import local components
import BookReview from '../BookReview';

// import lodash
import isEmpty from 'lodash/isEmpty';

// import local styling
import './index.scss';

// import Antd
import { List, Empty, Skeleton } from 'antd';

const BookReviewsList = ({
  bookReviews,
  loading,
  showBookImg,
  showAuthor,
  showTimestamp,
  pageSize,
  total,
  fetchPageHandler,
}) => {
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const currentBookReviews = bookReviews[currentPageNum];

  return (
    <div className="book-reviews-list__container">
      <Skeleton loading={loading && isEmpty(currentBookReviews)} active>
        {isEmpty(bookReviews) ? (
          <Empty />
        ) : (
          <List
            dataSource={currentBookReviews || []}
            rowKey={data => data.id}
            loading={loading && isEmpty(currentBookReviews)}
            pagination={{
              current: currentPageNum,
              position: 'both',
              hideOnSinglePage: true,
              total,
              pageSize,
              onChange: (pageNum, pageSize) => {
                setCurrentPageNum(pageNum);
                fetchPageHandler(pageNum, pageSize);
              },
            }}
            renderItem={bookReview => (
              <List.Item>
                <BookReview
                  bookReview={bookReview}
                  showBookImg={showBookImg}
                  showAuthor={showAuthor}
                  showTimestamp={showTimestamp}
                />
              </List.Item>
            )}
          />
        )}
      </Skeleton>
    </div>
  );
};

BookReviewsList.propTypes = {
  bookReviews: PropTypes.shape({}).isRequired,
  loading: PropTypes.bool.isRequired,
  showBookImg: PropTypes.bool,
  showAuthor: PropTypes.bool,
  showTimestamp: PropTypes.bool,
  pageSize: PropTypes.number,
  total: PropTypes.number.isRequired,
  fetchPageHandler: PropTypes.func.isRequired,
};

BookReviewsList.defaultProps = {
  showBookImg: true,
  showAuthor: true,
  showTimestamp: true,
  pageSize: 8,
};

export default BookReviewsList;
