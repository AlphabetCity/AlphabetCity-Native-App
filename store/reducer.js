'use strict'
import { combineReducers } from 'redux'
import user from './user'
import userLocation from './userLocation'
import satchel from './satchel'
import allHiddenLetters from './allHiddenLetters'
import highscores from './highscores'
import words from './words'
import newWord from './newWord'

export default function getRootReducer(nav) {
  return combineReducers({
    nav,
    user,
    userLocation,
    allHiddenLetters,
    satchel,
    highscores,
    words,
    newWord
  })
}
