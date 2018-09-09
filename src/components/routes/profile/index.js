import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { createActions as createProfileAction } from 'src/reducers/profile'
import { createActions as createUserActions } from 'src/reducers/user'
import { api } from 'src/config'

import Input from './partials/input'
import Button from '@material-ui/core/Button'

export class Profile extends React.Component {
  /**
   * propTypes
   * @type {object}
   */
  static propTypes = {
    // stateProps
    idToken: PropTypes.string.isRequired,
    profile: PropTypes.shape({
      sub: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired,
    }).isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    // dispatchProps
    updateProfile: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired,
  }

  createProfileUpdateHandler = key => value => {
    this.props.updateProfile({ [key]: value })
    this.props.setUser({ ...this.props.user, [key]: value })
  }

  onSendClick = () => {
    const { idToken, user } = this.props

    fetch(`${api.endpoint}/users/${user.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${idToken}`,
        'Content-Type': 'appliation/json',
      },
      body: JSON.stringify(user),
    })
  }

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    const {
      profile: { sub, name, picture },
      user: { name: userName },
    } = this.props
    // const { auth } = this.props
    return (
      <div>
        <h1>{'Profile'}</h1>

        <p>{'sub: ' + (sub || '')}</p>

        <p>
          <img src={picture} alt={name} />
        </p>

        <div style={{ display: 'flex' }}>
          <Input
            label={'name'}
            onChange={this.createProfileUpdateHandler('name')}
            value={userName || name}
            style={{ flexGrow: 1 }}
          />{' '}
          <Button variant={'text'} color={'default'} onClick={this.onSendClick}>
            {'send'}
          </Button>
        </div>
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
    idToken: state.auth.idToken,
    profile: state.profile,
    user: state.user,
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
    updateProfile: profile =>
      dispatch(createProfileAction.updateProfile(profile)),
    setUser: user => dispatch(createUserActions.set(user)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile)
