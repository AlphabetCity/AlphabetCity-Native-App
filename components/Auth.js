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
      password: '',
      message: '',
      user: {}
    }

    this.handleSignup = this.handleSignup.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleSignup() {
    this.setState({message: ''})
    const { userName, email, password } = this.state
    this.props.createUser({ userName, email, password })
    this.props.profileNav ?
      this.props.profileNav.navigate('Profile')
    :
      this.props.navigation.navigate('Profile')
  }

  handleLogin() {
    this.setState({message: ''})

    const { userName, email, password } = this.state
    this.props.getUser({ userName, email, password })
    .then(user => {
      this.setState({user: user})
    })

    if(this.state.user === {}
      || !this.state.userName
      || !this.state.email
      || !this.state.password
    ){
      this.setState({message: 'user not found'})
    }else{
      this.setState({message: ''})
      this.props.navigation.navigate('Profile')
    }
  }

  render = () => (
    <View style={styles.container}>
      <FormLabel>
        Username
      </FormLabel>
      <FormInput
        style={styles.input}
        placeholder="Username"
        onChangeText={text => this.setState({ userName: text.replace(/\s/g, '') })}
      />
      <FormLabel>
        Email
      </FormLabel>
      <FormInput
        style={styles.input}
        placeholder="Email"
        onChangeText={text => this.setState({ email: text })}
      />
      <FormLabel>
        PW
      </FormLabel>
      <FormInput
        style={styles.input}
        secureTextEntry
        onChangeText={text => this.setState({ password: text })}
      />
      {this.state.message ?
        <Text style={styles.message}>
          {this.state.message}
        </Text>
      : null
      }
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
  },
  message: {
    color: '#FF5252',
  }
}

const mapDispatch = ({ createUser, getUser })

export default connect(null, mapDispatch)(Auth)
