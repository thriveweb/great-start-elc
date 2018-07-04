import React from 'react'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'
import Content from '../components/Content.js'
import PopoutBanner from '../components/PopoutBanner.js'
import './QKPortalPage.css'

// Export Template for use in CMS preview
export const QKPortalPageTemplate = ({
  title,
  subtitle,
  featuredImage,
  downloadBanner,
  rawMarkdownBody
}) => (
  <Layout downloadBanner={downloadBanner}>
    <main className="QKPortalPage">
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <PageHeader title={title} subtitle={subtitle} />

      <div className="section">
        <div className="container content">
          <Content source={rawMarkdownBody} />
        </div>
      </div>
    </main>
  </Layout>
)

const QKPortalPage = ({ data }) => {
  const { markdownRemark: page } = data

  return <QKPortalPageTemplate {...page} {...page.frontmatter} />
}

export default QKPortalPage

// Query for QKPortalPage data
// Use GraphiQL interface (http://localhost:8000/___graphql)
// ID is processed via gatsby-node.js
export const pageQuery = graphql`
  query QKPortalPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      rawMarkdownBody
      frontmatter {
        title
        subtitle
        featuredImage
        downloadBanner {
          file
          title
          preview
        }
      }
    }
  }
`
