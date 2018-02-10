'use strict'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, ListItem, ListView, FormLabel, FormInput, Button } from 'react-native-elements'
import SortableGrid from 'react-native-sortable-grid'
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet } from 'react-native'
import { getSatchel, updateLetter } from '../store/satchel'
import { updateUser } from '../store/user'
import { createNewWord } from '../store/newWord'


class SortableHand extends Component {

  constructor(props) {
    super(props)

    this.state = {
      word: '',
      inHand: []
    }

    // this.handleWordSubmit = this.handleWordSubmit.bind(this)
  }

  _handlePressLetter() {

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
                      inHand: this.state.inHand.filter((id) => id !== letter.id)
                    })
                  } else {
                    this.setState({
                      inHand: this.state.inHand.concat(letter.id)
                    })
                      }

                  console.log('inHand ids: ', this.state.inHand)
                }}>
                <View style={{ borderRadius: 8, borderColor: '#706FD3', flexDirection: 'row' }}>
                  <Text style={styles.letterTile}>{letter.letterCategory.name}</Text>
                  <Text style={styles.letterSub}>{letter.letterCategory.points}</Text>
                </View>
              </TouchableHighlight>
          ))}
        </View>
        <SortableGrid>
          {}
        </SortableGrid>
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
    shadowOpacity: 0.1
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

