'use strict'
import React, { Component } from 'react'
import { View, Text, Button} from 'react-native'
import { Avatar } from 'react-native-elements'
import { Image } from 'react-native'
import { connect } from 'react-redux'
import { Auth } from './'
import { deleteUser } from '../store/user'

class UserHome extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
        this.props.user.userName
          ?
          <View style={styles.container}>
            <Avatar
              xlarge
              rounded
              source={{ uri: this.props.user.icon }}
              activeOpacity={0.7}
              containerStyle={{ justifyContent: 'center', alignItems: 'center', }}
            />
            <Text style={styles.score}>
              SCORE: {this.props.user.score}
            </Text>
            <Text style={styles.username}>
              USERNAME: {this.props.user.userName}
            </Text>
            <Text style={styles.email}>
              EMAIL: {this.props.user.email}
            </Text>
            <Button
              onPress={()=>console.log('navigate to MyWords')}
              title="My Words"
              color="#F7F1E3"
            />
            <Button
              onPress={() => {
                this.props.deleteUser(this.props.user.id)
                console.log('delete')
                this.props.navigation.navigate('Main')
              }}
              title="Logout"
              color="#F7F1E3"
            />
            <Button
              onPress={()=> console.log('update')}
              title="Update Profile"
              color="#F7F1E3"
            />
          </View>
          :
          <Auth profileNav={this.props.navigation}/>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#474787',
    alignItems: 'center',
    padding: 10,
  },
  score: {
    marginTop: 50,
    marginBottom: 20,
    color: '#33d9b2',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  username: {
    color: '#218c74',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  email: {
    color: '#218c74',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  // button: {
  //   width: '90%',
  //   color: 'black',
  //   backgroundColor: "#F7F1E3",
  //   textAlign: 'center',
  //   fontSize: 30,
  //   fontWeight: 'bold',
  // }
}

const mapState = ({ user }) => ({ user })

const mapDispatch = ({ deleteUser })

export default connect(mapState, mapDispatch)(UserHome)
