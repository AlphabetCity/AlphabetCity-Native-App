import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

// AR letter code adapted from https://github.com/EvanBacon/expo-three-text
// by Evan Bacon
const ARLoading = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Your new letter is...</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#706fd3'
  },
  text: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 20
  }
})

export default ARLoading
