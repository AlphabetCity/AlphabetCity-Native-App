'use strict'
import React from 'react'
import { View, Text, Button } from 'react-native'
import { connect } from 'react-redux';

const AR = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>AR goes here</Text>
      <Button
        onPress={() => navigation.navigate('Main')}
        title="Find object on Map"
      />
    </View>
  )
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6c5ce7',
    textAlign: 'center'
  }
}

export default connect()(AR)
