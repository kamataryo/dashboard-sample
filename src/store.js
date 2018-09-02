import { createStore, combineReducers, applyMiddleware } from 'redux'

/**
 * Reducers
 */
import authReducer from './reducers/auth'
import menuReducer from './reducers/menu'

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
    auth: authReducer,
    menu: menuReducer,
  }),
  applyMiddleware(...middlewares),
)

export default store
