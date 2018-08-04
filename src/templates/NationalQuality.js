import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import _get from 'lodash/get'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
import PopoutBanner from '../components/PopoutBanner'
import './DefaultPage.css'

// Export Template for use in CMS preview
export const NationalQualityTemplate = ({
  title,
  subtitle,
  popoutBanner,
  footerSettings,
  body
}) => {

  return (
    <main className="NationalQuality background-dots">
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <PageHeader title={title} subtitle={subtitle} />

      <section className="section">
        <div className="container content">
          <Content source={body} />
        </div>       
      </section>

      {popoutBanner && (
        <PopoutBanner image={popoutBanner.image} title={popoutBanner.title} />
      )}
    </main>
  )
}

const NationalQuality = ({ data: { page, footerSettings } }) => (
  <NationalQualityTemplate {...page} {...page.frontmatter} body={page.html} footerSettings={footerSettings} />
)

export default NationalQuality

export const pageQuery = graphql`
  query NationalQuality($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      html
      rawMarkdownBody
      frontmatter {
        title
        subtitle
      }
    }
    footerSettings: settingsYaml(id: { regex: "/footer.yml/" }) {
      exceedText
      exceedTextLong
      exceedLogo
    }
  }
`
