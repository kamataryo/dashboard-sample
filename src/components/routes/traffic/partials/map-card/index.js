import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Link from 'src/components/commons/refined-link'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import getTraffic from 'src/samples/traffic'
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Line,
  Label,
} from 'recharts'

const styles = {
  card: {
    minWidth: 275,
    marginBottom: 20,
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
}

export class SimpleCard extends React.Component {
  /**
   * constructor
   * @param  {object} props React props.
   * @return {void}
   */
  constructor(props) {
    super(props)
    this.state = {
      traffic: getTraffic(),
      year: props.year,
      month: props.month,
    }
  }

  /**
   * getDerivedStateFromProps
   * @param  {object} nextProps next props
   * @param  {object} prevState prev state
   * @return {object} new state
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      prevState.month !== nextProps.month ||
      prevState.year !== nextProps.year
    ) {
      return {
        traffic: getTraffic(),
        year: nextProps.year,
        month: nextProps.month,
      }
    }
  }

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    const {
      classes,
      showTraffic,
      showDisplayTimes,
      map,
      year,
      month,
    } = this.props
    const trafficData = [...this.state.traffic[map.id]]
    trafficData.sort((a, b) => a.day - b.day)

    const graphData = trafficData.map(data => ({
      day: data.day,
      displayTimes: data.displayTimes,
      traffic: data.traffic,
    }))

    const totalDisplayTimes = graphData.reduce(
      (prev, { displayTimes }) => prev + displayTimes,
      0,
    )

    const totalTraffic = Math.round(
      graphData.reduce((prev, { traffic }) => prev + traffic, 0) / 1000000,
    )

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="headline" component="h2">
            <Link to={`/maps/${map.id}`}>{map.name}</Link>
          </Typography>

          <Typography
            color="textSecondary"
            component="p"
            style={{ marginBottom: 10 }}
          >
            {map.description || '(no description)'}
          </Typography>

          <Typography component="p">{`Total: ${totalTraffic} MB (${totalDisplayTimes} Times)`}</Typography>
          <LineChart
            width={800}
            height={300}
            data={graphData}
            margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey={'day'}
              // scale={'linear'}
              type={'number'}
              domain={[1, 31]}
              ticks={[5, 10, 15, 20, 25, 30]}
            >
              <Label position={'bottom'}>{'day'}</Label>
            </XAxis>
            <YAxis yAxisId={'left'}>
              <Label
                angle={270}
                position="left"
                style={{ textAnchor: 'middle' }}
              >
                {'Times [n]'}
              </Label>
            </YAxis>
            <YAxis
              yAxisId={'right'}
              orientation={'right'}
              tickFormatter={tick => tick / 1000000}
            >
              <Label
                angle={90}
                position="right"
                style={{ textAnchor: 'middle' }}
              >
                {'Traffic [MB]'}
              </Label>
            </YAxis>
            <Tooltip
              labelFormatter={value => `${year}/${month + 1}/${value}`}
              formatter={(value, name) => {
                if (name === 'traffic') {
                  return Math.round(value / 10000) / 100 + ' MB'
                } else if (name === 'displayTimes') {
                  return value
                } else {
                  return value
                }
              }}
            />
            <Line
              yAxisId={'left'}
              type={'monotone'}
              dataKey={'displayTimes'}
              stroke={'#8884d8'}
              strokeWidth={showDisplayTimes ? 1 : 0}
              dot={showDisplayTimes}
            />
            <Line
              yAxisId={'right'}
              type={'monotone'}
              dataKey={'traffic'}
              stroke={'#82ca9d'}
              strokeWidth={showTraffic ? 1 : 0}
              dot={showTraffic}
            />
          </LineChart>
        </CardContent>
      </Card>
    )
  }
}

SimpleCard.propTypes = {
  // styleProps
  classes: PropTypes.object.isRequired,
  // ownProps
  showTraffic: PropTypes.bool.isRequired,
  showDisplayTimes: PropTypes.bool.isRequired,
  map: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
}

export default withStyles(styles)(SimpleCard)
