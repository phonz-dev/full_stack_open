import deepFreeze from 'deep-freeze'
import anecdoteReducer from './anecdoteReducer'

describe('#anecdoteReducer', () => {
  let state
  beforeEach(() => {
    state = [
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
  })

  test('returns new state with action type "VOTE"', () => {
    const action = {
      type: 'VOTE',
      data: {
        id: 2
      }
    }

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)

    expect(newState).toContainEqual(state[0])
    expect(newState).toContainEqual({
      ...state[1], votes: 1
    })
  })

  test('returns new state with action type "NEW_ANECDOTE"', () => {
    const action = {
      type: 'NEW_ANECDOTE',
      data: {
        content: 'anecdote 3',
        id: 3,
        votes: 0
      }
    }

    expect(state).toHaveLength(2)

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)

    expect(newState).toHaveLength(3)

    state.forEach(anecdote => 
        expect(newState).toContainEqual(anecdote)
      )

    expect(newState).toContainEqual(action.data)
  })
})