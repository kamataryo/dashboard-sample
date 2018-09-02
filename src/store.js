import { createStore, combineReducers, applyMiddleware } from 'redux'
import authMiddleware from 'src/middlewares/auth-middleware'

/**
 * Reducers
 */
import authReducer from './reducers/auth'
import menuReducer from './reducers/menu'
import mapsReducer from './reducers/maps'

/**
 * middlewares
 * @type {Array<function>}
 */
const middlewares = [authMiddleware]

/**
 * store
 * @type {object}
 */
const store = createStore(
  combineReducers({
    auth: authReducer,
    menu: menuReducer,
    maps: mapsReducer,
  }),
  applyMiddleware(...middlewares),
)

export default store
