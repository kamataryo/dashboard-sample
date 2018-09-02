import React from 'react'
import PropTypes from 'prop-types'

export class DisplayName extends React.Component {
  /**
   * constructor
   * @param  {object} props React props.
   * @return {void}
   */
  constructor(props) {
    super(props)
    this.state = { value: false }
  }

  onFocus = () => this.setState({ ...this.state, value: this.props.value })
  onChange = e => this.setState({ ...this.state, value: e.target.value })
  onBlur = e => {
    this.setState({ ...this.state, value: false })
    this.props.onChange(e.target.value)
  }
  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    const value =
      this.state.value === false ? this.props.value : this.state.value
    const { label } = this.props

    return (
      <span>
        <label htmlFor={ label }>{label}</label>
        <input
          id={ label }
          type={ 'text' }
          value={ value }
          onFocus={ this.onFocus }
          onChange={ this.onChange }
          onBlur={ this.onBlur }
        />
      </span>
    )
  }
}

DisplayName.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

DisplayName.defaultProps = {
  value: '',
}

export default DisplayName
