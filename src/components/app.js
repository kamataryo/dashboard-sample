import React from 'react'
import { Provider } from 'react-redux'
import Routes from 'src/components/routes/index.js'
import store from 'src/store'

// material-ui suitable font
import 'typeface-roboto'

const App = () => (
  <Provider store={ store }>
    <Routes />
  </Provider>
)

export default App
