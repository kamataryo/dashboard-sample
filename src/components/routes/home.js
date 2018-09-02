import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Auth from 'src/libs/auth'

export class Home extends React.Component {
  static propTypes = {
    auth: PropTypes.instanceOf(Auth).isRequired,
  }

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    // const { auth } = this.props
    return (
      <div>
        <h1>home</h1>
      </div>
    )
  }
}

/**
 * map state to props
 * @param  {object} state    state tree
 * @param  {object} ownProps own props
 * @return {object}          state props
 */
const mapStateToProps = state => {
  return {
    auth: state.auth.driver,
  }
}
export default connect(mapStateToProps)(Home)
