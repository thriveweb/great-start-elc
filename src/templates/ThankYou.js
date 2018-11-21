import React from 'react'
import Link from 'gatsby-link'
import _get from 'lodash/get'
import Helmet from 'react-helmet'

import PageHeader from '../components/PageHeader'
import Wave from '../components/Wave'
import Image from '../components/Image'
import Content from '../components/Content'
import ExceedBanner from '../components/ExceedBanner'
import Button from '../components/Button'


// Export Template for use in CMS preview
export const ThankYouPageTemplate = ({
  title,
  footerSettings,
  meta
}) => {

  return <main className="ThankYou">
    <Helmet defaultTitle={meta && meta.siteTitle || `${title} | Great Start ELC`}>
      {meta && <meta name="description" content={meta.siteDescription} />}
      {meta && <link rel="canonical" href={meta.canonical} />}
    </Helmet>
    <PageHeader
      title={title}
    />
    <div className="section thin JoinBannerSection">
      <div className="container">

      </div>
    </div>

    <ExceedBanner footerSettings={footerSettings} />
  </main>
}

// Export Default HomePage for front-end
const ThankYouPage = ({ data: { markdownRemark, footerSettings } }) => (
  <ThankYouPageTemplate {...markdownRemark.frontmatter} footerSettings={footerSettings} />
)
export default ThankYouPage

export const pageQuery = graphql`
  query ThankYouPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
      }
    }

    footerSettings: settingsYaml(id: { regex: "/footer.yml/" }) {
      exceedText
      exceedTextLong
      exceedLogo
      siteTitle
      siteDescription
      handbookDownload {
        file
        title
      }
    }

    meta: settingsYaml {
      siteTitle
      siteDescription
    }
  }
`
