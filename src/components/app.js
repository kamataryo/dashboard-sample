import React from 'react'
import { Provider } from 'react-redux'
import System from 'src/components/system'
import Routes from 'src/components/routes'
import store from 'src/store'

// material-ui suitable font
import 'typeface-roboto'

export const App = () => (
  <Provider store={store}>
    <div className={'height-filled'}>
      <System.Auth />
      <Routes />
    </div>
  </Provider>
)

export default App
