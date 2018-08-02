import React, { Component } from 'react'

import Slider from 'react-slick/dist/react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Image from './Image'
import './MemberSlider.css'

class MemberSlider extends Component {

  	render() {
		const settings = {
		  className: "center",
		  infinite: true,
		  centerPadding: "60px",
		  slidesToShow: 3,
		  swipeToSlide: true,
		  slidesToScroll: 1,
		  autoplay: true,
		  speed: 1500,
		  autoplaySpeed: 2000,
		  arrows: true
		};

	    const { members = [] } = this.props
		
		if(!members.length) return null

		return <section className='TeamMember--slider'>
			<Slider {...settings}>
				{members.map(({name, title, image}) => {
					
					return <div className='slide member'>
						{image && <Image background src={image} />}
						<div className='member-info'>
							{name && <h4>{name}</h4>}
							{title && <p>{title}</p>}
							<p className='readmore button'>Read Full Bio</p>
						</div>
					</div>
				})}
			</Slider>
	    </section>
	}
}

export default MemberSlider

