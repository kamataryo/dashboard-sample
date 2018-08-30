import React from 'react'
import { Route, Router } from 'react-router-dom'
import history from '../../libs/history'
import Auth from './auth'
import Home from './home'
import Profile from './profile'
import Callback from './callback'

export const Routes = () => {
  return (
    <Router history={history}>
      <div>
        <Route
          path={`${process.env.PUBLIC_URL}/`}
          render={() => <Auth />}
          exact
        />
        <Route
          path={`${process.env.PUBLIC_URL}/home`}
          render={() => <Home />}
          exact
        />
        <Route
          path={`${process.env.PUBLIC_URL}/profile`}
          render={() => <Profile />}
          exact
        />
        <Route
          path={`${process.env.PUBLIC_URL}/callback`}
          render={() => <Callback />}
          exact
        />
      </div>
    </Router>
  )
}

export default Routes
