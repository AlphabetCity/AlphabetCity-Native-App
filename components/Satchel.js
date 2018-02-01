import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, ListItem, ListView } from 'react-native-elements'
import { View, Text } from 'react-native'
import store from '../store'

props = { satchel }

const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'http://dreamicus.com/data/apple/apple-04.jpg'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'http://dreamicus.com/data/apple/apple-04.jpg'
  }]



export default function Satchel(props) {
  const { satchel } = props
  console.log(props)

  return (
    <View>
      <Text>{props.satchel[0].itemId}</Text>
      <List containerStyle={{ marginBottom: 20 }}>
        {
          list.map((l, i) => (
            <ListItem
              roundAvatar
              avatar={{ uri: l.avatar_url }}
              key={i}
              title={l.name}
            />
          ))
        }
      </List>
    </View>
  )
}
