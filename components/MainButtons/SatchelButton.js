'use strict'
import React from 'react'
import { TouchableHighlight, Image, StyleSheet } from 'react-native'

const SatchelButton = props => (
  <TouchableHighlight
    style={styles.satchelButton}
    underlayColor={'#474787'}
    activeOpacity={0.9}
    onPress={props.onPress}
  >
    <Image
      source={require('../../assets/icons/packIcon.png')}
      fadeDuration={0}
      style={{ width: 32, height: 32 }}
    />
  </TouchableHighlight>
)

const styles = StyleSheet.create({
  satchelButton: {
    backgroundColor: '#706FD3',
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
    top: 50,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.2
  },
})

export default SatchelButton
