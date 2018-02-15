'use strict'
import React from 'react'
import { TouchableHighlight, View, Image, StyleSheet, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

const LetterButton = props => (
  <TouchableHighlight
    style={styles.arButton}
    underlayColor={'#474787'}
    activeOpacity={0.9}
    onPress={props.onPress}
  >
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: (width - 40) / 2
      }}
    >
      <Image
        source={require('../../assets/icons/eye.png')}
        fadeDuration={0}
        style={{ height: 32, width: 32 }}
      />
    </View>
  </TouchableHighlight>
)

const styles = StyleSheet.create({
  arButton: {
    backgroundColor: '#706FD3',
    height: 60,
    width: width - 40 - 80,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 20,
    bottom: 24,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.2
  },
})

export default LetterButton
