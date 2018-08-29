import { createStore, combineReducers, applyMiddleware } from 'redux'

/**
 * Reducers
 */
import authReducer from './reducers/auth'

/**
 * middlewares
 * @type {Array<function>}
 */
const middlewares = []

/**
 * store
 * @type {object}
 */
const store = createStore(
  combineReducers({
    auth: authReducer
  }),
  applyMiddleware(...middlewares)
)

export default store
