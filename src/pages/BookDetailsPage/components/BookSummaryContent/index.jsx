// import React
import React from 'react';
import PropTypes from 'prop-types';

// import local styling
import './index.scss';

// import Antd
import { Typography, Empty, Skeleton } from 'antd';

// Extract antd components
const { Paragraph } = Typography;

const BookSummaryContent = ({ summary, loading }) => {
  return (
    <div className="book-summary__content-container">
      <Skeleton loading={loading} active>
        {summary ? <Paragraph className="book-summary-content">{summary}</Paragraph> : <Empty />}
      </Skeleton>
    </div>
  );
};

BookSummaryContent.propTypes = {
  summary: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

BookSummaryContent.defaultProps = {
  summary: '',
};

export default BookSummaryContent;
