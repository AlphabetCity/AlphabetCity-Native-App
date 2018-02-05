'use strict'
import axios from 'axios'

// Action Type
const SIGNUP_USER = 'SIGNUP_USER'
const LOGIN_USER = 'LOGIN_USER'
const REMOVE_USER = 'REMOVE_USER'
const EDIT_USER = 'EDIT_USER'

// Action Creators
const signupUser = user => ({ type: SIGNUP_USER, user })
const loginUser = user => ({ type: LOGIN_USER, user })
export const removeUser = () => ({ type: REMOVE_USER, user:{} })
const editUser = user => ({ type: EDIT_USER, user })

// Thunks
export const createUser = user => async dispatch => {
  try {
    const res = await axios.post('https://notseek.herokuapp.com/auth/signup', user)
    const userData = await res.data
    dispatch(signupUser(userData))
  } catch (error) {
    console.warn(error)
  }
}

export const getUser = user => async dispatch => {
  try {
    const res = await axios.post('https://notseek.herokuapp.com/auth/login', user)
    const userData = await res.data
    dispatch(loginUser(userData))
  } catch (error) {
    console.warn(error)
  }
}

export const deleteUser = userId => async dispatch => {
  try {
    await axios.delete(`https://notseek.herokuapp.com/api/users/${userId}`)
    dispatch(removeUser())
  } catch (error) {
    console.warn(error)
  }
}

export const updateUser = (userId, changes) => async dispatch => {
  try {
    const res = await axios.put(`https://notseek.herokuapp.com/api/users/${userId}`, changes)
    const userData = await res.data
    dispatch(editUser(userData))
  } catch (error) {
    console.error(error)
  }
}

// Reducer
const reducer = (state = {}, action) => {
  switch (action.type) {
    case SIGNUP_USER:
      return action.user
    case LOGIN_USER:
      return action.user
    case REMOVE_USER:
      return action.user
    case EDIT_USER:
      return action.user
    default:
      return state
  }
}

export default reducer
