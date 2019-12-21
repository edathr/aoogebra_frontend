// import React
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

// import reducer and saga
import reducer from './reducers';
import saga from './saga';
import injectReducer from '@utils/core/injectReducer';
import injectSaga from '@utils/core/injectSaga';

// import actions
import { signInFromAPI, signUpFromAPI } from './actions';

// import selector
import { selectLoading, selectError } from './selectors';

// import local components
import AuthForm from './components/AuthForm';

// import lodash
import isEqual from 'lodash/isEqual';

// import local styling
import './index.scss';

// import Antd
import { Typography, Tabs, Form } from 'antd';

// Extract antd components
const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

class AuthenticatePage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      formType: 'signin',
    };
  }

  componentDidUpdate(prevProps) {
    const { error, form } = this.props;
    if (error && prevProps.loading) {
      form.resetFields();
    }
  }

  handleFormChange = key => {
    const { form } = this.props;
    this.setState({
      formType: key,
    });
    form.resetFields();
  };

  handleSubmit = values => {
    const { formType } = this.state;
    const { signInFromAPI, signUpFromAPI } = this.props;

    if (isEqual(formType, 'signup')) {
      signUpFromAPI(values.username, values.password, values.email);
    } else {
      signInFromAPI(values.username, values.password);
    }
  };

  render() {
    const { form, loading } = this.props;

    return (
      <div className="authenticate-page__main-container">
        <div className="authenticate-page__content">
          <div className="app-name__container">
            <Title className="app-name">Favebook</Title>
          </div>
          <div className="authenticate-page__form-container">
            <Tabs className="form-tab__container" onTabClick={this.handleFormChange}>
              <TabPane className="form-pane__container" tab="SIGN IN" key="signin">
                <AuthForm
                  form={form}
                  type="signin"
                  loading={loading}
                  submitHandler={this.handleSubmit}
                />
              </TabPane>
              <TabPane className="form-pane__container" tab="SIGN UP" key="signup">
                <AuthForm
                  form={form}
                  type="signup"
                  loading={loading}
                  submitHandler={this.handleSubmit}
                />
              </TabPane>
            </Tabs>
          </div>
          <div className="motivation-slogan__container">
            <Paragraph className="motivation-slogan">
              “A reader lives a thousand lives before he dies . . . The man who never reads lives
              only one.”
            </Paragraph>
            <Text className="author">– George R.R. Martin</Text>
          </div>
        </div>
      </div>
    );
  }
}

AuthenticatePage.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,

  signInFromAPI: PropTypes.func.isRequired,
  signUpFromAPI: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: selectLoading,
  error: selectError,
});

const mapDispatchToProps = {
  signInFromAPI,
  signUpFromAPI,
};

const withReducer = injectReducer({ key: 'AuthenticatePage', reducer });
const withSaga = injectSaga({ key: 'AuthenticatePage', saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const AuthenticatePageFromWrapper = Form.create()(AuthenticatePage);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AuthenticatePageFromWrapper);
