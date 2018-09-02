import { Actions as AuthActions } from 'src/reducers/auth'
import Auth from './libs/auth'

const auth = new Auth()

export const middleware = () => next => action => {
  next(action)

  const { type } = action
  if (type === AuthActions.LOGIN) {
    auth.login()
  } else if (type === AuthActions.HANDLE_AUTHENTICATION) {
    auth.handleAuthentication()
  } else if (type === AuthActions.LOGOUT) {
    auth.logout()
  }
}

export default middleware
