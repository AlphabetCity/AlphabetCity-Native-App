import React from 'react'
import { TouchableHighlight, Image, StyleSheet } from 'react-native'

const WordsButton = props => (
  <TouchableHighlight
    style={[
      styles.wordsButton,
      [
        (!props.nearestWords || !props.nearestWords.length) && {
          backgroundColor: '#747d8c'
        }
      ]
    ]}
    underlayColor={'#474787'}
    activeOpacity={0.9}
    onPress={() => {
      if (props.nearestWords && props.nearestWords.length) {
        props.navigation.navigate('AR', {
          nearestWords: props.nearestWords
        })
      }
    }}
  >
    <Image
      source={require('../../assets/icons/book-open.png')}
      fadeDuration={0}
      style={{ width: 32, height: 32 }}
    />
  </TouchableHighlight>
)

const styles = StyleSheet.create({
  wordsButton: {
    backgroundColor: '#706fd3',
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
    bottom: 24,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.4
  },
})

export default WordsButton
