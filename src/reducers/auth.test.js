import { createActions, Actions, reducer } from './auth'

describe('action creators', () => {
  it('login action', () => {
    const action = createActions.login()
    expect(action.type).toEqual(Actions.LOGIN)
  })

  it('handle authentication action', () => {
    const action = createActions.handleAuthentication()
    expect(action.type).toEqual(Actions.HANDLE_AUTHENTICATION)
  })

  it('logout action', () => {
    const action = createActions.logout()
    expect(action.type).toEqual(Actions.LOGOUT)
  })

  it('set tokens action', () => {
    const action = createActions.setTokens({
      accessToken: 'access token',
      idToken: 'id token',
      expiresAt: 12345,
    })
    expect(action.type).toEqual(Actions.SET_TOKENS)
    expect(action.payload.accessToken).toEqual('access token')
    expect(action.payload.idToken).toEqual('id token')
    expect(action.payload.expiresAt).toEqual(12345)
  })
})

describe('reducers', () => {
  const prevState = {
    accessToken: 'access token',
    idToken: 'id token',
    expiresAt: 12345,
  }

  it('login action: not set state', () => {
    const action = createActions.login()
    const nextState = reducer(prevState, action)
    expect(nextState).toEqual(prevState)
  })

  it('handle authentication action: not set state', () => {
    const action = createActions.handleAuthentication()
    const nextState = reducer(prevState, action)
    expect(nextState).toEqual(prevState)
  })

  it('logout action: not set state', () => {
    const action = createActions.logout()
    const nextState = reducer(prevState, action)
    expect(nextState).toEqual(prevState)
  })

  it('set tokens action', () => {
    const action = createActions.setTokens({
      accessToken: 'next access token',
      idToken: 'next id token',
      expiresAt: 67890,
    })
    const nextState = reducer(prevState, action)
    expect(nextState).toEqual({
      accessToken: 'next access token',
      idToken: 'next id token',
      expiresAt: 67890,
    })
  })
})
