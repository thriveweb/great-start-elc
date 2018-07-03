import React from 'react'

import Button from './Button'
import './DownloadBanner.css'

export default ({ file, title, preview }) => (
  <div className="section col6">
    <div className="container skinny DownloadBanner--Container">
      {preview && (
        <a className="DownloadBanner--Image" href={file}>
          <img src={preview} alt={title} />
        </a>
      )}
      <div className="DownloadBanner--Content">
        <h5>{title}</h5>
        <Button href={file} target="_blank" className="DownloadBanner--Button">
          Click Here
        </Button>
      </div>
    </div>
  </div>
)
