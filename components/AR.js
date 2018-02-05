'use strict'
import React, { Component } from 'react'
import { PanResponder} from 'react-native'
import { connect } from 'react-redux'

import * as THREE from 'three' // Supported builtin module
import Expo from 'expo'
import ExpoTHREE from 'expo-three' // 2.2.2-alpha.0
console.disableYellowBox = true

class AR extends Component {

  componentWillMount () {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderRelease: this._handlePanResponderRelease.bind(this)
    })
  }

  // React Native Touch event responders
  _handlePanResponderRelease = () => {
    this.props.navigation.goBack()
  }

  // ARKit/Three.js functions
  _onGLContextCreate = async (gl) => {
    // Create AR Session
    const arSession = await this._glView.startARSessionAsync()

    // Overwrite Three.js camera with ARKit camera
    const camera = ExpoTHREE.createARCamera(
      arSession,
      gl.drawingBufferWidth,
      gl.drawingBufferHeight,
      0.01,
      1000
    )

    // Configure the renderer
    const renderer = ExpoTHREE.createRenderer({ gl })
    const { drawingBufferWidth: width, drawingBufferHeight: height} = gl
    renderer.setSize(width, height)

    // Create the scene and set its background to device camera's live video feed
    const scene = new THREE.Scene()
    scene.background = ExpoTHREE.createARBackgroundTexture(arSession, renderer)

    // Define frame animation behavior and begin animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
      gl.endFrameEXP()
    }
    animate()

  }

  render () {
    return (
      <Expo.GLView
        {...this._panResponder.panHandlers}
        ref={ref => this._glView = ref}
        style={styles.container}
        onContextCreate={this._onGLContextCreate}
      />
    )
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6c5ce7',
    textAlign: 'center'
  }
}

export default connect()(AR)
