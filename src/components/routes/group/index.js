import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'

export class Group extends React.Component {
  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    const {
      routeParams: { groupId },
      groups,
    } = this.props

    const map = groups.find(map => map.id === groupId)

    return (
      <div>
        <Typography variant="headline" component="h2">
          {map.name}
        </Typography>

        <Typography
          color="textSecondary"
          component="p"
          style={{ marginBottom: 10 }}
        >
          {map.description || '(no description)'}
        </Typography>
      </div>
    )
  }
}

Group.propTypes = {
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
    }),
  ).isRequired,
  routeParams: PropTypes.shape({ groupId: PropTypes.string.isRequired })
    .isRequired,
}

/**
 * map state to props
 * @param  {object} state    state tree
 * @param  {object} ownProps own props
 * @return {object}          state props
 */
const mapStateToProps = state => {
  return {
    groups: state.groups.data,
  }
}

export default connect(mapStateToProps)(Group)
