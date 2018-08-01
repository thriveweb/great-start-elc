import React from 'react'

import Image from './Image'

export default ({ image, description }) => {

	return <div className='StandardsBanner'>
		<div className='container'>
			{image && <Image src={image} />}
		</div>
	</div>

}