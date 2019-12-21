// import React
import React, { useRef } from 'react';
import PropTypes from 'prop-types';

// import local components
import NavigatioButton from '../NavigationButton';
import ImageWrapper from '@components/ImageWrapper';

// import lodash
import map from 'lodash/map';
import slice from 'lodash/slice';
import isEmpty from 'lodash/isEmpty';

// import utils
import { goto } from '@utils/goto';

// import local styling
import './index.scss';

// import Antd
import { Carousel, Typography, Empty } from 'antd';

// Extract antd components
const { Title } = Typography;

const renderBookList = (rows, books) => {
  const booksLength = books.length;
  const ROW_MAX_COUNT = 5;
  const numOfPage = Math.ceil(booksLength / (rows * ROW_MAX_COUNT));
  const bookList = [];
  let startIdx = 0;

  for (let i = 0; i < numOfPage; i++) {
    const bookRows = [];
    for (let j = 0; j < rows; j++) {
      bookRows.push(
        <div key={j} className="book-rows__container">
          {map(slice(books, startIdx, startIdx + ROW_MAX_COUNT), book => (
            <div key={book._id} className="book-card" onClick={() => goto(`/book/${book.asin}`)}>
              <ImageWrapper imgSrc={book.imUrl} imgAltText={book.title || 'Book'} />
            </div>
          ))}
        </div>,
      );
      startIdx += ROW_MAX_COUNT;
    }
    bookList.push(
      <div key={i} className="book-list__container">
        {bookRows}
      </div>,
    );
  }

  return bookList;
};

const BookCarousel = ({ title, rows, books }) => {
  const carouselEl = useRef(null);

  return (
    <div className="book-carousel__main-container">
      <Title className="book-carousel__header" level={3}>
        {title.toUpperCase()}
      </Title>
      <div className="book-carousel__container">
        <NavigatioButton
          disabled={isEmpty(books)}
          onClickHandler={() => {
            carouselEl.current.prev();
          }}
        />
        <div className="carousel__container">
          <Carousel
            className="book-display__content"
            ref={carouselEl}
            dots={false}
            autoplay
            autoplaySpeed={4000}
            easing="ease-in-out"
          >
            {!isEmpty(books) ? renderBookList(rows, books) : <Empty />}
          </Carousel>
        </div>
        <NavigatioButton
          left={false}
          disabled={isEmpty(books)}
          onClickHandler={() => carouselEl.current.next()}
        />
      </div>
    </div>
  );
};

BookCarousel.propTypes = {
  title: PropTypes.string.isRequired,
  rows: PropTypes.number,
  books: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      imUrl: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

BookCarousel.defaultProps = {
  rows: 1,
};

export default BookCarousel;
