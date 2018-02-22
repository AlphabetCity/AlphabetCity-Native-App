import axios from 'axios'
import reducer, {getAllHiddenLetters} from '../allHiddenLetters'
import { createStore } from 'redux'

let testStore
beforeEach(() => {
  testStore = createStore(reducer)
})

describe('Action creators', () => {
  test('has initial expected state', () => {
    expect(testStore.getState()).toEqual([])
  })

  test('setHiddenLetters places a letter on the store', () => {
    let testLetters = [
      {
        hidden: false,
        id: 35,
        latitude: null,
        longitude: null,
        createdAt: '2018-02-11T05:12:04.005Z',
        updatedAt: '2018-02-11T05:12:04.005Z',
        letterCategoryId: 23,
        userId: 5,
        letterCategory: {
          id: 23,
          name: 'W',
          points: 4,
          modelUrl: null,
          emoji: null,
          createdAt: '2018-02-11T05:12:03.744Z',
          updatedAt: '2018-02-11T05:12:03.744Z'
        }
        },
        {
        hidden: false,
        id: 36,
        latitude: null,
        longitude: null,
        createdAt: '2018-02-11T05:12:04.072Z',
        updatedAt: '2018-02-11T05:12:04.072Z',
        letterCategoryId: 5,
        userId: 6,
        letterCategory: {
          id: 5,
          name: 'E',
          points: 1,
          modelUrl: null,
          emoji: null,
          createdAt: '2018-02-11T05:12:03.730Z',
          updatedAt: '2018-02-11T05:12:03.730Z'
        }
        },
        {
        hidden: false,
        id: 37,
        latitude: null,
        longitude: null,
        createdAt: '2018-02-11T05:12:04.072Z',
        updatedAt: '2018-02-11T05:12:04.072Z',
        letterCategoryId: 9,
        userId: 6,
        letterCategory: {
          id: 9,
          name: 'H',
          points: 4,
          modelUrl: null,
          emoji: null,
          createdAt: '2018-02-11T05:12:03.736Z',
          updatedAt: '2018-02-11T05:12:03.736Z'
        }
        }
    ]
    testStore.dispatch({ type: 'SET_HIDDEN_LETTERS', allHiddenLetters: testLetters})
    expect(testStore.getState()).toBe(testLetters)
  })
})

describe('Thunks', () => {
  // prepare
  const expected = [{ type: 'SET_HIDDEN_LETTERS' }]

  // mock axios methods w/ mocked return values
  axios.get = jest.fn(() => ({letter: 'A'}))

  // mock dispatch functions from redux-thunk
  const dispatch = jest.fn()

  test('getAllHiddenLetters called with correct action creator', async () => {
    await getAllHiddenLetters()(dispatch)
    expect(dispatch.mock.calls[0][0]).toEqual(expected[0])
  })
})
