'use strict'
import React from 'react';
import { Feather } from '@expo/vector-icons';
import { View, TouchableHighlight, Image, Text } from 'react-native';
import { connect } from 'react-redux';

const Settings = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.settingsButton}
        onPress={() => navigation.navigate('Main')}
      >
        <Text style={styles.text}>HOME</Text>
      </TouchableHighlight>
    </View>
  )
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f7f1e3',
    paddingTop: 50
  },
  settingsButton: {
    textAlign: 'left',
    borderBottomColor: '#3B3B98',
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 20,
    marginLeft: 10
  }
}

export default connect()(Settings)
