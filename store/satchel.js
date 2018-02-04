import axios from 'axios'

// Action Type
const SET_SATCHEL = 'SET_SATCHEL'
const UPDATE_ITEM = 'UPDATE_ITEM'

// Action Creators
const setSatchel = satchel => ({ type: SET_SATCHEL, satchel })

// Thunks
export const getSatchel = (userId) => async dispatch => {
  try {
    const res = await axios.get(`https://notseek.herokuapp.com/api/users/${userId}/items`, {
      params: {
        hidden: 'false'
      }
    })
    const satchel = res.data
    dispatch(setSatchel(satchel))
  } catch (error) {
    console.error(error)
  }
}

export const updateItem = (userItemId, changes) => async dispatch => {
  try {
    await axios.put(`https://notseek.herokuapp.com/api/items/${userItemId}`, changes)
  } catch (error) {
    console.error(error)
  }
}

// Reducer
const reducer = (state = [], action) => {
  switch (action.type) {
    case SET_SATCHEL:
      return action.satchel
    default:
      return state
  }
}

export default reducer
