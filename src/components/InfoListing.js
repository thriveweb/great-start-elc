import React from 'react'

import Content from '../components/Content'
import Image from '../components/Image'
import './InfoListing.css'

export default ({ description, infoListing }) => {

	return <div className='info-section'>
	      <div className='container content'>
	        {description && 
	          <div className='info-section-heading'>
	            <Content src={description} />
	          </div>
	        }
	        {infoListing && infoListing.map(({ icon, title, content }) => {
	          return <div className='icon-list-item'>
	            <Image src={icon} />
	            <div className=''>
	              {title && <h3>{title}</h3>}
	              {content && <Content src={content} />}
	            </div>
	          </div>
	        })}
	      </div>
	    </div>  
}