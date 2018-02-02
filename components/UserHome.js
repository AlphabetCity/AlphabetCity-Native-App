import React, { Component } from 'react'
import { View } from 'react-native'
import { Text, Avatar } from 'react-native-elements'
import { connect } from 'react-redux'

class UserHome extends Component {

  render() {
    console.log(this.props)

    return (
      <View style={styles.container}>
        {this.props.user.userName
        ?
          <View>
            <Avatar
              xlarge
              rounded
              source={{uri: this.props.user.icon}}
              activeOpacity={0.7}
              containerStyle={styles.avatar}
            />
            <Text style={styles.score}>
              SCORE: {this.props.user.score}
            </Text>
            <Text>
              USERNAME: {this.props.user.userName}
            </Text>
            <Text>
              EMAIL: {this.props.user.email}
            </Text>
          </View>
        :
          <Text>no user</Text>
        }

      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#F7F1E3',
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    marginTop: 50
  },
  score: {
    color: '#33d9b2',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  username: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  email: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  }
}

const mapState = ({ user }) => ({ user })

export default connect(mapState)(UserHome)
