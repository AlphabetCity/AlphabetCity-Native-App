import axios from 'axios'
import API_URL from '../utils/apiUrl'

// Action Type
const GET_USER_WORDS = 'GET_USER_WORDS'

// Action Creators
const getUserWords = words => ({ type: GET_USER_WORDS, words })

// Thunks
export const loadUserWords = userId => async dispatch => {
  try {
    const res = await axios.get(
      `${API_URL}/api/users/${userId}/words`
    )
    const words = res.data
    dispatch(getUserWords(words))
  } catch (error) {
    console.error(error)
  }
}

// Reducer
const reducer = (state = [], action) => {
  switch (action.type) {
    case GET_USER_WORDS:
      return action.words
    default:
      return state
  }
}

export default reducer
