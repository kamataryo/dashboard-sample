import React from 'react'
import { connect } from 'react-redux'
// import PropTypes from 'prop-types'

import Input from './partials/input'

import auth0 from 'auth0-js'

export class Profile extends React.Component {
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
    // this.props.auth
    //   .getProfile()
    //   .then(profile => this.setState({ ...this.state, profile }))
    //   .catch(console.error)
  }

  createProfileUpdateHandler = key => value =>
    this.setState({
      ...this.state,
      profile: { ...this.state.profile, [key]: value },
    })

  createUpdateMetadataHandler = kv => () => {
    console.log('metadata: ' + JSON.stringify(kv))
    const auth0Manage = new auth0.Management({
      domain: 'kamataryo-sandbox.auth0.com',
      token: localStorage.getItem('access_token'),
    })
    auth0Manage.patchUserMetadata(this.state.profile.sub, {}, console.log)
  }

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    console.log(this.state.profile)
    const {
      profile: { sub, nickname, name, picture },
    } = this.state
    // const { auth } = this.props
    return (
      <div>
        <h1>{'Profile'}</h1>
        <p>{'sub: ' + (sub || '')}</p>
        <img src={ picture } alt="" />
        <p>
          <Input
            label={ 'nickname' }
            onChange={ this.createProfileUpdateHandler('nickname') }
            value={ nickname }
          />
          <button onClick={ this.createUpdateMetadataHandler({ nickname }) }>
            {'send'}
          </button>
        </p>
        <p>
          <Input
            label={ 'name' }
            onChange={ this.createProfileUpdateHandler('name') }
            value={ name }
          />
        </p>
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
export default connect(mapStateToProps)(Profile)
