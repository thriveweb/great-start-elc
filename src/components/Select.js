import React, { Component } from 'react'
import { ICONArrowDown } from './Icons'
import './Select.css'

class Select extends Component {
  state = {}

  render() {
    const { name, options, placeholder } = this.props
    const { active, activeDropdown = false } = this.state

    return <label className={`EnquiryForm--Label`}>
      <select style={{display: 'none'}}>
        {options.map((option, index) => 
          <option key={option} value={option} selected={option === active ? true : null}>
            {option}
          </option>
        )}
      </select>
      <div className={`select-dropdown ${activeDropdown ? 'active' : ''}`}>
        <p className='EnquiryForm--Input has-arrow' onClick={() => this.setState({ activeDropdown: !activeDropdown })}>
          {active ? active : placeholder} <ICONArrowDown />
        </p>
        <ul>
          {options.map(option => 
            <li 
              key={option}
              onClick={() => this.setState({ active: option, activeDropdown: false })}
              className={option === active ? 'active' : ''}
            >
              {option}
            </li>
          )}
        </ul>
      </div>
    </label>
  }
}

export default Select