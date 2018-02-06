'use strict'
import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import Leaderboard from 'react-native-leaderboard';
import { loadUserWords } from '../store/words'

class UserWords extends Component {

  constructor(props) {
    super(props)

  }

  componentDidMount(props){
    this.props.loadUserWords(this.props.user.id)
  }

  render(props) {
    return (
      <View>
        { this.props.words
          ?
          <Leaderboard
          data={this.props.words}
          sortBy='createdAt' //should be score ...!!
          labelBy='word'
        />
        :
          <Text>...loading</Text>
        }
      </View>

    )
  }
}

const mapState = ({ words, user }) => ({ words, user })

const mapDispatch = ({ loadUserWords })

export default connect(mapState, mapDispatch)(UserWords)
