import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import MapboxGLMap from './partials/mapbox-gl-map'
import UrlList from './partials/url-list'
import Button from '@material-ui/core/Button'

import { createActions as createMapsActions } from 'src/reducers/maps'
import history from 'src/libs/history'

export class Map extends React.Component {
  /**
   * delete button handler
   * @return {void}
   */
  onDeleteClick = () => {
    const {
      routeParams: { mapId },
      maps,
      deleteMap,
    } = this.props
    const mapIndex = maps.map(map => map.id).indexOf(mapId)
    history.push(`${process.env.PUBLIC_URL}/maps`)
    deleteMap(mapIndex)
  }

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    const {
      routeParams: { mapId },
      style,
      maps,
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
          style={{ marginBottom: 10 }}
        >
          {map.description || '(no description)'}
        </Typography>

        <MapboxGLMap style={style} />

        <p>
          <UrlList />
        </p>

        <p>
          <Button
            variant="contained"
            color="secondary"
            onClick={this.onDeleteClick}
          >
            {'delete this map'}
          </Button>
        </p>
      </div>
    )
  }
}

Map.propTypes = {
  maps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
    }),
  ).isRequired,
  style: PropTypes.object.isRequired,
  routeParams: PropTypes.shape({ mapId: PropTypes.string.isRequired })
    .isRequired,
  deleteMap: PropTypes.func.isRequired,
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
    maps: state.maps.data,
    style: state.maps.styles[mapId],
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
    deleteMap: index => dispatch(createMapsActions.deleteMap(index)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map)
