import React from 'react'

import quote from '../images/quote.svg'
import './Testimonials.css'

export default class Testimonials extends React.Component {
  state = {
    activeItem: 0
  }

  static defaultProps = {
    items: []
  }

  render() {
    const { items } = this.props
    const { activeItem } = this.state

    return (
      <section className="section col2 Testimonials">
        <div className="container skinny taCenter">
          <h3>Testimonials</h3>
        </div>
        <div className="container skinny taCenter">
          <div className="Testimonials--Slider">
            <div
              className="Testimonials--Slider--Quote"
              style={{ backgroundImage: `url(${quote})` }}
            />
            {items.map((item = {}, index) => {
              const active = activeItem === index
              return (
                <div
                  className={`Testimonials--Slider--Item ${
                    active ? 'active' : ''
                  }`}
                  key={item.name}
                >
                  <p>{item.testimonial}</p>
                  <div className="Testimonials--Slider--Item--Name">
                    – <strong>{item.name}</strong>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    )
  }
}
