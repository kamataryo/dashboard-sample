import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createActions as createAuthActions } from 'src/reducers/auth'

export class LogoutRoute extends React.Component {
  /**
   * propTypes
   * @type {object}
   */
  static propTypes = {
    logout: PropTypes.func.isRequired,
  }

  /**
   * componentDidMount
   * @return {void}
   */
  componentDidMount() {
    this.props.logout()
  }

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    return 'Logging Out...'
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
    logout: () => dispatch(createAuthActions.logout()),
  }
}

export default connect(
  void 0,
  mapDispatchToProps,
)(LogoutRoute)
