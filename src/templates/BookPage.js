import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
import BookForm from '../components/BookForm'
import './BookPage.css'

// Export Template for use in CMS preview
export const BookPageTemplate = ({ title, subtitle, featuredImage, body }) => {
  return (
    <Layout showHandbook>
      <main className="BookPage">
        <Helmet>
          <title>{title}</title>
        </Helmet>

        <PageHeader title={title} subtitle={subtitle} />

        <div className="section">
          <div className="container content">
            <Content source={body} />

            <BookForm />
          </div>
        </div>
      </main>
    </Layout>
  )
}

const BookPage = ({ data }) => {
  const { markdownRemark: page } = data

  return <BookPageTemplate {...page} {...page.frontmatter} body={page.html} />
}

export default BookPage

// Query for BookPage data
// Use GraphiQL interface (http://localhost:8000/___graphql)
// ID is processed via gatsby-node.js
export const pageQuery = graphql`
  query BookPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        subtitle
        featuredImage {
          ...LargeImage
        }
      }
    }
  }
`