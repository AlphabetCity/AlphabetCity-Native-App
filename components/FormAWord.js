'use strict'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, ListItem, ListView, FormLabel, FormInput, Button } from 'react-native-elements'
import { View, Text } from 'react-native'
import { getSatchel, updateLetter } from '../store/satchel'
import { updateUser } from '../store/user'
import { createNewWord } from '../store/newWord'


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

  // if realWord && canMakeWord, we want to update each of the letters that you are using from your satchel with a location and update your score based on the sum of those letters' point
  _getSatchelObjsForUpdating(letterObjArr, word) {
    let wordArr = word.split('')
    let usedLetters = []

    wordArr.forEach((character) => {
      usedLetters.push(letterObjArr.find((obj, idx) => {
        if (obj.letterCategory.name.toLowerCase() === character) {
          letterObjArr.splice(idx, 1)
          return obj
        }
      })
      )
    })
    return usedLetters
  }


  handleWordSubmit() {
    let word = this.state.word.toLowerCase()

    let letterObjArr = this.props.satchel

    this.props.createNewWord({
      word: word,
      userId: this.props.user.id,
      latitude: this.props.userLocation.latitude,
      longitude: this.props.userLocation.longitude
    })
      .then(() => {
        if (this.props.newWord) {
            let satchelObjsForUpdating = this._getSatchelObjsForUpdating(letterObjArr, this.props.newWord.word)

            let pointsToAdd = 0

            satchelObjsForUpdating.forEach((obj) => {
              pointsToAdd += obj.letterCategory.points
              this.props.updateLetter(obj.id, { latitude: this.props.userLocation.latitude, longitude: this.props.userLocation.longitude })
            })
            this.props.updateUser(this.props.user.id, { score: this.props.user.score + pointsToAdd })
        }
      })
      .then(() => {
        this.props.navigation.goBack()
    })

  }

  render() {
    return (
      <View>
        <Text>Your letters are: {this.props.satchel.map((letterObj) => letterObj.letterCategory.name + ' ')
        }</Text>
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


const mapStateToProps = ({ user, satchel, userLocation, newWord }) => ({ user, satchel, userLocation, newWord })
const mapDispatchToProps = ({ getSatchel, updateLetter, updateUser, createNewWord })

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormAWord)
