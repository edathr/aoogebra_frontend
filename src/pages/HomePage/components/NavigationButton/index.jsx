// import React
import React from 'react';
import PropTypes from 'prop-types';

// import local styling
import './index.scss';

// import Antd
import { Button } from 'antd';

const NavigationButton = ({ left, disabled, onClickHandler }) => {
  return (
    <div className="navigation-btn__container">
      <Button
        className="navigation-btn"
        type="primary"
        shape="circle"
        icon={left ? 'caret-left' : 'caret-right'}
        disabled={disabled}
        onClick={onClickHandler}
      />
    </div>
  );
};

NavigationButton.propTypes = {
  left: PropTypes.bool,
  disabled: PropTypes.bool,
  onClickHandler: PropTypes.func.isRequired,
};

NavigationButton.defaultProps = {
  left: true,
  disabled: false,
};

export default NavigationButton;
