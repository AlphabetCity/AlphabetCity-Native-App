'use strict'
import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'

import AppNavigator from './Router'
import { addNavigationHelpers } from 'react-navigation'

import store from './store'

@connect(state => ({ nav: state.nav }))
class AppWithNavigationState extends Component {
  render() {
      return (
          <AppNavigator
              navigation={addNavigationHelpers({
                  dispatch: this.props.dispatch,
                  state: this.props.nav
              })}
          />
      );
  }
}

export default function App() {
  return (
      <Provider store={store}>
          <AppWithNavigationState />
      </Provider>
  );
}
