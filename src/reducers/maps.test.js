import { createActions, Actions, reducer } from './maps'

describe('action creators', () => {
  it('add map action', () => {
    const action = createActions.addMap({ id: 'id-1', name: 'map1' })
    expect(action.type).toEqual(Actions.ADD_MAP)
  })

  it('delete map action', () => {
    const action = createActions.deleteMap(1)
    expect(action.type).toEqual(Actions.DELETE_MAP)
    expect(action.payload.index).toEqual(1)
  })
})

describe('reducers', () => {
  const prevState = {
    data: [{ id: 'id-1', name: 'name1' }, { id: 'id-2', name: 'name2' }],
    styles: {
      'id-1': {},
      'id-2': {},
    },
  }

  it('add map action', () => {
    const action = createActions.addMap({ id: 'id-3', name: 'name3' })
    const nextState = reducer(prevState, action)
    expect(nextState.data.length).toEqual(3)
    expect(nextState.styles['id-3']).not.toEqual(void 0)
  })

  it('delete map action', () => {
    const action = createActions.deleteMap(0)
    const nextState = reducer(prevState, action)
    expect(nextState.data.length).toEqual(1)
  })
})
