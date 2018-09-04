import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import MapboxGLMap from './partials/mapbox-gl-map'
import UrlList from './partials/url-list'
import Tokens from './partials/tokens'
import Button from '@material-ui/core/Button'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'

import { createActions as createMapsActions } from 'src/reducers/maps'
import history from 'src/libs/history'

const getToken = () =>
  'SAMPLE-' +
  [
    Math.floor(Math.random() * 256 * 256).toString(16),
    Math.floor(Math.random() * 256 * 256).toString(16),
    Math.floor(Math.random() * 256 * 256).toString(16),
    Math.floor(Math.random() * 256 * 256).toString(16),
  ].join('-')

export class Map extends React.Component {
  state = {
    apiKey: getToken(),
  }

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
    history.refinedPush('/maps')
    deleteMap(mapIndex)
  }

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    const { apiKey } = this.state
    const {
      routeParams: { mapId },
      style,
      maps,
    } = this.props

    const map = maps.find(map => map.id === mapId)

    // TODO: check if Browser can use File API
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
          <a
            style={{ textDecoration: 'none' }}
            href={window.URL.createObjectURL(
              new Blob([JSON.stringify(style)], { type: 'application/json' }),
            )}
            download={'style.json'}
          >
            <Button variant="contained" color="default">
              {'Download Style'}
              <CloudDownloadIcon style={{ marginLeft: 8 }} />
            </Button>
          </a>

          <label htmlFor="upload-button">
            <Button
              variant="contained"
              color="default"
              onClick={() => this.InputUpload.click()}
            >
              {'Upload Style'}
              <CloudUploadIcon style={{ marginLeft: 8 }} />
            </Button>
            <input
              ref={ref => (this.InputUpload = ref)}
              style={{ display: 'none' }}
              id={'upload-button'}
              type="file"
              onChange={e => {
                const fileReader = new FileReader()
                fileReader.readAsDataURL(e.target.files[0])

                fileReader.onload = () => {
                  const style = JSON.parse(
                    atob(fileReader.result.split(',')[1]),
                  )
                  const mapIndex = maps.map(map => map.id).indexOf(mapId)
                  this.props.updateMapStyle(mapIndex, style)
                }
              }}
            />
          </label>
        </p>

        <div>
          <UrlList />
        </div>

        <p>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => this.setState({ apiKey: getToken() })}
          >
            {'refresh token'}
          </Button>
        </p>

        <div>
          <Tokens value={apiKey} />
        </div>

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
  updateMapStyle: PropTypes.func.isRequired,
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
    updateMapStyle: (index, style) =>
      dispatch(createMapsActions.updateMap(index, { style })),
    deleteMap: index => dispatch(createMapsActions.deleteMap(index)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map)
