import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';

import getInjectors from './reducerInjector';
import StoreContext from './storeContext';

export default ({ key, reducer }) => WrappedComponent => {
  class ReducerInjector extends React.Component {
    injectors = getInjectors(this.context);

    static displayName = `withReducer(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      'Component'})`;

    componentWillMount() {
      const { injectReducer } = this.injectors;
      injectReducer(key, reducer);
    }

    static WrappedComponent = WrappedComponent;

    static contextType = StoreContext;

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return hoistNonReactStatics(ReducerInjector, WrappedComponent);
};
