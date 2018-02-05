'use strict'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, ListItem, ListView } from 'react-native-elements'
import { View, Text } from 'react-native'
import { FormLabel, FormInput } from 'react-native-elements'
import dictionary from '../assets/dictionary'


class FormAWord extends Component {

  constructor() {
    super()

    this.state = {
      word: ''
    }

    this.handleWordSubmit = this.handleWordSubmit.bind(this)
  }

  handleWordSubmit() {
    console.log(dictionary.has(this.state.word))
    // return dictionary.has(this.state.word)
  }



  render() {
    return (
      <View>
        <FormLabel>Input a Word</FormLabel>
        <FormInput onChangeText={text => this.setState({ word: text })} />
        <Button
          style={styles.buttonStyle}
          small
          onPress={this.handleWordSubmit}
          title="Submit Word"
        />
      </View>
    )
  }
}


const mapStateToProps = ({ user, satchel, userLocation }) => ({ user, satchel, userLocation })
const mapDispatchToProps = ({ })

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormAWord)
