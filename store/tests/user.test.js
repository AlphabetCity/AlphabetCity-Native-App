import axios from 'axios'
import reducer, { createUser, getUser, deleteUser, updateUser } from '../user'
import { createStore } from 'redux'

let testStore
const testUser = []
const testUserId = 1
const testChanges = { username: 'JoshLuria' }

beforeEach(() => {
  testStore = createStore(reducer)
})

describe('Action creators', () => {
  test('has initial expected state', () => {
    expect(testStore.getState()).toEqual({})
  })

  test('signupUser puts user onto the store', () => {
    testStore.dispatch({ type: 'SIGNUP_USER', user: testUser })
    expect(testStore.getState()).toBe(testUser)
  })

  test('loginUser puts user onto the store', () => {
    testStore.dispatch({ type: 'SIGNUP_USER', user: testUser })
    expect(testStore.getState()).toBe(testUser)
  })

  test('editUser puts user onto the store', () => {
    testStore.dispatch({ type: 'SIGNUP_USER', user: testUser })
    expect(testStore.getState()).toBe(testUser)
  })

  test('removeUser removes user onto the store', () => {
    testStore.dispatch({ type: 'SIGNUP_USER', user: {} })
    expect(testStore.getState()).toEqual({})
  })
})

describe('Thunks', () => {
  // prepare
  const expected = [
    { type: 'SIGNUP_USER', user: testUser },
    { type: 'LOGIN_USER', user: testUser },
    { type: 'EDIT_USER', user: testUser },
    { type: 'REMOVE_USER' }
  ]

  // mock axios methods w/ mocked return values
  axios.post = jest.fn(() => ({ data: testUser }))
  axios.put = jest.fn(() => ({ data: testUser }))
  axios.delete = jest.fn()

  // mock dispatch functions from redux-thunk
  const dispatch = jest.fn()

  test('createUser called with correct action creator', async () => {
    await createUser(testUser)(dispatch)
    expect(dispatch.mock.calls[0][0]).toEqual(expected[0])
  })

  test('getUser called with correct action creator', async () => {
    await getUser(testUser)(dispatch)
    expect(dispatch.mock.calls[1][0]).toEqual(expected[1])
  })

  test('updateUser called with correct action creator', async () => {
    await updateUser(testUserId, testChanges)(dispatch)
    expect(dispatch.mock.calls[2][0]).toEqual(expected[2])
  })

  test('deleteUser called with correct action creator', async () => {
    await deleteUser(testUserId)(dispatch)
    expect(dispatch.mock.calls[3][0]).toEqual(expected[3])
  })
})
