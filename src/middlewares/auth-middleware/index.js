import { Actions as AuthActions } from 'src/reducers/auth'
import Auth from './libs/auth'
import { createActions as createAuthActions } from 'src/reducers/auth'

const auth = new Auth()

export const middleware = store => next => action => {
  next(action)

  const { type } = action
  if (type === AuthActions.LOGIN) {
    auth.login()
  } else if (type === AuthActions.HANDLE_AUTHENTICATION) {
    auth.handleAuthentication(tokens =>
      store.dispatch(createAuthActions.setTokens(tokens)),
    )
  } else if (type === AuthActions.LOGOUT) {
    auth.logout()
  }
}

export default middleware
