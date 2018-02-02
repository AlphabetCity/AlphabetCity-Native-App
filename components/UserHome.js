import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { FormLabel, FormInput, Button, Text } from 'react-native-elements'
import { connect } from 'react-redux'

class UserHome extends Component {

  render = () => (
    <View style={styles.container}>
      <Text>hola!</Text>
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

const mapDispatch = ({})

export default connect(null, mapDispatch)(UserHome)
