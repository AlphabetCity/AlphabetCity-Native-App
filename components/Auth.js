'use strict'
import React, { Component } from 'react'
import { View, TouchableHighlight, StyleSheet, Dimensions} from 'react-native'
import { FormLabel, FormInput, Button, Text } from 'react-native-elements'
import { connect } from 'react-redux'
import { userLocation } from '../store/userLocation'
import { createUser, getUser } from '../store/user'

const { height, width } = Dimensions.get('window')

class Auth extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userName: '',
      email: '',
      password: '',
      message: '',
      user: undefined
    }

    this.handleSignup = this.handleSignup.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleSignup() {
    this.setState({ message: '' })
    const { userName, email, password } = this.state
    const { createUser, userLocation} = this.props
    const user = { userName, email, password}
    if (!userName || !email || !password) {
      this.setState({ message: 'All fields required!' })
    } else {
      this.setState({ message: '' })
      createUser(user, userLocation)
      this.props.profileNav
        ? this.props.profileNav.navigate('Profile')
        : this.props.navigation.navigate('Profile')
    }
  }

  handleLogin() {
    this.setState({ message: '' })
    const { userName, email, password } = this.state
    this.props
      .getUser({ userName, email, password })
      .then(user => {
        this.setState({ user: user })
      })
      .then(() => {
        if (
          !this.state.user ||
          !this.state.userName ||
          !this.state.email ||
          !this.state.password
        ) {
          this.setState({ message: 'User not found.' })
        } else {
          this.setState({ message: '' })
          this.props.navigation.navigate('Profile')
        }
      })
  }

  render = () => (
    <View style={styles.container}>
      <FormInput
        containerStyle={styles.containerInput}
        style={styles.input}
        placeholder="Username"
        autoCapitalize="none"
        onChangeText={text =>
          this.setState({ userName: text.replace(/\s/g, '') })
        }
      />
      <FormInput
        containerStyle={styles.containerInput}
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={text => this.setState({ email: text })}
      />
      <FormInput
        containerStyle={styles.containerInput}
        style={styles.input}
        secureTextEntry
        placeholder="Password"
        autoCapitalize="none"
        onChangeText={text => this.setState({ password: text })}
      />
      {this.state.message ? (
        <Text style={styles.message}>{this.state.message}</Text>
      ) : null}
      <TouchableHighlight
        underlayColor={'#f9f5ec'}
        style={styles.containerButton}
        onPress={this.handleLogin.bind(this)}
      >
        <Text style={{fontSize: 20, color: '#FFFFFF', fontWeight: 'bold'}}>Login</Text>
      </TouchableHighlight>
      <TouchableHighlight
        underlayColor={'#f9f5ec'}
        style={styles.containerButton}
        onPress={this.handleSignup.bind(this)}
      >
        <Text style={{fontSize: 20, color: '#FFFFFF', fontWeight: 'bold'}}>Sign Up</Text>
      </TouchableHighlight>
    </View>
  )
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f9f5ec',
    alignItems: 'center',
    paddingTop: 40,
    padding: 20
  },
  containerInput: {
    width: '90%'
  },
  input: {
    height: 35,
    backgroundColor: 'rgba(192,192,192,0.3)',
    marginBottom: 25,
    width: '90%'
  },
  containerButtonTop: {
    padding: 10,
    width: '100%',
    marginTop: 60
  },
  containerButton: {
    height: 60,
    width: width - 40,
    marginTop: 20,
    backgroundColor: '#474787',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  labelContainerStyle: {
    marginTop: 8
  },
  formContainer: {
    padding: 10
  },
  message: {
    color: '#FF5252',
    fontSize: 15,
    fontWeight: 'bold',
    padding: 20
  }
}

const mapState = ({ userLocation }) => ({ userLocation })

const mapDispatch = { createUser, getUser }

export default connect(mapState, mapDispatch)(Auth)
