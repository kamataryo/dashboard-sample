import { createActions, Actions, reducer } from './groups'

describe('action creators', () => {
  it('add group action', () => {
    const action = createActions.addGroup({ id: 'id-1', name: 'group1' })
    expect(action.type).toEqual(Actions.ADD_GROUP)
  })

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

  it('add group action', () => {
    const action = createActions.addGroup({ id: 'id-3', name: 'name3' })
    const nextState = reducer(prevState, action)
    expect(nextState.data.length).toEqual(3)
  })

  it('delete group action', () => {
    const action = createActions.deleteGroup(0)
    const nextState = reducer(prevState, action)
    expect(nextState.data.length).toEqual(1)
  })
})
