'use strict'
import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import Leaderboard from 'react-native-leaderboard';
import { loadHighscores } from '../store/highscores'

class Highscores extends Component {

  constructor(props) {
    super(props)
    this.props.loadHighscores()
  }

  render(props) {
    return (
      <View>
        { this.props.highscores
          ?
          <Leaderboard
          data={this.props.highscores}
          sortBy='score'
          labelBy='userName'
          icon='icon'
        />
        :
          <Text>...loading</Text>
        }
      </View>

    )
  }
}

const mapState = ({ highscores }) => ({ highscores })

const mapDispatch = ({ loadHighscores })

export default connect(mapState, mapDispatch)(Highscores)
