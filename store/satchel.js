import axios from 'axios'
import API_URL from '../utils/apiUrl'

// Action Type
const SET_SATCHEL = 'SET_SATCHEL'
const ADD_LETTER = 'ADD_LETTER'
const REMOVE_LETTER = 'REMOVE_LETTER'

// Action Creators
const setSatchel = satchel => ({ type: SET_SATCHEL, satchel })
const addLetter = letter => ({ type: ADD_LETTER, letter })
const removeLetter = letter => ({ type: REMOVE_LETTER, letter })

// Thunks
export const getSatchel = userId => async dispatch => {
  try {
    const res = await axios.get(
      `${API_URL}/api/users/${userId}/letters`,
      {
        params: {
          hidden: 'false'
        }
      }
    )
    const satchel = res.data
    dispatch(setSatchel(satchel))
  } catch (error) {
    console.error(error)
  }
}

export const updateLetter = (userLetterId, changes) => async dispatch => {
  try {
    const res = await axios.put(
      `${API_URL}/api/Letters/${userLetterId}`,
      changes
    )
    if (res.data && res.data.latitude && res.data.longitude) {
      dispatch(removeLetter(res.data))
    } else if (res.data) {
      dispatch(addLetter(res.data))
    }
  } catch (error) {
    console.error(error)
  }
}

// Reducer
const reducer = (state = [], action) => {
  switch (action.type) {
    case SET_SATCHEL:
      return action.satchel
    case ADD_LETTER:
      return [...state, action.letter]
    case REMOVE_LETTER:
      return [...state.filter(letter => letter.id !== action.letter.id)]
    default:
      return state
  }
}

export default reducer
