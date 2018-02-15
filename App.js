'use strict'
import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import { addNavigationHelpers } from 'react-navigation'
import AppNavigator from './StackNav'
import store from './store'
import { AppLoading, Asset } from 'expo'

@connect(state => ({ nav: state.nav }))
class AppWithNavigationState extends Component {

  constructor () {
    super()

    this.state = {
      isLoadingComplete: false,
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/icons/book-open.png'),
        require('./assets/icons/eye.png'),
        require('./assets/icons/packIcon.png'),
        require('./assets/icons/user.png'),
      ])
    ])
  }

  _handleLoadingError = error => {
    console.warn(error)
  }

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true })
  }

  render() {
    if (!this.state.isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      )
    } else {
      return (
        <AppNavigator
          navigation={addNavigationHelpers({
            dispatch: this.props.dispatch,
            state: this.props.nav,
          })}
        />
      )
    }
  }
}

export default function App() {
  return (
    <Provider store={store}>
      <AppWithNavigationState />
    </Provider>
  )
}
