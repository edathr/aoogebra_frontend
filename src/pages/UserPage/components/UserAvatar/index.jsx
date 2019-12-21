// import React
import React from 'react';
import PropTypes from 'prop-types';

// import local styling
import './index.scss';

// import Antd
import { Avatar, Typography, Skeleton } from 'antd';

// Extract antd components
const { Title } = Typography;

const UserAvatar = ({ loading, username }) => {
  return (
    <div className="user-avatar__container">
      <Skeleton loading={loading} active avatar={{ size: 200 }} title={false} paragraph={false}>
        <span className="avatar-circle">
          <Avatar className="user-icon" icon="user" size={128} />
        </span>
        {!loading && username ? (
          <div className="user-membership-details__container">
            <Title className="username" level={3} ellipsis>
              {username.toUpperCase()}
            </Title>
          </div>
        ) : null}
      </Skeleton>
    </div>
  );
};

UserAvatar.propTypes = {
  loading: PropTypes.bool.isRequired,
  username: PropTypes.string,
};

UserAvatar.defaultProps = {
  username: '',
};

export default UserAvatar;
