// import React
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ProgressiveImage from 'react-progressive-image';

// import local styling
import './index.scss';

const ImageWrapper = ({ imgSrc, imgAltText }) => {
  const [hide, setHide] = useState(true);

  return (
    <ProgressiveImage src={imgSrc}>
      {(src, downloadingImg) => (
        <div className="progressive-image-wrapper">
          <div className={`progressive-image-placeholder ${hide ? 'hide' : ''}`}>
            {downloadingImg ? (
              setHide(downloadingImg)
            ) : (
              <img
                className={`progressive-image ${downloadingImg ? 'loading' : ''}`}
                src={src}
                alt={imgAltText}
                onLoad={() => setHide(false)}
              />
            )}
          </div>
        </div>
      )}
    </ProgressiveImage>
  );
};

ImageWrapper.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  imgAltText: PropTypes.string.isRequired,
};

export default ImageWrapper;
