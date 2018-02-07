import axios from 'axios'

// Action Type
const SET_WORDS = 'SET_WORD'
const ADD_WORD = 'ADD_WORD'

// Action Creators
const setWords = words => ({ type: SET_WORDS, words })
const setWord = word => ({ type: ADD_WORD, word })

// Thunks
export const getWords = () => async dispatch => {
  try {
    console.log('get Words ran')
    const res = await axios.get('https://alphabetcity.herokuapp.com/api/words')
    const words = await res.data
    console.log('words', words)
    dispatch(setWords(words))
  } catch (error) {
    console.error(error)
  }
}

export const addWord = () => async dispatch => {
  try {
    const res = await axios.post('https://alphabetcity.herokuapp.com/api/words')
    const word = await res.data
    dispatch(setWord(word))
  } catch (error) {
    console.error(error)
  }
}


// Reducer
const reducer = (state = [], action) => {
  switch (action.type) {
    case SET_WORDS:
      return action.words
    case ADD_WORD:
      return [...state, action.word]
    default:
      return state
  }
}

export default reducer