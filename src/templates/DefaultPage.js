import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
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
  return (
    <Layout downloadBanner={downloadBanner} simpleFooter={simpleFooter}>
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
    </Layout>
  )
}

const DefaultPage = ({ data }) => {
  const { markdownRemark: page } = data
  return (
    <DefaultPageTemplate {...page} {...page.frontmatter} body={page.html} />
  )
}

export default DefaultPage

// Query for DefaultPage data
// Use GraphiQL interface (http://localhost:8000/___graphql)
// ID is processed via gatsby-node.js
export const pageQuery = graphql`
  query DefaultPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
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
