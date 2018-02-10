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
      <View style={{backgroundColor:'#f7f1e3', height:'100%'}}>
        { this.props.highscores
          ?
          <Leaderboard
          data={this.props.highscores}
          sortBy='score'
          labelBy='userName'
          oddRowColor='#2c2c54'
          evenRowColor='#40407a'
          labelStyle={{color:'#f7f1e3'}}
          scoreStyle={{color:'#f7f1e3'}}
          rankStyle={{color:'#f7f1e3'}}
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
