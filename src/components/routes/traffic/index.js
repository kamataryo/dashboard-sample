import React from 'react'
import PropTypes from 'prop-types'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Checkbox from '@material-ui/core/Checkbox'
import MapCard from './partials/map-card'
import { connect } from 'react-redux'
import history from 'src/libs/history'

export class Traffic extends React.Component {
  /**
   * propTypes
   * @type {object}
   */
  static propTypes = {
    routeParams: PropTypes.shape({
      year: PropTypes.string.isRequired,
      month: PropTypes.string.isRequired,
    }).isRequired,
    maps: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }

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
      isCumulative: false,
      selectedYear: parseInt(props.routeParams.year, 10),
      selectedMonth: parseInt(props.routeParams.month, 10),
    }
  }

  createToggleHandler = key => () =>
    this.setState({ ...this.state, [key]: !this.state[key] })

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    const {
      showTraffic,
      showDisplayTimes,
      isCumulative,
      selectedYear,
      selectedMonth,
    } = this.state
    const {
      maps,
      routeParams: { year: _year, month: _month },
    } = this.props

    const year = parseInt(_year, 10)
    const month = parseInt(_month, 10) - 1

    return (
      <div>
        <h1>Traffic</h1>
        <div>
          <Select
            label={'Year'}
            value={selectedYear}
            style={{
              width: 80,
              margin: 5,
            }}
            onChange={e => {
              this.setState({ ...this.state, selectedYear: e.target.value })
              history.refinedPush(`/traffic/${e.target.value}/${selectedMonth}`)
            }}
          >
            {[2016, 2017, 2018, 2019, 2020].map(yearOption => (
              <MenuItem key={yearOption} value={yearOption}>
                {yearOption}
              </MenuItem>
            ))}
          </Select>
          <Select
            value={selectedMonth}
            style={{
              width: 50,
              margin: 5,
            }}
            onChange={e => {
              this.setState({ ...this.state, selectedMonth: e.target.value })
              history.refinedPush(`/traffic/${selectedYear}/${e.target.value}`)
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(monthOption => (
              <MenuItem key={monthOption} value={monthOption}>
                {`${monthOption}`}
              </MenuItem>
            ))}
          </Select>

          <div>
            <Checkbox
              id={'toggle-traffic'}
              checked={showTraffic}
              color={'default'}
              onChange={this.createToggleHandler('showTraffic')}
            />
            <label htmlFor="toggle-traffic">{'Traffic'}</label>
            <Checkbox
              id={'toggle-display-times'}
              checked={showDisplayTimes}
              color={'default'}
              onChange={this.createToggleHandler('showDisplayTimes')}
            />
            <label htmlFor="toggle-display-times">{'Display Times'}</label>
          </div>

          <div>
            <Checkbox
              id={'toggle-cumulative'}
              checked={isCumulative}
              color={'default'}
              onChange={this.createToggleHandler('isCumulative')}
            />
            <label htmlFor="toggle-cumulative">{'Cumulative'}</label>
          </div>
        </div>
        {maps.map(map => (
          <MapCard
            key={`traffic-for-map-${map.id}`}
            map={map}
            year={year}
            month={month}
            showTraffic={showTraffic}
            showDisplayTimes={showDisplayTimes}
            isCumulative={isCumulative}
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
