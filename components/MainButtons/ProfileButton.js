'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { TouchableHighlight, Image, StyleSheet } from 'react-native'

const ProfileButton = props => (
  <TouchableHighlight
    style={styles.profileButton}
    underlayColor={'#474787'}
    activeOpacity={0.9}
    onPress={() => props.navigation.navigate('DrawerOpen')}
  >
    <Image
      source={require('../../assets/icons/user.png')}
      fadeDuration={0}
      style={{ width: 32, height: 32 }}
    />
  </TouchableHighlight>
)

const styles = StyleSheet.create({
  profileButton: {
    backgroundColor: '#706FD3',
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 20,
    top: 50,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.2
  },
})

export default connect()(ProfileButton)
