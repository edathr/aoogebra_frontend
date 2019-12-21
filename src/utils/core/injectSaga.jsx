import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';

import getInjector from './sagaInjector';
import StoreContext from './storeContext';

export default ({ key, saga, mode }) => WrappedComponent => {
  class InjectSaga extends React.Component {
    injectors = getInjector(this.context);

    static displayName = `withSaga(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      'Component'})`;

    componentWillMount() {
      const { injectSaga } = this.injectors;

      injectSaga(key, { saga, mode }, this.props);
    }

    componentWillUnmount() {
      const { ejectSaga } = this.injectors;

      ejectSaga(key);
    }

    static WrappedComponent = WrappedComponent;

    static contextType = StoreContext;

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return hoistNonReactStatics(InjectSaga, WrappedComponent);
};
