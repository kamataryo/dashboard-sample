import React from 'react'
import PropTypes from 'prop-types'
import MapCard from './partials/map-card'
import { connect } from 'react-redux'

export class Traffic extends React.Component {
  /**
   * constructor
   * @param  {object} props React props.
   * @return {void}
   */
  constructor(props) {
    super(props)
    this.state = {
      showTraffic: true,
      showDisplayTimes: true,
    }
  }

  /**
   * propTypes
   * @type {object}
   */
  static propTypes = {
    maps: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }

  createToggleHandler = key => () =>
    this.setState({ ...this.state, [key]: !this.state[key] })

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    const { showTraffic, showDisplayTimes } = this.state
    const { maps } = this.props

    return (
      <div>
        <h1>Traffic</h1>
        <form>
          <input
            id={ 'toggle-traffic' }
            type={ 'checkbox' }
            checked={ showTraffic }
            onChange={ this.createToggleHandler('showTraffic') }
          />
          <label htmlFor="toggle-traffic">{'Traffic'}</label>
          <input
            id={ 'toggle-display-times' }
            type={ 'checkbox' }
            checked={ showDisplayTimes }
            onChange={ this.createToggleHandler('showDisplayTimes') }
          />
          <label htmlFor="toggle-display-times">{'Display Times'}</label>
        </form>
        {maps.map(map => (
          <MapCard
            key={ `traffic-for-map-${map.id}` }
            map={ map }
            showTraffic={ showTraffic }
            showDisplayTimes={ showDisplayTimes }
          />
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
