import React from 'react'

import PopoutBanner from './PopoutBanner'
import './ExceedBanner.css'

export default props => {
  const { exceedLogo, exceedText, exceedTextLong, long } = props

  return long ? (
    <PopoutBanner image={exceedLogo} title={exceedTextLong} />
  ) : (
    <div className="ExceedBanner">
      {exceedLogo && (
        <img
          className="ExceedBanner--image"
          src={exceedLogo}
          alt={exceedText}
        />
      )}
      <h3 className="ExceedBanner--title">{exceedText}</h3>
    </div>
  )
}

// query={graphql`
//   query ExceedBannerQuery {
//     globalSettings: settingsYaml {
//       footer {
//         exceedText
//         exceedLogo
//         exceedTextLong
//       }
//     }
//   }
// `}
