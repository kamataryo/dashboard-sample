import React from 'react'
import PropTypes from 'prop-types'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

export class MapboxGLMap extends React.Component {
  /**
   * propTypes
   * @type {object}
   */
  static propTypes = {
    style: PropTypes.any.isRequired,
  }

  /**
   * constructor
   * @param  {object} props React props.
   * @return {void}
   */
  constructor(props) {
    super(props)
    this.state = {
      map: void 0,
    }
  }

  /**
   * componentDidMount
   * @return {void}
   */
  componentDidMount() {
    const { style } = this.props
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style,
      localIdeographFontFamily: ['sans-serif'],
      attributionControl: true,
      hash: true,
    })

    // TODO: set viewport change handlers here

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ ...this.state, map })
  }

  /**
   * componentWillReceiveProps
   * @param  {object} nextProps React props.
   * @return {void}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.state.map && this.state.map.setStyle(nextProps.style)
  }

  /**
   * shouldComponentUpdate
   * @param  {object} nextProps next props
   * @param  {object} nextState next state
   * @return {boolean}          should component update
   */
  shouldComponentUpdate() {
    return true
  }

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    return (
      <div
        className={ 'map-container' }
        style={ { width: 500, height: 500 } }
        ref={ el => (this.mapContainer = el) }
      />
    )
  }
}

export default MapboxGLMap
