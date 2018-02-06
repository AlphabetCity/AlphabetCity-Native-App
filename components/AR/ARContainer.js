'use strict'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, PanResponder } from 'react-native'
import { AR, ARLoading } from './'
import cacheAssetsAsync from '../../utils/cacheAssetsAsync'
import arrayFromObject from '../../utils/arrayFromObject'

import '../../utils/THREE'

import Files from '../../Files'

// Code adapted from https://github.com/EvanBacon/expo-three-text
// by Evan EvanBacon
class ARContainer extends Component {
  constructor(){
    super()

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderRelease: this._handlePanResponderRelease.bind(this)
    })
  }

  _handlePanResponderRelease() {
    this.props.navigation.goBack()
  }

  state = { assetsLoaded: false, sceneLoaded: false }

  async componentDidMount() {
    this.loadAssetsAsync()
  }

  loadAssetsAsync = async () => {
    try {
      await cacheAssetsAsync({
        files: arrayFromObject(Files)
      })
    } catch (e) {
      console.warn(
        'There was an error caching assets (see: app.js), perhaps due to a ' +
          'network timeout, so we skipped caching. Reload the app to try again.'
      )
    } finally {
      this.setState({ assetsLoaded: true })
    }
  }

  renderLoading = () => <ARLoading />

  render() {
    const { assetsLoaded, sceneLoaded } = this.state
    if (!assetsLoaded) {
      return this.renderLoading()
    }
    return (
      <View
        style={styles.container}
        {...this.panResponder.panHandlers}
      >
        <AR
          nearestLetter={this.props.navigation.state.params.nearestLetter}
          onLoadingUpdated={xhr => {
            console.log(xhr.loaded / xhr.total * 100 + '% loaded')
          }}
          onFinishedLoading={() => this.setState({ sceneLoaded: true })}
        />
        {!sceneLoaded && this.renderLoading()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)'
  }
})

export default connect()(ARContainer)
