import React from 'react'
import { graphql, StaticQuery } from 'gatsby'

import Button from './Button'
import PopoutBanner from './PopoutBanner'
import './ExceedBanner.css'

export default ({ showExceedBannerLong, ...props }) => (
  <StaticQuery
    render={data => {
      const {
        exceedLogo,
        exceedText,
        exceedTextLong
      } = data.globalSettings.footer

      return showExceedBannerLong ? (
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
    }}
    query={graphql`
      query ExceedBannerQuery {
        globalSettings: settingsYaml {
          footer {
            exceedText
            exceedLogo
            exceedTextLong
          }
        }
      }
    `}
  />
)
