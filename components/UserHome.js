'use strict'
import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import { Avatar } from 'react-native-elements'
import { connect } from 'react-redux'
import { Auth } from './'
import { deleteUser } from '../store/user'

class UserHome extends Component {
  render() {
    return this.props.user && this.props.user.userName ? (
      <View style={styles.container}>
        <Avatar
          xlarge
          rounded
          title={this.props.user.userName[0].toUpperCase()}
          titleStyle={{ color: '#F7F1E3' }}
          activeOpacity={0.7}
          containerStyle={{
            justifyContent: 'center',
            alignItems: 'center'
          }}
        />
        <Text style={styles.score}>SCORE: {this.props.user.score}</Text>
        <Text style={styles.username}>
          USERNAME: {this.props.user.userName}
        </Text>
        <Text style={styles.email}>EMAIL: {this.props.user.email}</Text>
        <Button
          onPress={() => {
            this.props.navigation.navigate('UserWords')
          }}
          title="My Words"
          color="#F7F1E3"
        />
        <Button
          onPress={() => {
            this.props.navigation.navigate('UpdateUser')
          }}
          title="Update Profile"
          color="#F7F1E3"
        />
        <Button
          onPress={() => {
            this.props.deleteUser(this.props.user.id)
            this.props.navigation.navigate('Main')
          }}
          title="Delete My Account"
          color="#FF5252"
        />
      </View>
    ) : (
      <Auth navigation={this.props.navigation} />
    )
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#474787',
    alignItems: 'center',
    padding: 10
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
    fontSize: 20,
    fontWeight: 'bold'
  },
  email: {
    color: '#218c74',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30
  }
}

const mapState = ({ user }) => ({ user })

const mapDispatch = { deleteUser }

export default connect(mapState, mapDispatch)(UserHome)
