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
      password: this.props.user.password,
      confirmPassword: '',
      message: ''
    }

    this.handleUpdate = this.handleUpdate.bind(this)
  }

  handleUpdate() {
    this.setState({message: ''})
    const { userName, email, password, confirmPassword } = this.state
    if(this.state.password !== this.state.confirmPassword){
      this.setState({message: 'wrong password'})
    }else{
      this.props.updateUser(this.props.user.id, { userName, email, password })
      this.props.navigation.navigate('Profile')
    }

  }

  render = () => (
    <View style={styles.container}>
      <FormInput
        containerStyle={styles.containerInput}
        style={styles.input}
        placeholder="Username"
        value={this.state.userName}
        onChangeText={text => this.setState({ userName: text.replace(/\s/g, '') })}
      />
      <FormInput
        containerStyle={styles.containerInput}
        style={styles.input}
        placeholder="Email"
        value={this.state.email}
        onChangeText={text => this.setState({ email: text })}
      />
      <FormInput
        containerStyle={styles.containerInput}
        style={styles.input}
        placeholder="Enter Password"
        secureTextEntry={true}
        onChangeText={text => this.setState({ password: text })}
      />
      <FormInput
        containerStyle={styles.containerInput}
        style={styles.input}
        secureTextEntry={true}
        placeholder="Confirm Password"
        onChangeText={text => this.setState({ confirmPassword: text })}
      />
      {this.state.message ?
        <Text style={styles.message}>
          {this.state.message}
        </Text>
      :
        null
      }
      <Button
        containerViewStyle={styles.containerButton}
        backgroundColor='#474787'
        borderRadius={30}
        color='#f7f1e3'
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
    backgroundColor: '#f7f1e3',
    alignItems: 'center',
    paddingTop: 40,
    padding: 20,
  },
  containerInput: {
    width: '90%'
  },
  input: {
    height: 35,
    backgroundColor: 'rgba(192,192,192,0.3)',
    marginBottom: 15,
    width: '90%',
  },
  containerButton: {
    padding: 10,
    width: '100%',
    marginTop: 40,
  },
  labelContainerStyle: {
    marginTop: 8,
  },
  formContainer: {
    padding: 10,
  },
  message: {
    color: '#FF5252',
    padding: 10
  }
}

const mapState = ({ user }) => ({ user })

const mapDispatch = ({ updateUser })

export default connect(mapState, mapDispatch)(Update)
