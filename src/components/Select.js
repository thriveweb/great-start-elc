import React, { Component } from 'react'


class Select extends Component {
  state = {}

  render() {
    const { name, options } = this.props
    const { active } = this.state

    return <label>
      <select style={{display: 'none'}}>
        {options.map(option => 
          <option value={option} selected={option === active ? true : false}>
            {option}
          </option>
        )}
      </select>
      <ul>
        {options.map(option => 
          <li 
            onClick={() => this.setState({ active: option })}
            className={option === active ? 'active' : ''}
          >
            {option}
          </li>
        )}
      </ul>
    </label>
  }
}

export default Select