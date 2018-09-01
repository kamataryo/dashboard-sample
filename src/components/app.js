import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Routes from './routes'
import store from '../store'

// material-ui suitable font
import 'typeface-roboto'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    )
  }
}

export default App
