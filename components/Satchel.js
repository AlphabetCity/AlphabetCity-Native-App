'use strict'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  TouchableHighlight,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native'
import { updateLetter } from '../store/satchel'
import { getAllHiddenLetters } from '../store/allHiddenLetters'

const { width } = Dimensions.get('window')

class Satchel extends Component {
  _dropLetter = async (letter, userLocation) => {
    const { updateLetter, getAllHiddenLetters } = this.props
    await updateLetter(letter.id, {
      latitude: userLocation.latitude,
      longitude: userLocation.longitude
    })
    await getAllHiddenLetters()
  }

  render() {
    const { satchel, makeAWord, userLocation } = this.props
    return (
      <View
        style={[
          styles.satchelDropDown,
          {
            height: satchel.length
              ? Math.ceil(satchel.length / 2) * 58.7 + 166.8
              : 215
          }
        ]}
      >
        {/* Drop a Letter Header Text */}
        <View style={{ flex: 1, marginTop: 30 }}>
          {Boolean(satchel.length) && (
            <Text style={styles.dropHeader}>Drop a Letter</Text>
          )}
          {/* Satchel */}
          <View style={styles.letters}>
            {/* Letter Tiles */}
            {satchel.length ? (
              satchel.map(letter => (
                <TouchableHighlight
                  key={letter.id}
                  style={styles.dropButton}
                  underlayColor={'#FFFFFF'}
                  onPress={() => this._dropLetter(letter, userLocation)}
                >
                  <View style={styles.letterTile}>
                    <Text style={styles.letter}>
                      {letter.letterCategory.name}
                    </Text>
                    <Text style={styles.letterSub}>
                      {letter.letterCategory.points}
                    </Text>
                  </View>
                </TouchableHighlight>
              ))
            ) : (
              <View>
                <Text style={styles.noLetters}>
                  You're out of letters! Walk around the world to find more.
                </Text>
              </View>
            )}
          </View>
          {/* Make a Word Button */}
          <View style={styles.hr} />
          <TouchableHighlight
            style={styles.makeAWordButton}
            underlayColor={'#474787'}
            activeOpacity={0.9}
            onPress={makeAWord}
          >
            <Text style={styles.makeAWordText}>Make a Word</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  satchelDropDown: {
    backgroundColor: '#FFFFFF',
    width: width / 2,
    borderRadius: 30,
    position: 'absolute',
    right: 20,
    top: 130,
    shadowOffset: { width: 4, height: 4 },
    shadowColor: 'black',
    shadowOpacity: 0.1
  },
  dropHeader: {
    color: '#706FD3',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingBottom: 20
  },
  dropButton: {
    flexBasis: 60,
    flexGrow: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  makeAWordButton: {
    backgroundColor: '#706FD3',
    borderRadius: 20,
    width: width / 2 - 40,
    height: 40,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  makeAWordText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  letters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 20,
    marginBottom: 20
  },
  letterTile: {
    width: 50,
    marginLeft: 25,
    flexDirection: 'row'
  },
  letter: {
    fontSize: 55,
    fontWeight: 'bold',
    color: '#706FD3',
    paddingLeft: 10
  },
  letterSub: {
    fontSize: 15,
    color: '#706FD3',
    alignSelf: 'flex-end',
    marginRight: 10
  },
  noLetters: {
    fontSize: 20,
    color: '#706FD3',
    textAlign: 'center',
    marginRight: 20
  },
  hr: {
    borderBottomColor: '#706FD3',
    opacity: 0.5,
    borderBottomWidth: 1
  }
})

const mapState = ({ satchel, userLocation }) => ({ satchel, userLocation })

const mapDispatch = { updateLetter, getAllHiddenLetters }

export default connect(mapState, mapDispatch)(Satchel)
