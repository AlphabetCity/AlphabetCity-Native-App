'use strict'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, ListItem, FormLabel, FormInput, Button } from 'react-native-elements'
import { View, Text, StyleSheet} from 'react-native'
import { getSatchel, updateLetter } from '../store/satchel'
import { updateUser } from '../store/user'
import { createNewWord } from '../store/words'
import SortableGrid from 'react-native-sortable-grid'



// const dummyDictionary = new Set(['cat', git'dog', 'iguana', 'do', 'hi', 'dragon', 'at', 'had', 'zyl'])


class FormAWord extends Component {

  constructor(props) {
    super(props)
    // console.log(satchel)


    this.state = {
      word: '',
      satchelPlus: this.props.navigation.state.params.satchelPlus,
      newWord: null
    }

    this.handleWordSubmit = this.handleWordSubmit.bind(this)
  }

  // _canMakeWord(yourLettersArr, word) {
  //   let wordLetterArr = word.split(''),
  //     char,
  //     index
  //   while (wordLetterArr.length > 0) {
  //     char = wordLetterArr.shift()
  //     if ((index = yourLettersArr.indexOf(char)) > -1) {
  //       yourLettersArr.splice(index, 1)
  //     } else {
  //       return false
  //     }
  //   }
  //   return true
  // }

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

  // _isRealWord(word) {
  //   console.log(word, 'dictionary has word? ', dictionary.includes(word) )
  //   return dictionary.includes(word)
  // }

  handleWordSubmit() {
    let word = this.state.word.toLowerCase()
    // let yourLetters = this.props.satchel.map((yourLetter) => yourLetter.letterCategory.name.toLowerCase())


    let letterObjArr = this.props.satchel

      this.props.createNewWord({
        word: word,
        userId: this.props.user.id,
        latitude: this.props.userLocation.latitude,
        longitude: this.props.userLocation.longitude
      })
      .then(newWord => this.setState({newWord: newWord}))


    if (this.state.newWord)
    {
      let satchelObjsForUpdating = this._getSatchelObjsForUpdating(letterObjArr, word)

      let pointsToAdd = 0

      satchelObjsForUpdating.forEach((obj) => {
        pointsToAdd += obj.letterCategory.points
        this.props.updateLetter(obj.id, { latitude: this.props.userLocation.latitude, longitude: this.props.userLocation.longitude })
      })
      this.props.updateUser(this.props.user.id, { score: this.props.user.score + pointsToAdd })
      this.props.updateWord({ userId: this.props.user.id, latitude: this.props.userLocation.latitude, longitude: this.props.userLocation.longitude, word: this.state.newWord })
    }
  }

  render() {

    return (
      <View>
        {/* <FormLabel>Input a Word</FormLabel> */}
        {/* <FormInput onChangeText={text => this.setState({ word: text })} /> */}
        <List containerStyle={{ marginBottom: 20 }}>
          {this.state.satchelPlus.map((letterObj) => (
            <ListItem
              roundAvatar
              key={letterObj.id}
              title={`Choose ${letterObj.letterCategory.name}`}
              onPress={() => letterObj.inHand = true}
            />
          ))
          }
        </List>
        <SortableGrid
          dragActivationThreshold={400}
          itemsPerRow={7}
          onDragRelease={(itemOrder) => console.log(itemOrder)}>
          {
            this.state.satchelPlus.map((letterObj) => {
              if (letterObj.inHand === true) {
                console.log(letterObj)
                return (
                  <View
                    key={letterObj.id}
                    style={styles.block}
                  >
                    <Text>{letterObj.letterCategory.name}</Text>
                  </View>
                )
              }
            }
            )
          }
        </SortableGrid>
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
const mapDispatchToProps = ({ getSatchel, updateLetter, updateUser, createNewWord })

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormAWord)

const styles = StyleSheet.create({
  block: {
    flex: 1,
    margin: 8,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff69b4'
  }
})
