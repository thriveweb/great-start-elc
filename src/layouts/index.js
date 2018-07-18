import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import 'modern-normalize/modern-normalize.css'

import './globalStyles.css'
import Meta from '../components/Meta'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import DownloadBanner from '../components/DownloadBanner'

export default ({ children, data }) => {
  const { siteTitle, siteUrl, socialMediaCard, headerScripts } =
    data.settingsYaml || {}
  const { showHandbook = false, simpleFooter = false, downloadBanner } = data
  const allPages = data.allPages.edges.map(edge => edge.node)

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

      <Nav allPages={allPages} />

      <Fragment>{children()}</Fragment>

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
}

export const query = graphql`
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

    allPages: allMarkdownRemark {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
