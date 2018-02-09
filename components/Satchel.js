'use strict'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, ListItem, ListView, Button } from 'react-native-elements'
import { View, Text } from 'react-native'
import { updateLetter } from '../store/satchel'

class Satchel extends Component {
  constructor(props) {
    super(props)

    this.dropItem.bind(this)
  }

  dropItem = (satchelLetter) => {
    this.props.updateLetter(satchelLetter.id, { latitude: this.props.userLocation.latitude, longitude: this.props.userLocation.longitude })
    this.props.navigation.goBack()
  }


  render() {
    return (
      <View style={{
        backgroundColor:'#f7f1e3',
        height:'100%',
      }}>
        <List containerStyle={{
          marginBottom: 20}}>
          {
            this.props.satchel.map((satchelLetter) => (
              <ListItem
                roundAvatar
                key={satchelLetter.id}
                title={`Drop the letter ${satchelLetter.letterCategory.name}`}
                onPress={() => {
                  this.dropItem(satchelLetter)
                }}
                chevronColor='#33D9B2'
                containerStyle={{
                  backgroundColor:'#40407A'}}
                titleStyle={{
                  color:'#F7f1E3',
                }}
              />
            ))
          }
        </List>
        <Button
          title="FORM A WORD!"
          containerViewStyle={{
            padding: 10,
            width:'95%',
          }}
          backgroundColor='#474787'
          borderRadius={30}
          titleStyle={{color:'#F7F1E3'}}
          small
          onPress={() => {
            this.props.satchel.map(letterObj => letterObj.inHand = false)
            return this.props.navigation.navigate('FormAWord', { satchelPlus: this.props.satchel })
          }}
        />
      </View>
    )
  }
}


const mapStateToProps = ({ user, satchel, userLocation }) => ({ user, satchel, userLocation })
const mapDispatchToProps = ({ updateLetter })

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Satchel)
