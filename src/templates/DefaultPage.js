import React, { Fragment } from 'react'
import Helmet from 'react-helmet'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
import Accordion from '../components/Accordion'
import PopoutBanner from '../components/PopoutBanner'
import './DefaultPage.css'

// Export Template for use in CMS preview
export const DefaultPageTemplate = ({
  title,
  subtitle,
  featuredImage,
  downloadBanner,
  popoutBanner,
  accordion,
  body
}) => {
  const simpleFooter = !!popoutBanner
  // downloadBanner={downloadBanner} simpleFooter={simpleFooter}
  return (
    <main className="DefaultPage">
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <PageHeader title={title} subtitle={subtitle} />

      <section className="section">
        <div className="container content">
          <Content source={body} />
        </div>
        {accordion && (
          <Fragment>
            <br />
            <br />
            <div className="container content">
              <Accordion items={accordion} />
            </div>
          </Fragment>
        )}
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
        downloadBanner {
          file {
            publicURL
          }
          title
          preview {
            ...SmallImage
          }
        }
        accordion {
          title
          content
        }
      }
    }
  }
`
