import { createStore, combineReducers, applyMiddleware } from 'redux'
import authMiddleware from 'src/middlewares/auth-middleware'

/**
 * Reducers
 */
import authReducer from './reducers/auth'
import groupsReducer from './reducers/groups'
import menuReducer from './reducers/menu'
import mapsReducer from './reducers/maps'
import profileReducer from './reducers/profile'
import userReducer from './reducers/user'

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
    groups: groupsReducer,
    menu: menuReducer,
    maps: mapsReducer,
    profile: profileReducer,
    user: userReducer,
  }),
  applyMiddleware(...middlewares),
)

export default store
