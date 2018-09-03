import { createActions, Actions, reducer } from './groups'

describe('action creators', () => {
  it('delete group action', () => {
    const action = createActions.deleteGroup(1)
    expect(action.type).toEqual(Actions.DELETE_GROUP)
    expect(action.payload.index).toEqual(1)
  })
})

describe('reducers', () => {
  const prevState = {
    data: [{ id: 'id-1', name: 'name1' }, { id: 'id-2', name: 'name2' }],
  }

  it('delete group action', () => {
    const action = createActions.deleteGroup(0)
    const nextState = reducer(prevState, action)
    expect(nextState.data.length).toEqual(1)
  })
})
