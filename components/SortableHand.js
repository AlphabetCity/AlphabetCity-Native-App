'use strict'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'
import SortableGrid from 'react-native-sortable-grid'
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet } from 'react-native'
import { getSatchel, updateLetter } from '../store/satchel'
import { updateUser } from '../store/user'
import { createNewWord, resetNewWord } from '../store/newWord'


class SortableHand extends Component {

  constructor(props) {
    super(props)

    this.state = {
      inHand: [],
      sortedLetters: []
    }

    this.handleWordSubmit = this.handleWordSubmit.bind(this)
  }

  handleWordSubmit() {
    let lettersForUpdating = this.state.sortedLetters.reduce((acc, letterID) => {
      return acc.concat(this.props.satchel.filter(letter => letterID === letter.id))
    }, [])

    let word = lettersForUpdating.map(letter => letter.letterCategory.name).join('').toLowerCase()

    let pointsToAdd = 0
    lettersForUpdating.forEach((obj) => {
      pointsToAdd += obj.letterCategory.points
    })

    this.props.createNewWord({
      word: word,
      userId: this.props.user.id,
      latitude: this.props.userLocation.latitude,
      longitude: this.props.userLocation.longitude,
      score: pointsToAdd
    })
      .then(() => {
        if (Object.keys(this.props.newWord).length) {
          lettersForUpdating.forEach((obj) => {
            pointsToAdd += obj.letterCategory.points
            this.props.updateLetter(obj.id, { latitude: this.props.userLocation.latitude, longitude: this.props.userLocation.longitude })
          })
          this.props.updateUser(this.props.user.id, { score: this.props.user.score + pointsToAdd })
        }
      })
      .then(() => {
        resetNewWord()
        this.props.getSatchel(this.props.user.id)
        this.props.navigation.goBack()
      })
  }

  render() {
    return (
      <View style={styles.sortableHand}>
        <View style={styles.letters}>
          {
            this.props.satchel.map(letter => (
              <TouchableHighlight
                key={letter.id}
                style={{ flexBasis: 30, flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
                onPress={() => {
                  if (this.state.inHand.includes(letter.id)) {
                    this.setState({
                      inHand: this.state.inHand.filter(id => id !== letter.id),
                      sortedLetters: this.state.inHand.filter(id => id !== letter.id)
                    })
                  } else {
                    this.setState({
                      inHand: this.state.inHand.concat(letter.id),
                      sortedLetters: this.state.inHand.concat(letter.id)
                    })
                      }

                }}>
                <View style={{ borderRadius: 8, borderColor: '#706FD3', flexDirection: 'row' }}>
                  <Text style={styles.letterTile}>{letter.letterCategory.name}</Text>
                  <Text style={styles.letterSub}>{letter.letterCategory.points}</Text>
                </View>
              </TouchableHighlight>
          ))}
        </View>
        <SortableGrid
          dragActivationTreshold={200}
          onDragRelease={(obj) => this.setState({ sortedLetters: obj.itemOrder.map(letter => parseInt(letter.key, 10)) } )}
        >
          {this.props.satchel.filter(letter => this.state.inHand.includes(letter.id)).map((letter) => (<View key={letter.id}>
            <Text style={styles.letterTile}>{letter.letterCategory.name}</Text>
          </View>))
          }
        </SortableGrid>
        <Button
          onPress={this.handleWordSubmit}
          title="Submit Word"
        />
      </View>
    )
  }
}


  const mapStateToProps = ({ user, satchel, userLocation, newWord }) => ({ user, satchel, userLocation, newWord })
  const mapDispatchToProps = ({getSatchel, updateLetter, updateUser, createNewWord })

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(SortableHand)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  textTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#3B3B98',
    textAlign: 'center'
  },
  sortableHand: {
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    shadowOffset: { width: 4, height: 4 },
    shadowColor: 'black',
    shadowOpacity: 0.1,
    flex: 1
  },
  letters: {
    flexDirection: 'row',
    flexGrow: 1
  },
  letterTile: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#706FD3',
    textAlign: 'center',
  },
  letterSub: {
    fontSize: 10,
    color: '#706FD3',
    alignSelf: 'flex-end',
  }
})

