import { auth0 as auth0Config } from 'src/config'

const driver = new Auth()

export default store => next => action => {
  next(action)
}
