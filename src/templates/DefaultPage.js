import React, { Fragment } from 'react'
import Helmet from 'react-helmet'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
import Accordion from '../components/Accordion'
import PopoutBanner from '../components/PopoutBanner'
import DownloadBox from '../components/DownloadBox'
import InfoListing from '../components/InfoListing'
import './DefaultPage.css'

// Export Template for use in CMS preview
export const DefaultPageTemplate = ({
  title,
  subtitle,
  featuredImage,
  downloadBanner,
  popoutBanner,
  accordion,
  downloadableForms,
  infoSection,
  body
}) => {

  return (
    <main className="DefaultPage background-dots">
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <PageHeader title={title} subtitle={subtitle} />

      <section className="section">
        <div className="container content">
          <Content source={body} />
        </div>
        <div className="container content m-t-2">
          {downloadableForms && <DownloadBox listItems={downloadableForms} />}
        </div>
        {accordion && (
          <div className="container content m-t-2 background-clouds">
            <Accordion items={accordion} />
          </div>
        )}
        <InfoListing infoSection={infoSection} />        
      </section>

      {popoutBanner && (
        <PopoutBanner image={popoutBanner.image} title={popoutBanner.title} />
      )}
    </main>
  )
}

const DefaultPage = ({ data: { page } }) => (
  <DefaultPageTemplate {...page} {...page.frontmatter} body={page.html} />
)

export default DefaultPage

export const pageQuery = graphql`
  query DefaultPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      html
      rawMarkdownBody
      frontmatter {
        title
        subtitle
        featuredImage {
          ...LargeImage
        }
        downloadableForms {
          file {
            publicURL
          }
          title
        }
        # downloadBanner {
        #   file {
        #     publicURL
        #   }
        #   title
        #   preview {
        #     ...SmallImage
        #   }
        # }
        accordion {
          title
          content
        }
        infoSection {
          description
          infoListing {
            icon {
              ...SmallImage
            }
            title
            content
          }
        }
      }
    }
  }
`
