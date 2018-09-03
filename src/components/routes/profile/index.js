import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { createActions as createProfileAction } from 'src/reducers/profile'
import Input from './partials/input'
import Button from '@material-ui/core/Button'

export class Profile extends React.Component {
  /**
   * propTypes
   * @type {object}
   */
  static propTypes = {
    // stateProps
    accessToken: PropTypes.string.isRequired,
    profile: PropTypes.shape({
      sub: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      nickname: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired,
    }).isRequired,
    // dispatchProps
    updateProfile: PropTypes.func.isRequired,
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
    this.props.updateProfile({ [key]: value })

  // TODO: request fails
  createUpdateMetadataHandler = kv => () => {
    // const { accessToken } = this.props
    console.log('metadata: ' + JSON.stringify(kv))
    // call API here
    // patchUserMetadata(this.props.profile.sub, kv, console.log)
  }

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    const {
      profile: { sub, nickname, name, picture },
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
            label={'nickname'}
            onChange={this.createProfileUpdateHandler('nickname')}
            value={nickname}
            style={{ flexGrow: 1 }}
          />
          <Button
            variant={'text'}
            color={'default'}
            onClick={this.createUpdateMetadataHandler({ nickname })}
          >
            {'send'}
          </Button>
        </div>
        <div style={{ display: 'flex' }}>
          <Input
            label={'name'}
            onChange={this.createProfileUpdateHandler('name')}
            value={name}
            style={{ flexGrow: 1 }}
          />{' '}
          <Button
            variant={'text'}
            color={'default'}
            onClick={this.createUpdateMetadataHandler({ name })}
          >
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
    accessToken: state.auth.accessToken,
    profile: state.profile,
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
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile)
