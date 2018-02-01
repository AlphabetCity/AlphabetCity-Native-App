'use strict'
import { combineReducers } from 'redux'
import user from './user'
import userLocation from './userLocation'
import item from './item'

export default function getRootReducer(nav) {
  return combineReducers({
      nav,
      user,
      userLocation,
      item
  })
}
