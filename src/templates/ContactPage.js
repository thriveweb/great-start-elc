import React from 'react'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
import BreakoutBox from '../components/BreakoutBox'
import Button from '../components/Button'
import './ContactPage.css'

// Export Template for use in CMS preview
export const ContactPageTemplate = ({
  body,
  title,
  featuredImage,
  centres = []
}) => (
  <main className="Contact">
    <PageHeader title={title} backgroundImage={featuredImage} />

    <div className="section Contact--Section1">
      <div className="container content Contact--Section1--Container">
        <Content source={body} />
      </div>

      <div className="container Contact--Centres">
        {centres && centres.map(({ title, centreDetails = {} }) => (
          <BreakoutBox title={title} key={title}>
            {centreDetails.openingHours && (
              <p>
                <strong>Open Hours</strong>
                <br />
                {centreDetails.openingHours}
              </p>
            )}
            {centreDetails.location && (
              <p>
                <strong>Centre Location</strong>
                <br />
                {centreDetails.location}
              </p>
            )}
            {(centreDetails.email || centreDetails.phone) && (
              <div>
                <strong>Contact Info</strong>
                <br />
                {centreDetails.phone && <div>T: {centreDetails.phone}</div>}
                {centreDetails.email && <div>E: {centreDetails.email}</div>}
              </div>
            )}
            <br />
            <Button to={'/'}>Enrol Now</Button>
          </BreakoutBox>
        ))}
      </div>
    </div>
  </main>
)

const ContactPage = ({ data }) => {
  const { page } = data
  return (
    <ContactPageTemplate
      body={page.html}
      {...page.frontmatter}
      centres={data.centres.edges.map(edge => ({
        ...edge.node,
        ...edge.node.frontmatter
      }))}
    />
  )
}

export default ContactPage

// Query for DefaultPage data
// Use GraphiQL interface (http://localhost:8000/___graphql)
// ID is processed via gatsby-node.js
export const pageQuery = graphql`
  query ContactPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
    centres: allMarkdownRemark(
      filter: { fields: { contentType: { regex: "/centre/" } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            centreDetails {
              email
              location
              openingHours
              phone
            }
          }
        }
      }
    }
  }
`
