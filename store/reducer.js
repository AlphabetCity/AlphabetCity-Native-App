'use strict'
import { combineReducers } from 'redux'
import userLocation from './userLocation'
import allHiddenItems from './allHiddenItems'

export default function getRootReducer(nav) {
  return combineReducers({
      nav,
      userLocation,
      allHiddenItems
  })
}
