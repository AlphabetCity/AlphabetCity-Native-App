'use strict'
import axios from 'axios'
import API_URL from '../utils/apiUrl'

// Action Type
const SIGNUP_USER = 'SIGNUP_USER'
const LOGIN_USER = 'LOGIN_USER'
const REMOVE_USER = 'REMOVE_USER'
const EDIT_USER = 'EDIT_USER'

// Action Creators
const signupUser = user => ({ type: SIGNUP_USER, user })
const loginUser = user => ({ type: LOGIN_USER, user })
export const removeUser = () => ({ type: REMOVE_USER })
const editUser = user => ({ type: EDIT_USER, user })

// Thunks
export const createUser = (user, location) => async dispatch => {
  try {
    const res = await axios.post(`${API_URL}/auth/signup`, user)
    const userData = await res.data
    await axios.post(`${API_URL}/api/letters`, location)
    dispatch(signupUser(userData))
  } catch (error) {
    console.warn(error)
  }
}

export const getUser = user => async dispatch => {
  try {
    const res = await axios.post(`${API_URL}/auth/login`, user)
    const userData = await res.data
    dispatch(loginUser(userData))
    return userData
  } catch (error) {
    console.warn(error)
  }
}

export const updateUser = (userId, changes) => async dispatch => {
  try {
    const res = await axios.put(`${API_URL}/api/users/${userId}`, changes)
    const userData = await res.data
    dispatch(editUser(userData))
  } catch (error) {
    console.error(error)
  }
}

export const deleteUser = (userId) => async dispatch => {
  try {
    await axios.delete(`${API_URL}/api/users/${userId}`)
    dispatch(removeUser())
  } catch (error) {
    console.warn(error)
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
      return {}
    case EDIT_USER:
      return action.user
    default:
      return state
  }
}

export default reducer
