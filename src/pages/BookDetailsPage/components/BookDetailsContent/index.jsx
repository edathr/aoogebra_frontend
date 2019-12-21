// import React
import React from 'react';
import PropTypes from 'prop-types';

// import lodash
import isEmpty from 'lodash/isEmpty';

// import local styling
import './index.scss';

// import Antd
import { Typography, Row, Empty, Skeleton } from 'antd';

// Extract antd components
const { Text } = Typography;

const BookDetailsContent = ({ bookDetails, loading }) => {
  const {
    ageRange,
    gradeLevel,
    hardCover,
    publisher,
    language,
    isbn10,
    isbn13,
    productDimensions,
  } = bookDetails;
  return (
    <div className="book-details__container">
      <Skeleton loading={loading} active>
        {isEmpty(bookDetails) ? (
          <Empty />
        ) : (
          <>
            <Row>
              <Text className="book-details__header">Age Range</Text>
              <Text className="book-details__content">{ageRange}</Text>
            </Row>
            <Row>
              <Text className="book-details__header">Grade Level</Text>
              <Text className="book-details__content">{gradeLevel}</Text>
            </Row>
            <Row>
              <Text className="book-details__header">Hardcover</Text>
              <Text className="book-details__content">{hardCover}</Text>
            </Row>
            <Row>
              <Text className="book-details__header">Publisher</Text>
              <Text className="book-details__content">{publisher}</Text>
            </Row>
            <Row>
              <Text className="book-details__header">Language</Text>
              <Text className="book-details__content">{language}</Text>
            </Row>
            <Row>
              <Text className="book-details__header">ISBN-10</Text>
              <Text className="book-details__content">{isbn10}</Text>
            </Row>
            <Row>
              <Text className="book-details__header">ISBN-13</Text>
              <Text className="book-details__content">{isbn13}</Text>
            </Row>
            <Row>
              <Text className="book-details__header">Product Dimension</Text>
              <Text className="book-details__content">{productDimensions}</Text>
            </Row>
          </>
        )}
      </Skeleton>
    </div>
  );
};

BookDetailsContent.propTypes = {
  bookDetails: PropTypes.shape({
    ageRange: PropTypes.string,
    gradeLevel: PropTypes.string,
    hardCover: PropTypes.string,
    publisher: PropTypes.string,
    language: PropTypes.string,
    isbn10: PropTypes.string,
    isbn13: PropTypes.string,
    productDimensions: PropTypes.string,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default BookDetailsContent;
