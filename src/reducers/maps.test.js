import { createActions, Actions, reducer } from './maps'

describe('action creators', () => {
  it('add map action', () => {
    const action = createActions.addMap({ id: 'id-1', name: 'map1' })
    expect(action.type).toEqual(Actions.ADD_MAP)
  })

  it('update map action', () => {
    const action = createActions.updateMap(1, {
      map: { name: 'aaa' },
      style: { props: 'value' },
    })
    expect(action.type).toEqual(Actions.UPDATE_MAP)
    expect(action.payload.map.name).toEqual('aaa')
    expect(action.payload.style.props).toEqual('value')
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

  it('update map action', () => {
    const action = createActions.updateMap(1, {
      map: { name: 'name2-fixed' },
      style: { some: 'value' },
    })
    const nextState = reducer(prevState, action)
    expect(nextState.data[1].name).toEqual('name2-fixed')
    expect(nextState.styles['id-2'].some).toEqual('value')
  })

  it('delete map action', () => {
    const action = createActions.deleteMap(0)
    const nextState = reducer(prevState, action)
    expect(nextState.data.length).toEqual(1)
  })
})
