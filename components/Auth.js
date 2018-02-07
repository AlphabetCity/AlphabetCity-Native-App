'use strict'
import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { FormLabel, FormInput, Button, Text } from 'react-native-elements'
import { connect } from 'react-redux'
import { createUser, getUser } from '../store/user'

class Auth extends Component {

  constructor(props) {
    super(props)

    this.state = {
      userName: '',
      email: '',
      password: ''
    }

    this.handleSignup = this.handleSignup.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleSignup() {
    const { userName, email, password } = this.state
    this.props.createUser({ userName, email, password })
    this.props.profileNav ?
      this.props.profileNav.navigate('Main')
    :
      this.props.navigation.navigate('Main')
  }

  handleLogin() {
    const { userName, email, password } = this.state
    this.props.getUser({ userName, email, password })
    this.props.navigation.navigate('Profile')
  }

  render = () => (
    <View style={styles.container}>
      <FormLabel>
        Username
      </FormLabel>
      <FormInput
        style={styles.input}
        placeholder="Username"
        autoCapitalize="none"
        onChangeText={text => this.setState({ userName: text.replace(/\s/g, '') })}
      />
      <FormLabel>
        Email
      </FormLabel>
      <FormInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={text => this.setState({ email: text })}
      />
      <FormLabel>
        PW
      </FormLabel>
      <FormInput
        style={styles.input}
        secureTextEntry
        autoCapitalize="none"
        onChangeText={text => this.setState({ password: text })}
      />
      <Button
        style={styles.buttonStyle}
        small
        onPress={this.handleLogin.bind(this)}
        title="Login"
      />
      <Button
        style={styles.buttonStyle}
        small
        onPress={this.handleSignup.bind(this)}
        title="Sign Up"
      />
    </View>
  )
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  input: {
    height: 35,
    backgroundColor: 'rgba(192,192,192,0.3)',
    marginBottom: 15,
  },
  buttonStyle: {
    padding: 10,
  },
  labelContainerStyle: {
    marginTop: 8,
  },
  formContainer: {
    padding: 10,
  }
}

const mapDispatch = ({ createUser, getUser })

export default connect(null, mapDispatch)(Auth)
