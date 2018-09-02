import update from 'immutability-helper'

const initialAuthState = {
  accessToken: '',
  idToken: '',
  expiresAt: 0,
}

const LOGIN = 'AUTH.LOGIN'
const HANDLE_AUTHENTICATION = 'AUTH.HANDLE_AUTHENTICATION'
const LOGOUT = 'AUTH.LOGOUT'
const SET_TOKENS = 'AUTH.SET_TOKENS'

export const Actions = {
  LOGIN,
  HANDLE_AUTHENTICATION,
  LOGOUT,
  SET_TOKENS,
}

export const createActions = {
  login: () => ({ type: LOGIN, payload: {} }),
  handleAuthentication: () => ({ type: HANDLE_AUTHENTICATION, payload: {} }),
  logout: () => ({ type: LOGOUT, payload: {} }),
  setTokens: ({ accessToken, idToken, expiresAt }) => ({
    type: SET_TOKENS,
    payload: {
      accessToken,
      idToken,
      expiresAt,
    },
  }),
}

const reducer = (state = initialAuthState, action) => {
  const { type } = action

  if (type === LOGIN) {
    // NOTE: has side effects
    return state
  } else if (type === HANDLE_AUTHENTICATION) {
    // NOTE: has side effects
    return state
  } else if (type === LOGOUT) {
    // NOTE: has side effects
    return state
  } else if (type === SET_TOKENS) {
    const { accessToken, idToken, expiresAt } = action.payload
    return update(state, {
      accessToken: { $set: accessToken },
      idToken: { $set: idToken },
      expiresAt: { $set: expiresAt },
    })
  } else {
    return state
  }
}

export default reducer
