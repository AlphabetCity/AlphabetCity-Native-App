import React, { Component } from 'react'
import { View, Alert, Text } from 'react-native'
import Leaderboard from 'react-native-leaderboard'

export default class HighScores extends Component {
  state = {
    data: [
      { name: 'We Tu Lo', score: null, iconUrl: 'http://gazettereview.com/wp-content/uploads/2016/09/what-happened-to-lance-bass-nsync-203x300.png' },
      { name: 'Adam Savage', score: 12, iconUrl: 'http://gazettereview.com/wp-content/uploads/2016/09/what-happened-to-lance-bass-nsync-203x300.png' },
      { name: 'Derek Black', score: 244, iconUrl: 'http://gazettereview.com/wp-content/uploads/2016/09/what-happened-to-lance-bass-nsync-203x300.png' },
      { name: 'Erika White', score: 0, iconUrl: 'http://gazettereview.com/wp-content/uploads/2016/09/what-happened-to-lance-bass-nsync-203x300.png' },
      { name: 'Jimmy John', score: 20, iconUrl: 'http://gazettereview.com/wp-content/uploads/2016/09/what-happened-to-lance-bass-nsync-203x300.png' },
      { name: 'Joe Roddy', score: 69, iconUrl: 'http://gazettereview.com/wp-content/uploads/2016/09/what-happened-to-lance-bass-nsync-203x300.png' },
      { name: 'Ericka Johannesburg', score: 101, iconUrl: 'http://gazettereview.com/wp-content/uploads/2016/09/what-happened-to-lance-bass-nsync-203x300.png' },
      { name: 'Tim Thomas', score: 41, iconUrl: 'http://gazettereview.com/wp-content/uploads/2016/09/what-happened-to-lance-bass-nsync-203x300.png' },
      { name: 'John Davis', score: 80, iconUrl: 'http://gazettereview.com/wp-content/uploads/2016/09/what-happened-to-lance-bass-nsync-203x300.png' },
      { name: 'Tina Turner', score: 22, iconUrl: 'http://gazettereview.com/wp-content/uploads/2016/09/what-happened-to-lance-bass-nsync-203x300.png' },
      { name: 'Harry Reynolds', score: null, iconUrl: 'http://gazettereview.com/wp-content/uploads/2016/09/what-happened-to-lance-bass-nsync-203x300.png' },
      { name: 'Betty Davis', score: 25, iconUrl: 'http://gazettereview.com/wp-content/uploads/2016/09/what-happened-to-lance-bass-nsync-203x300.png' },
      { name: 'Lauren Leonard', score: 30, iconUrl: 'http://gazettereview.com/wp-content/uploads/2016/09/what-happened-to-lance-bass-nsync-203x300.png' },
    ]
  }

  _alert = (title, body) => {
    Alert.alert(title, body,
      [{ text: 'OK', onPress: () => { } }],
      { cancelable: false }
    )
  }

  render() {
    const props = {
      labelBy: 'name',
      sortBy: 'score',
      data: this.state.data,
      icon: 'iconUrl',
      evenRowColor: '#edfcf9',
    }

    return (
      <View>
        {/* Ghetto Header */}
        <View style={{ paddingTop: 50, backgroundColor: 'black', alignItems: 'center' }}>
          <Text style={{ fontSize: 30, color: 'white', paddingBottom: 10 }}>
            Leaderboard
                    </Text>
        </View>
        <Leaderboard {...props} />
      </View>
    )
  }
}
