import axios from 'axios'

// Action Type
const SET_SATCHEL = 'SET_SATCHEL'
const UPDATE_LETTER = 'UPDATE_LETTER'

// Action Creators
const setSatchel = satchel => ({ type: SET_SATCHEL, satchel })

// Thunks
export const getSatchel = (userId) => async dispatch => {
  try {
    const res = await axios.get(`https://notseek.herokuapp.com/api/users/${userId}/letters`, {
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

export const updateLetter = (userLetterId, changes) => async dispatch => {
  try {
    await axios.put(`https://notseek.herokuapp.com/api/Letters/${userLetterId}`, changes)
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
