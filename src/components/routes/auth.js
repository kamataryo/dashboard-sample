import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Auth from '../../libs/auth'

export class AuthRoute extends React.Component {
  /**
   * propTypes
   * @type {object}
   */
  static propTypes = {
    auth: PropTypes.instanceOf(Auth).isRequired
  }

  /**
   * componentDidMount
   * @return {void}
   */
  componentDidMount() {
    const { auth } = this.props
    console.log('login')
    auth.login()
  }

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    console.log('auth')
    return null
  }
}

/**
 * map state to props
 * @param  {object} state    state tree
 * @param  {object} ownProps own props
 * @return {object}          state props
 */
const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth.driver
  }
}

export default connect(mapStateToProps)(AuthRoute)
