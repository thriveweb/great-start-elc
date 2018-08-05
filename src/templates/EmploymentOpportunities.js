import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import _get from 'lodash/get'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
import JoinBanner from '../components/JoinBanner'
import ExceedBanner from '../components/ExceedBanner'
import './DefaultPage.css'

// Export Template for use in CMS preview
export const EmploymentOpportunitiesTemplate = ({
  title,
  subtitle,
  footerSettings,
  body
}) => {

  const description = _get(infoSection, 'description') || ''
  const infoListing = _get(infoSection, 'infoListing') || []

  return (
    <main className="EmploymentOpportunities background-dots">
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <PageHeader title={title} subtitle={subtitle} />

      <section className="section">
        <div className="container content">
          <Content source={body} />
        </div>    
      </section>
      <div className="section thin JoinBannerSection">
        <div className="container">
          <JoinBanner linkTo="/" />
        </div>
      </div>
      <div className="section thin">
        <div className="container">
          <ExceedBanner footerSettings={footerSettings} />
        </div>
      </div>
    </main>
  )
}

const EmploymentOpportunities = ({ data: { page, footerSettings } }) => (
  <EmploymentOpportunitiesTemplate {...page} {...page.frontmatter} body={page.html} footerSettings={footerSettings} />
)

export default EmploymentOpportunities

export const pageQuery = graphql`
  query EmploymentOpportunities($id: String!) {
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
