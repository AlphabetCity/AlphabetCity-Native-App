import axios from 'axios'

// Action Type
const SET_SATCHEL = 'SET_SATCHEL'
const UPDATE_LETTER = 'UPDATE_LETTER'

// Action Creators
const setSatchel = satchel => ({ type: SET_SATCHEL, satchel })
const updateSatchel = letter => ({ type: UPDATE_LETTER, letter })

// Thunks
export const getSatchel = userId => async dispatch => {
  try {
    const res = await axios.get(
      `https://alphabetcity.herokuapp.com/api/users/${userId}/letters`,
      {
        params: {
          hidden: 'false'
        }
      }
    )
    const satchel = res.data
    console.log('satchel', satchel)
    dispatch(setSatchel(satchel))
  } catch (error) {
    console.error(error)
  }
}

// `https://alphabetcity.herokuapp.com/api/Letters/${userLetterId}`
// `http://192.168.1.152:8080/api/Letters/${userLetterId}`
// export const updateLetter = (userLetterId, changes) => async dispatch => {
//   try {
//     await axios.put(`https://alphabetcity.herokuapp.com/api/Letters/${userLetterId}`, changes)
//   } catch (error) {
//     console.error(error)
//   }
// }

export const updateLetter = (userLetterId, changes) => async dispatch => {
  try {
    const res = await axios.put(
      `https://alphabetcity.herokuapp.com/api/Letters/${userLetterId}`,
      changes
    )
    console.log('updateLetter res', res.data)
    dispatch(updateSatchel(res.data))
  } catch (error) {
    console.error(error)
  }
}

// Reducer
const reducer = (state = [], action) => {
  switch (action.type) {
    case SET_SATCHEL:
      return action.satchel
    case UPDATE_LETTER:
      return [
        ...state.filter(letter => letter.id !== action.letter.id),
        action.letter
      ]
    default:
      return state
  }
}

export default reducer
