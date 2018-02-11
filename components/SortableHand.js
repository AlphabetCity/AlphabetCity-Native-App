'use strict'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import SortableGrid from 'react-native-sortable-grid'
import { View, Text, TouchableHighlight, StyleSheet, Dimensions } from 'react-native'
import { getSatchel, updateLetter } from '../store/satchel'
import { updateUser } from '../store/user'
import { createNewWord, resetNewWord } from '../store/newWord'

const { height, width } = Dimensions.get('window')

class SortableHand extends Component {
  constructor(props) {
    super(props)

    this.state = {
      inHand: [],
      points: 0,
      sortedLetters: []
    }

    this.handleWordSubmit = this.handleWordSubmit.bind(this)
  }

  handleWordSubmit() {
    let lettersForUpdating = this.state.sortedLetters.reduce(
      (acc, letterID) => {
        return acc.concat(
          this.props.satchel.filter(letter => letterID === letter.id)
        )
      },
      []
    )

    let word = lettersForUpdating
      .map(letter => letter.letterCategory.name)
      .join('')
      .toLowerCase()

    let pointsToAdd = 0
    lettersForUpdating.forEach(obj => {
      pointsToAdd += obj.letterCategory.points
    })

    this.props
      .createNewWord({
        word: word,
        userId: this.props.user.id,
        latitude: this.props.userLocation.latitude,
        longitude: this.props.userLocation.longitude,
        score: pointsToAdd
      })
      .then(() => {
        if (Object.keys(this.props.newWord).length) {
          lettersForUpdating.forEach(obj => {
            pointsToAdd += obj.letterCategory.points
            this.props.updateLetter(obj.id, {
              latitude: this.props.userLocation.latitude,
              longitude: this.props.userLocation.longitude
            })
          })
          this.props.updateUser(this.props.user.id, {
            score: this.props.user.score + pointsToAdd
          })
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
      <View style={styles.container}>
        <View style={styles.instructionBlock}>
          <Text style={styles.textTitle}>Available Letters</Text>
          <Text style={styles.textSub}>
            Select letters to place them into your current hand
          </Text>
        </View>
        <View style={styles.letters}>
          {this.props.satchel.map(letter => (
            <TouchableHighlight
              key={letter.id}
              underlayColor={'#f9f5ec'}
              style={{
                flexBasis: 80,
                flexGrow: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}
              onPress={() => {
                if (this.state.inHand.includes(letter.id)) {
                  this.setState({
                    inHand: this.state.inHand.filter(id => id !== letter.id),
                    points: this.state.points - letter.letterCategory.points,
                    sortedLetters: this.state.inHand.filter(
                      id => id !== letter.id
                    )
                  })
                } else {
                  this.setState({
                    inHand: this.state.inHand.concat(letter.id),
                    points: this.state.points + letter.letterCategory.points,
                    sortedLetters: this.state.inHand.concat(letter.id)
                  })
                }
              }}
            >
              <View
                style={[
                  styles.letterTile,
                  this.state.inHand.includes(letter.id)
                    ? { backgroundColor: '#dfe4ea', borderColor: '#747d8c' }
                    : {}
                ]}
              >
                <Text
                  style={[
                    styles.letterName,
                    this.state.inHand.includes(letter.id)
                      ? { color: '#747d8c' }
                      : {}
                  ]}
                >
                  {letter.letterCategory.name}
                </Text>
                <Text
                  style={[
                    styles.letterSub,
                    this.state.inHand.includes(letter.id)
                      ? { color: '#747d8c' }
                      : {}
                  ]}
                >
                  {letter.letterCategory.points}
                </Text>
              </View>
            </TouchableHighlight>
          ))}
        </View>
        <View style={styles.hr} />
        <View style={styles.instructionBlock}>
          <Text style={styles.textTitle}>Selected Letters</Text>
          <Text style={styles.textSub}>
            Drag tiles to rearrange your selected letters and form a valid word
          </Text>
        </View>
        {this.state.inHand.length ? (
          <SortableGrid
            style={styles.sortableGrid}
            itemsPerRow={7}
            dragActivationTreshold={200}
            onDragRelease={obj =>
              this.setState({
                sortedLetters: obj.itemOrder.map(letter =>
                  parseInt(letter.key, 10)
                )
              })
            }
          >
            {this.props.satchel
              .filter(letter => this.state.inHand.includes(letter.id))
              .map(letter => (
                <View style={styles.littleLetterTile} key={letter.id}>
                  <Text style={styles.littleLetterName}>
                    {letter.letterCategory.name}
                  </Text>
                </View>
              ))}
          </SortableGrid>
        ) : (
          <View style={styles.sortableGrid} />
        )}
        <View>
          <Text style={styles.value}>POINTS: {this.state.points}</Text>
          <TouchableHighlight
            underlayColor={'#f9f5ec'}
            style={styles.submitButton}
            onPress={this.handleWordSubmit}
          >
            <Text
              style={{ fontSize: 20, color: '#FFFFFF', fontWeight: 'bold' }}
            >
              Submit Word
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const mapStateToProps = ({ user, satchel, userLocation, newWord }) => ({
  user,
  satchel,
  userLocation,
  newWord
})
const mapDispatchToProps = {
  getSatchel,
  updateLetter,
  updateUser,
  createNewWord
}

export default connect(mapStateToProps, mapDispatchToProps)(SortableHand)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f9f5ec'
  },
  textTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#706FD3',
    textAlign: 'center'
  },
  textSub: {
    fontSize: 15,
    color: '#706FD3',
    textAlign: 'center'
  },
  instructionBlock: {
    margin: 50,
    marginBottom: 15,
    flexGrow: 0
  },
  sortableGrid: {
    marginTop: 15,
    marginLeft: 20,
    marginRight: 20,
    flexGrow: 2
  },
  hr: {
    opacity: 0.5,
    borderBottomColor: '#706FD3',
    borderBottomWidth: 1
  },
  letters: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    flexWrap: 'wrap',
    flexDirection: 'row',
    flexGrow: 4
  },
  letterTile: {
    margin: 5,
    backgroundColor: '#FFFFFF',
    width: 80,
    height: 80,
    borderRadius: 10,
    borderColor: '#706FD3',
    borderWidth: 1
  },
  letterName: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#706FD3',
    textAlign: 'center'
  },
  letterSub: {
    fontSize: 15,
    color: '#706FD3',
    textAlign: 'center'
  },
  littleLetterTile: {
    backgroundColor: '#FFFFFF',
    width: 40,
    height: 40,
    borderRadius: 5,
    borderColor: '#706FD3',
    borderWidth: 1
  },
  littleLetterName: {
    paddingTop: 5,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#706FD3',
    textAlign: 'center'
  },
  value: {
    fontSize: 15,
    color: '#706FD3',
    textAlign: 'center',
    letterSpacing: 3
  },
  submitButton: {
    height: 60,
    width: width - 40,
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 24,
    backgroundColor: '#706FD3',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.2
  }
})
