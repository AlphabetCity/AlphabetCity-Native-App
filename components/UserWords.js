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
      <View style={{backgroundColor:'#f7f1e3', height:'100%'}}>
        { this.props.words
          ?
          <Leaderboard
          data={this.props.words}
          sortBy='createdAt' //should be score ...!!
          labelBy='word'
          oddRowColor='#2c2c54'
          evenRowColor='#40407a'
          labelStyle={{color:'#33d9b2'}}
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

const mapState = ({ words, user }) => ({ words, user })

const mapDispatch = ({ loadUserWords })

export default connect(mapState, mapDispatch)(UserWords)
