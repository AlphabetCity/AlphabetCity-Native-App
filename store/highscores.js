import axios from 'axios'
import API_URL from '../utils/apiUrl'

// Action Type
const GET_HIGHSCORES = 'GET_HIGHSCORES'

// Action Creators
const getHighscores = highscores => ({ type: GET_HIGHSCORES, highscores })

// Thunks
export const loadHighscores = () => async dispatch => {
  try {
    const res = await axios.get(`${API_URL}/api/users?limit=10`)
    const highscores = res.data
    dispatch(getHighscores(highscores))
  } catch (error) {
    console.error(error)
  }
}

// Reducer
const reducer = (state = [], action) => {
  switch (action.type) {
    case GET_HIGHSCORES:
      return action.highscores
    default:
      return state
  }
}

export default reducer
