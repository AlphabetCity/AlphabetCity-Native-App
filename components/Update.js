'use strict'
import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { FormLabel, FormInput, Button, Text } from 'react-native-elements'
import { connect } from 'react-redux'
import { updateUser } from '../store/user'

class Update extends Component {

  constructor(props) {
    super(props)

    this.state = {
      userName: this.props.user.userName,
      email: this.props.user.email,
      password: this.props.user.password
    }

    this.handleUpdate = this.handleUpdate.bind(this)
  }

  handleUpdate() {
    const { userName, email, password } = this.state
    this.props.updateUser(this.props.user.id, { userName, email, password })
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
        value={this.state.userName}
        onChangeText={text => this.setState({ userName: text.replace(/\s/g, '') })}
      />
      <FormLabel>
        Email
      </FormLabel>
      <FormInput
        style={styles.input}
        placeholder="Email"
        value={this.state.email}
        onChangeText={text => this.setState({ email: text })}
      />
      <FormLabel>
        PW
      </FormLabel>
      <FormInput
        style={styles.input}
        secureTextEntry={true}
        value={this.state.password}
        onChangeText={text => this.setState({ password: text })}
      />
      <Button
        style={styles.buttonStyle}
        small
        onPress={this.handleUpdate.bind(this)}
        title="Update"
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

const mapState = ({ user }) => ({ user })

const mapDispatch = ({ updateUser })

export default connect(mapState, mapDispatch)(Update)
