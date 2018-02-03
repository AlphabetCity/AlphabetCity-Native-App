'use strict'
import { combineReducers } from 'redux'
import user from './user'
import userLocation from './userLocation'
import satchel from './satchel'
import allHiddenItems from './allHiddenItems'
import highscores from './highscores'

export default function getRootReducer(nav) {
  return combineReducers({
    nav,
    user,
    userLocation,
    allHiddenItems,
    satchel,
    highscores
  })
}
