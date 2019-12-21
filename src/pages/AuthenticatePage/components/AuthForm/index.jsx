/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-this-in-sfc */
// import React
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// import lodash
import isEqual from 'lodash/isEqual';

// import local styling
import './index.scss';

// import Antd
import { Form, Input, Icon, Button, Divider } from 'antd';

const AuthForm = ({ form, type, loading, submitHandler }) => {
  const [confirmDirty, setConfirmDirty] = useState(false);

  const handleConfirmBlur = e => {
    const { value } = e.target;
    setConfirmDirty(confirmDirty || !!value);
  };

  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  const validateToNextPassword = (rule, value, callback) => {
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  const handleSubmit = event => {
    event.preventDefault();
    const { validateFields } = form;

    validateFields((error, values) => {
      if (!error) {
        submitHandler(values);
      }
    });
  };

  const onEnterKeyDownHandler = event => {
    if (isEqual(event.keyCode, 13)) {
      handleSubmit(event);
    }
  };

  const { getFieldDecorator } = form;
  const isSignup = isEqual(type, 'signup');

  return (
    <div className="auth-form__container" role="form" onKeyDown={onEnterKeyDownHandler}>
      <Form className="form__container" hideRequiredMark>
        <Form.Item label="NAME">
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: 'Please input your username!',
                whitespace: true,
              },
            ],
          })(<Input className="form-input" prefix={<Icon className="form-icon" type="user" />} />)}
        </Form.Item>

        {isSignup ? (
          <Form.Item label="YOUR E-MAIL">
            {getFieldDecorator('email', {
              rules: [{ required: true, type: 'email', message: 'Please input your email!' }],
            })(
              <Input
                className="form-input"
                prefix={<Icon className="form-icon" type="mail" theme="filled" />}
              />,
            )}
          </Form.Item>
        ) : null}

        <Form.Item label="PASSWORD">
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: 'Please input your password!' },
              {
                validator: validateToNextPassword,
              },
            ],
          })(
            <Input
              className="form-input password-input"
              prefix={<Icon className="form-icon" type="lock" theme="filled" />}
              type="password"
            />,
          )}
        </Form.Item>

        {isSignup ? (
          <Form.Item label="CONFIRM PASSWORD">
            {getFieldDecorator('confirm', {
              rules: [
                { required: true, message: 'Please confirm your password!' },
                {
                  validator: compareToFirstPassword,
                },
              ],
            })(
              <Input
                className="form-input password-input"
                prefix={<Icon className="form-icon" type="lock" theme="filled" />}
                type="password"
                onBlur={handleConfirmBlur}
              />,
            )}
          </Form.Item>
        ) : null}
      </Form>

      <Button
        className="form-submit-btn"
        block
        type="primary"
        shape="round"
        loading={loading}
        onClick={handleSubmit}
      >
        {isSignup ? 'SIGNUP' : 'SIGN IN'}
      </Button>
      {/* <Divider className="form-divider">OR</Divider>
      <div className="social-btn-group">
        <Button className="social-btn" type="primary" shape="circle">
          <Icon type="facebook" theme="filled" />
        </Button>
        <Button className="social-btn" type="primary" shape="circle" icon="google" />
        <Button className="social-btn" type="primary" shape="circle" icon="twitter" />
      </div> */}
    </div>
  );
};

AuthForm.propTypes = {
  type: PropTypes.oneOf(['signin', 'signup']).isRequired,
  loading: PropTypes.bool.isRequired,
  submitHandler: PropTypes.func.isRequired,
};

export default AuthForm;
