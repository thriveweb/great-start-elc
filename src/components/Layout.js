import React, { Fragment } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import 'modern-normalize/modern-normalize.css'

import './globalStyles.css'
import Meta from '../components/Meta'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import DownloadBanner from '../components/DownloadBanner'

export default ({
  children,
  showHandbook = false,
  simpleFooter = false,
  downloadBanner
}) => (
  <StaticQuery
    render={data => {
      const {
        siteTitle,
        siteUrl,
        siteDescription,
        socialMediaCard,
        headerScripts
      } =
        data.settingsYaml || {}
      return (
        <Fragment>
          <Helmet defaultTitle={siteTitle} titleTemplate={`${siteTitle} | %s`}>
            <link
              href="https://fonts.googleapis.com/css?family=Montserrat:300,400,400i,600,700|Varela+Round"
              rel="stylesheet"
            />
          </Helmet>
          <Meta
            headerScripts={headerScripts}
            absoluteImageUrl={
              socialMediaCard &&
              socialMediaCard.image &&
              siteUrl + socialMediaCard.image
            }
            twitterCreatorAccount={
              socialMediaCard && socialMediaCard.twitterCreatorAccount
            }
            twitterSiteAccount={
              socialMediaCard && socialMediaCard.twitterSiteAccount
            }
          />

          <Nav />

          <Fragment>{children}</Fragment>

          {downloadBanner && (
            <DownloadBanner
              file={downloadBanner.file}
              title={downloadBanner.title}
              preview={downloadBanner.preview}
            />
          )}

          <Footer
            showHandbook={showHandbook}
            simple={simpleFooter || !!downloadBanner}
          />
        </Fragment>
      )
    }}
    query={graphql`
      query LayoutQuery {
        settingsYaml {
          siteTitle
          headerScripts
          socialMediaCard {
            image
            twitterCreatorAccount
            twitterSiteAccount
          }
        }
      }
    `}
  />
)
