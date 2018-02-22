import axios from 'axios'
import reducer, { loadHighscores } from '../highscores'
import { createStore } from 'redux'

let testStore
beforeEach(() => {
  testStore = createStore(reducer)
})

describe('Action creators', () => {
  test('has initial expected state', () => {
    expect(testStore.getState()).toEqual([])
  })

  test('getHighscores puts words on the store', () => {
    let testHighscores = {
      id: 10,
      userName: 'JoshLuria',
      score: 9549,
      createdAt: '2018-02-11T05:12:03.927Z',
      updatedAt: '2018-02-11T05:12:03.927Z'
    }
    testStore.dispatch({ type: 'GET_HIGHSCORES', highscores: testHighscores })
    expect(testStore.getState()).toBe(testHighscores)
  })
})

describe('Thunks', () => {
  // prepare
  const expected = [{ type: 'GET_HIGHSCORES' }]

  // mock axios methods w/ mocked return values
  axios.get = jest.fn(() => ({userName: 'JoshLuria'}))

  // mock dispatch functions from redux-thunk
  const dispatch = jest.fn()

  test('getWords called with correct action creator', async () => {
    await loadHighscores()(dispatch)
    expect(dispatch.mock.calls[0][0]).toEqual(expected[0])
  })
})
