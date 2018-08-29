import React from 'react'
import { Route, Router } from 'react-router-dom'
import history from '../../libs/history'
import Auth from './auth'
import Home from './home'
import Callback from './callback'

export const Routes = () => {
  return (
    <Router history={history}>
      <div>
        <Route path={'/'} render={() => <Auth />} exact />
        <Route path={'/home'} render={() => <Home />} exact />
        <Route path={'/callback'} render={() => <Callback />} exact />
      </div>
    </Router>
  )
}

export default Routes
