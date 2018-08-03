import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import _get from 'lodash/get'

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
  popoutBanner,
  accordion,
  downloadableForms,
  infoSection,
  body
}) => {

  const description = _get(infoSection, 'description') || ''
  const infoListing = _get(infoSection, 'infoListing') || []

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
        <InfoListing description={description} infoListing={infoListing} />        
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
