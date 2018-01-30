'use strict'
import React from 'react'
import { View, TouchableHighlight, Image } from 'react-native'
import { connect } from 'react-redux'

import { Feather } from '@expo/vector-icons';

// const Main = ({ navigation }) => {
//   return (
//     <View style={styles.container}>
//       <View
//         style={styles.arButton}
//         onStartShouldSetResponder= {(evt) => true}
//         onResponderRelease={() => navigation.navigate('AR')}
//       >
//         <Text>AR</Text>
//       </View>
//     </View>
//   )
// }

const Main = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.arButton}
        underlayColor={'#474787'}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('AR')}>
        <Feather name="eye" size={32} color={'#FFFFFF'} />
      </TouchableHighlight>
    </View>
  )
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 40
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3B3B98',
    textAlign: 'center',
  },
  arButton: {
    backgroundColor: '#706fd3',
    height: 60,
    width: 140,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 20
  }
}

export default connect()(Main)

