/**
 * define SPA routing
 * @file
 */

import React from 'react'
import { Route, Router } from 'react-router-dom'
import history from 'src/libs/history'

import CommonMenu from 'src/components/layouts/common-menu'
import Home from './home'
import Profile from './profile'
import Login from './login'
import Callback from './callback'
import Logout from './logout'
import Traffic from './traffic'
import Maps from './maps'
import Map from './map'
import Group from './group'
import Groups from './groups'
import Information from './information'

const routeConfig = [
  { path: '/', exact: true, Content: Home },
  { path: '/profile', exact: true, Content: Profile },
  // for login/logout
  { path: '/login', exact: true, Content: Login },
  { path: '/callback', exact: true, Content: Callback },
  { path: '/logout', exact: true, Content: Logout },

  // menu
  { path: '/traffic/:year/:month', exact: true, Content: Traffic },
  { path: '/maps', exact: true, Content: Maps },
  { path: '/maps/:mapId', exact: true, Content: Map },
  { path: '/groups', exact: true, Content: Groups },
  { path: '/groups/:groupId', exact: true, Content: Group },
  { path: '/information', exact: true, Content: Information },
]

export const Routes = () => {
  return (
    <Router history={history}>
      <CommonMenu>
        {routeConfig.map(({ path, exact, Content }) => (
          <Route
            key={`routing-${path}`}
            path={`${process.env.PUBLIC_URL}${path}`}
            exact={exact}
            render={({ match: { params } }) => <Content routeParams={params} />}
          />
        ))}
      </CommonMenu>
    </Router>
  )
}

export default Routes
