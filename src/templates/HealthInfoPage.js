import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
import Accordion from '../components/Accordion'
import PopoutBanner from '../components/PopoutBanner'
import './HealthInfoPage.css'

// Export Template for use in CMS preview
export const HealthInfoPageTemplate = ({
  title,
  subtitle,
  featuredImage,
  downloadBanner,
  popoutBanner,
  accordion,
  rawMarkdownBody
}) => {
  const simpleFooter = !!popoutBanner
  return (
    <Layout downloadBanner={downloadBanner} simpleFooter={simpleFooter}>
      <main className="HealthInfoPage">
        <Helmet>
          <title>{title}</title>
        </Helmet>

        <PageHeader title={title} subtitle={subtitle} />

        <section className="section">
          <div className="container content">
            <Content source={rawMarkdownBody} />
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
    </Layout>
  )
}

const HealthInfoPage = ({ data }) => {
  const { markdownRemark: page } = data

  return <HealthInfoPageTemplate {...page} {...page.frontmatter} />
}

export default HealthInfoPage

// Query for HealthInfoPage data
// Use GraphiQL interface (http://localhost:8000/___graphql)
// ID is processed via gatsby-node.js
export const pageQuery = graphql`
  query HealthInfoPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      rawMarkdownBody
      frontmatter {
        title
        subtitle
        featuredImage {
          childImageSharp {
            sizes(maxWidth: 1800) {
              src
              srcSet
              srcWebp
            }
          }
        }
        downloadBanner {
          title
          file {
            publicURL
          }
          preview {
            ...LargeImage
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
