import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createActions as createAuthActions } from 'src/reducers/auth'

export class LoginRoute extends React.Component {
  /**
   * propTypes
   * @type {object}
   */
  static propTypes = {
    login: PropTypes.func.isRequired,
  }

  /**
   * componentDidMount
   * @return {void}
   */
  componentDidMount() {
    this.props.login()
  }

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    return 'Logging In...'
  }
}

/**
 * map dispatch to props
 * @param  {function} dispatch dispatcher
 * @param  {object}   ownProps own props
 * @return {object}            dispatch props
 */
const mapDispatchToProps = dispatch => {
  return {
    login: () => dispatch(createAuthActions.login()),
  }
}

export default connect(
  void 0,
  mapDispatchToProps,
)(LoginRoute)
