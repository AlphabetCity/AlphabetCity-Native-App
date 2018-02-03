'use strict'
import React, { Component } from 'react'
import { View } from 'react-native'
import { Text, Avatar } from 'react-native-elements'
import { Image } from 'react-native'
import { connect } from 'react-redux'

class UserHome extends Component {

  render() {

    return (
      <View style={styles.container}>
        {this.props.user.userName
          ?
          <View style={styles.wrap}>
            <Avatar
              xlarge
              rounded
              source={{ uri: this.props.user.icon }}
              activeOpacity={0.7}
              containerStyle={{ justifyContent: 'center', alignItems: 'center', }}
            />
            <Text style={styles.score}>
              SCORE: {this.props.user.score}
            </Text>
            <Text style={styles.username}>
              USERNAME: {this.props.user.userName}
            </Text>
            <Text style={styles.email}>
              EMAIL: {this.props.user.email}
            </Text>
          </View>
          :
          <Text>no user</Text>
        }

      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#474787',
    alignItems: 'center',
    padding: 10,
  },
  wrap: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  score: {
    marginTop: 50,
    marginBottom: 20,
    color: '#33d9b2',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  username: {
    color: '#218c74',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  email: {
    color: '#218c74',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  }
}

const mapState = ({ user }) => ({ user })

export default connect(mapState)(UserHome)
