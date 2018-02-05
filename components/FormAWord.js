'use strict'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, ListItem, ListView, FormLabel, FormInput, Button } from 'react-native-elements'
import { View, Text } from 'react-native'
import { getSatchel, updateLetter } from '../store/satchel'
import userLocation from '../store/userLocation';


const dummyDictionary = new Set(['CAT', 'DOG', 'IGUANA', 'DO', 'HI', 'DRAGON'])


class FormAWord extends Component {

  constructor(props) {
    super(props)

    this.state = {
      word: ''
    }

    this.handleWordSubmit = this.handleWordSubmit.bind(this)
  }

  _canMakeWord(yourLettersArr, word) {
    let wordLetterArr = word.split(''),
      char,
      index
    while (wordLetterArr.length > 0) {
      char = wordLetterArr.shift()
      if ((index = yourLettersArr.indexOf(char)) > -1) {
        yourLettersArr.splice(index, 1)
      } else {
        return false
      }
    }
    return true
  }


  handleWordSubmit() {
    let word = this.state.word.toLowerCase()
    let yourLetters = this.props.satchel.map((yourLetter) => yourLetter.letterCategory.name.toLowerCase())
    let realWord = dummyDictionary.has(this.state.word)
    console.log('real word?', realWord)
    console.log('in your letters? 222', this._canMakeWord(yourLetters, word))

    // if (realWord && this._canMakeWord(yourLetters, word)) {
    //   wordLetterArr.forEach((wordLetter) => {
    //     this.props.satchel.map((yourLetter) => {
    //       if (yourLetter.letterCategory.name.toLowerCase() === wordLetter) {
    //       this.props.updateLetter(yourLetter.id, { latitude: userLocation.latitude, longitude: userLocation.longitude })
    //       }
    //     })
    //   })
    // }
  }

  render() {
    return (
      <View>
        <FormLabel>Input a Word</FormLabel>
        <FormInput onChangeText={text => this.setState({ word: text })} />
        <Button
          small
          onPress={this.handleWordSubmit}
          title="Submit Word"
        />
      </View>
    )
  }
}


const mapStateToProps = ({ user, satchel, userLocation }) => ({ user, satchel, userLocation })
const mapDispatchToProps = ({ getSatchel, updateLetter })

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormAWord)
