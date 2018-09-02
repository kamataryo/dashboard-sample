import React from 'react'
import PropTypes from 'prop-types'
import MapCard from './partials/map-card'
import { connect } from 'react-redux'

export class Traffic extends React.Component {
  /**
   * propTypes
   * @type {object}
   */
  static propTypes = {
    maps: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    const { maps } = this.props

    return (
      <div>
        <h1>Traffic</h1>
        {maps.map(map => (
          <MapCard key={ `traffic-for-map-${map.id}` } map={ map } />
        ))}
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
    maps: state.maps.data,
  }
}

export default connect(mapStateToProps)(Traffic)
