import React, { Fragment } from 'react'
import Helmet from 'react-helmet'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
import DownloadBanner from '../components/DownloadBanner'
import './DownloadPage.css'

// Export Template for use in CMS preview
export const DownloadPagesTemplate = ({
  title,
  subtitle,
  downloadBanner,
  body
}) => {

  return (
    <main className="DownloadPage background-dots">
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <PageHeader title={title} subtitle={subtitle} />

      <section className="section">
        <div className="container content">
          <Content source={body} />
        </div>  
        <DownloadBanner downloadBanner={downloadBanner} />    
      </section>
    </main>
  )
}

const DownloadPages = ({ data: { page } }) => (
  <DownloadPagesTemplate {...page} {...page.frontmatter} body={page.html} />
)

export default DownloadPages

export const pageQuery = graphql`
  query DownloadPages($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      html
      rawMarkdownBody
      frontmatter {
        title
        subtitle
        downloadBanner {
          file {
            publicURL
          }
          title
          preview {
            ...SmallImage
          }
        }
      }
    }
  }
`
