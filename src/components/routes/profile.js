import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Auth from '../../libs/auth'

import Header from '../layouts/header'

export class Profile extends React.Component {
  static propTypes = {
    auth: PropTypes.instanceOf(Auth).isRequired
  }

  /**
   * constructor
   * @param  {object} props React props.
   * @return {void}
   */
  constructor(props) {
    super(props)
    this.state = { profile: {} }
  }

  /**
   * componentDidMount
   * @return {void}
   */
  componentDidMount() {
    this.props.auth
      .getProfile()
      .then(profile => this.setState({ ...this.state, profile }))
      .catch(console.error)
  }

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    const { profile } = this.state
    // const { auth } = this.props
    return (
      <div>
        <h1>{'Profile'}</h1>
        <Header />
        {JSON.stringify(profile)}
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
const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth.driver
  }
}
export default connect(mapStateToProps)(Profile)
