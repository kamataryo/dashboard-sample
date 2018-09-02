import React from 'react'
import PropTypes from 'prop-types'
import Link from 'src/components/commons/refined-link'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
})

export class Home extends React.Component {
  /**
   * propTypes
   * @type {object}
   */
  static propTypes = {
    // styleProps
    classes: PropTypes.object.isRequired,
    // stateProps
    isLoggedIn: PropTypes.bool.isRequired,
  }

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    const { classes, isLoggedIn } = this.props

    return (
      <div>
        <h1>home</h1>
        <p>
          {isLoggedIn
            ? 'You have successfully logged in!'
            : 'You have\'nt logged in yet :('}
        </p>

        {isLoggedIn ? (
          <Link to={'/logout'}>
            <Button
              variant={'contained'}
              color={'primary'}
              className={classes.button}
            >
              {'Logout'}
            </Button>
          </Link>
        ) : (
          <Link to={'/login'}>
            <Button
              variant={'contained'}
              color={'primary'}
              className={classes.button}
            >
              {'Login or signup'}
            </Button>
          </Link>
        )}
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
  const { expiresAt } = state.auth
  return {
    isLoggedIn: new Date().getTime() < expiresAt,
  }
}

export default withStyles(styles)(connect(mapStateToProps)(Home))
