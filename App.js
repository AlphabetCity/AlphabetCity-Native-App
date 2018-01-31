'use strict'
import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'

import ProfileNavigator from './Router'
import AppNavigator from './StackNav'
import { addNavigationHelpers } from 'react-navigation'

import store from './store'

@connect(state => ({ nav: state.nav }))
class AppWithNavigationState extends Component {
  render() {
    return (
      <ProfileNavigator>
        <AppNavigator
          navigation={addNavigationHelpers({
            dispatch: this.props.dispatch,
            state: this.props.nav
          })}
        >
        </AppNavigator>
      </ProfileNavigator>
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
