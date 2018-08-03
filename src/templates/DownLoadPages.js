import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import _get from 'lodash/get'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
import DownloadBox from '../components/DownloadBox'
import DownloadBanner from '../components/DownloadBanner'

import './DefaultPages.css'

// Export Template for use in CMS preview
export const DownloadTemplate = ({
  title,
  subtitle,
  featuredImage,
  downloadBanner,
  body
}) => {

  const { file, title, preview} = downloadBanner

  return (
    <main className="DownloadsPage background-dots">
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <PageHeader title={title} subtitle={subtitle} />

      <section className="section">
        <div className="container content">
          <Content source={body} />
        </div> 
        <DownloadBanner file={file} title={title} preview={preview} />   
      </section>
    </main>
  )
}

const DownLoadPage = ({ data: { page } }) => (
  <DownloadPageTemplate {...page} {...page.frontmatter} body={page.html} />
)

export default DownloadPage

export const pageQuery = graphql`
  query DownloadPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      html
      rawMarkdownBody
      frontmatter {
        title
        subtitle
        featuredImage {
          ...LargeImage
        }
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
