import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import maps from 'src/samples/maps'
import Typography from '@material-ui/core/Typography'
import MapboxGLMap from './partials/mapbox-gl-map'
import UrlList from './partials/url-list'

export class Map extends React.Component {
  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    const {
      routeParams: { mapId },
      style,
    } = this.props
    const map = maps.find(map => map.id === mapId)

    return (
      <div>
        <Typography variant="headline" component="h2">
          {map.name}
        </Typography>

        <Typography
          color="textSecondary"
          component="p"
          style={ { marginBottom: 10 } }
        >
          {map.description || '(no description)'}
        </Typography>

        <MapboxGLMap style={ style } />

        <UrlList />
      </div>
    )
  }
}

Map.propTypes = {
  style: PropTypes.object.isRequired,
  routeParams: PropTypes.shape({ mapId: PropTypes.string.isRequired })
    .isRequired,
}

/**
 * map state to props
 * @param  {object} state    state tree
 * @param  {object} ownProps own props
 * @return {object}          state props
 */
const mapStateToProps = (state, ownProps) => {
  const {
    routeParams: { mapId },
  } = ownProps

  return {
    style: state.maps.styles[mapId],
  }
}

export default connect(mapStateToProps)(Map)
