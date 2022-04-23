import deepFreeze from 'deep-freeze'
import anecdoteReducer from './anecdoteReducer'

describe('#anecdoteReducer', () => {
  test('returns new state with action type "VOTE"', () => {
    const action = {
      type: 'VOTE',
      data: {
        id: 2
      }
    }

    const state = [
      {
        content: 'anecdote 1',
        id: 1,
        votes: 0
      },
      {
        content: 'anecdote 2',
        id: 2,
        votes: 0
      }
    ]

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)

    expect(newState).toContainEqual(state[0])
    expect(newState).toContainEqual({
      ...state[1], votes: 1
    })
  })
})