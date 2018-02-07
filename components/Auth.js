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
      user: undefined
    }

    this.handleSignup = this.handleSignup.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleSignup() {
    this.setState({message: ''})
    const { userName, email, password } = this.state
    if(!this.state.userName
      || !this.state.email
      || !this.state.password
    ){
        this.setState({message: 'All fields required!'})
      }else{
        this.setState({message: ''})
        this.props.createUser({ userName, email, password })
        this.props.profileNav ?
          this.props.profileNav.navigate('Profile')
        :
        this.props.navigation.navigate('Profile')
      }
  }

  handleLogin() {
    this.setState({message: ''})
    const { userName, email, password } = this.state
    this.props.getUser({ userName, email, password })
    .then(user => {
      this.setState({user: user})
    })
    .then( () => {
      if(!this.state.user
        || !this.state.userName
        || !this.state.email
        || !this.state.password
      ){
        this.setState({message: 'user not found'})
      }else{
        this.setState({message: ''})
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
        onChangeText={text => this.setState({ userName: text.replace(/\s/g, '') })}
      />
      <FormInput
        containerStyle={styles.containerInput}
        style={styles.input}
        placeholder="Email"
        onChangeText={text => this.setState({ email: text })}
      />
      <FormInput
        containerStyle={styles.containerInput}
        style={styles.input}
        secureTextEntry
        placeholder="Password"
        onChangeText={text => this.setState({ password: text })}
      />
      {this.state.message ?
        <Text style={styles.message}>
          {this.state.message}
        </Text>
      : null
      }
      <Button
        containerViewStyle={styles.containerButtonTop}
        backgroundColor='#474787'
        color='#f7f1e3'
        small
        onPress={this.handleLogin.bind(this)}
        title="Login"
      />
      <Button
        containerViewStyle={styles.containerButton}
        backgroundColor='#474787'
        color='#f7f1e3'
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
    backgroundColor: '#f7f1e3',
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
  containerInput:{
    width: '90%'
  },
  input: {
    height: 35,
    backgroundColor: 'rgba(192,192,192,0.3)',
    marginBottom: 25,
    width:'90%',
  },
  containerButtonTop: {
    padding: 10,
    width:'100%',
    marginTop:60
  },
  containerButton: {
    padding: 10,
    width:'100%',
  },
  labelContainerStyle: {
    marginTop: 8,
  },
  formContainer: {
    padding: 10,
  },
  message: {
    color: '#FF5252',
    padding:10
  }
}

const mapDispatch = ({ createUser, getUser })

export default connect(null, mapDispatch)(Auth)
