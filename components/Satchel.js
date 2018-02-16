'use strict'
import React from 'react'
import { connect } from 'react-redux'
import {
  View,
  TouchableHighlight,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native'

const { width } = Dimensions.get('window')

const Satchel = props => (
  <View
    style={[
      styles.satchelDropDown,
      {
        height: props.satchel.length
          ? Math.ceil(props.satchel.length / 2) * 58.7 + 166.8
          : 215
      }
    ]}
  >
    {/* Drop a Letter Header Text */}
    <View style={{ flex: 1, marginTop: 30 }}>
      {Boolean(props.satchel.length) && (
        <Text style={styles.dropHeader}>Drop a Letter</Text>
      )}
      {/* Satchel */}
      <View style={styles.letters}>
        {props.satchel.length ? (
          props.satchel.map(letter => (
            <TouchableHighlight
              key={letter.id}
              style={{
                flexBasis: 60,
                flexGrow: 0,
                justifyContent: 'center',
                alignItems: 'center'
              }}
              underlayColor={'#FFFFFF'}
              onPress={() => props.dropLetter(letter)}
            >
              <View
                style={{
                  width: 50,
                  marginLeft: 25,
                  flexDirection: 'row'
                }}
              >
                <Text style={styles.letterTile}>
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
            <Text
              style={{
                fontSize: 20,
                color: '#706FD3',
                textAlign: 'center',
                marginRight: 20
              }}
            >
              You're out of letters! Walk around the world to find more.
            </Text>
          </View>
        )}
      </View>
      <View
        style={{
          borderBottomColor: '#706FD3',
          opacity: 0.5,
          borderBottomWidth: 1
        }}
      />
      <TouchableHighlight
        style={styles.makeAWordLink}
        underlayColor={'#474787'}
        activeOpacity={0.9}
        onPress={props.makeAWord}
      >
        <Text
          style={{
            color: '#FFFFFF',
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center'
          }}
        >
          Make a Word
        </Text>
      </TouchableHighlight>
    </View>
  </View>
)

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
  makeAWordLink: {
    backgroundColor: '#706FD3',
    borderRadius: 20,
    width: width / 2 - 40,
    height: 40,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  letters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 20,
    marginBottom: 20
  },
  letterTile: {
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
  }
})

const mapState = ({ satchel }) => ({ satchel })

export default connect(mapState)(Satchel)
