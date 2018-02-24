import axios from 'axios'
import reducer, {resetNewWord, createNewWord} from '../newWord'
import { createStore } from 'redux'

let testStore
const testWord = {
  word: 'orange',
  userId: 1,
  latitude: 40.705076,
  longitude: -74.00916,
  score: 1000
}

beforeEach(() => {
  testStore = createStore(reducer)
})

describe('Action creators', () => {
  test('has initial expected state', () => {
    expect(testStore.getState()).toEqual({})
  })

  test('getNewWord puts word onto state', () => {
    testStore.dispatch({ type: 'GET_NEW_WORD', word: testWord })
    expect(testStore.getState()).toBe(testWord)
  })

  test('resetNewWord resets state to intial state', () => {
    testStore.dispatch(resetNewWord())
    expect(testStore.getState()).toEqual({})
  })
})

describe('Thunks', () => {
  // prepare
  const expected = [
    { type: 'GET_NEW_WORD', word: testWord },
    { type: 'RESET_NEW_WORD'}
  ]

  // mock axios methods w/ mocked return values
  axios.post = jest.fn(() => ({ data: testWord }))

  // mock dispatch functions from redux-thunk
  const dispatch = jest.fn()

  test('createNewWord called with correct action creator', async () => {
    await createNewWord()(dispatch)
    expect(dispatch.mock.calls[0][0]).toEqual(expected[0])
  })
})
