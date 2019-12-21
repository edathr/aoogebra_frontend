// import React
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

// import actions
import { loadPrevPath } from '../../actions';

// import lodash
import map from 'lodash/map';
import toUpper from 'lodash/toUpper';
import nth from 'lodash/nth';

// import utils
import { goto } from '@utils/goto';

// import local styling
import './index.scss';

// import Antd
import { Typography, Icon, Menu, Popconfirm } from 'antd';

// Extract antd components
const { SubMenu } = Menu;
const { Text } = Typography;

const menuClickHandler = (key, keyPath) => {
  switch (nth(keyPath, -1)) {
    case 'home':
      return goto('/');

    case 'mybooks':
      return goto('/mybooks');

    case 'genre':
      return goto(`/browseresults/${key}`);

    default:
      return null;
  }
};

const HeaderMenu = ({ history, genres, username, logoutHandler, loadPrevPath }) => {
  const signInHandler = () => {
    if (!username) {
      const {
        location: { pathname },
      } = history;
      loadPrevPath(pathname);
      goto('/authenticate');
    }
  };

  const signOutHandler = () => {
    if (username) {
      logoutHandler();
    }
  };

  return (
    <header className="header-menu__container">
      <Menu
        className="menu__container"
        mode="horizontal"
        selectable={false}
        onClick={({ key, keyPath }) => {
          menuClickHandler(key, keyPath);
        }}
      >
        <Menu.Item key="home">HOME</Menu.Item>
        <Menu.Item key="mybooks">MY BOOKS</Menu.Item>
        <SubMenu
          key="genre"
          popupClassName="submenu__container"
          title={
            <>
              <span className="submenu-title__container">GENRE</span>
              <Icon type="caret-down" />
            </>
          }
        >
          <Menu.ItemGroup className="menu-item-group__genres-container">
            {map(genres, ({ genre }) => (
              <Menu.Item key={genre} title={genre}>
                {genre}
              </Menu.Item>
            ))}
          </Menu.ItemGroup>
        </SubMenu>
      </Menu>
      <Popconfirm title="Confirm Logout?" icon={<Icon type="logout" />} onConfirm={signOutHandler}>
        <div className="signin__container" onClick={signInHandler}>
          <Icon className="user-icon" type="user" />
          <Text className="signin-text" strong ellipsis>
            {toUpper(username) || 'SIGN IN'}
          </Text>
        </div>
      </Popconfirm>
    </header>
  );
};

HeaderMenu.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
  genres: PropTypes.arrayOf(PropTypes.object).isRequired,
  username: PropTypes.string.isRequired,
  logoutHandler: PropTypes.func.isRequired,
  loadPrevPath: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  loadPrevPath,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
)(HeaderMenu);
