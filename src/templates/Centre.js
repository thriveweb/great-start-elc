import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import Button from '../components/Button'
import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
import PopoutBanner from '../components/PopoutBanner'
import BreakoutBox from '../components/BreakoutBox'
import './Centre.css'

// Export Template for use in CMS preview
export const CentreTemplate = ({
  title,
  subtitle,
  featuredImage,
  downloadBanner,
  logo,
  centreIntro,
  centreDetails,
  rawMarkdownBody
}) => {
  const { openingHours, location, phone, email } = centreDetails

  return (
    <Layout downloadBanner={downloadBanner}>
      <main className="Centre">
        <Helmet>
          <title>{title}</title>
        </Helmet>

        <PageHeader title={title} subtitle={subtitle} />

        <div className="section Centre--Intro">
          <div className="container content">
            <img className="Centre--Intro--Logo" src={logo} alt={title} />
            <h5 className="Centre--Intro--Title">{centreIntro}</h5>
          </div>
        </div>

        <div className="section Centre--MainSection">
          <div className="container content">
            <BreakoutBox className="Centre--Details" title="Centre Details">
              {openingHours && (
                <p>
                  Open Hours<br />
                  {openingHours}
                </p>
              )}
              {location && (
                <p>
                  Centre Location<br />
                  {location}
                </p>
              )}
              {(email || phone) && (
                <p>
                  Contact Info<br />
                  {phone && <div>T: {phone}</div>}
                  {email && <div>E: {email}</div>}
                </p>
              )}
              <Button to={'dsf'}>asdf</Button>
            </BreakoutBox>
            <Content source={rawMarkdownBody} />
          </div>
        </div>
      </main>
    </Layout>
  )
}

const Centre = ({ data }) => {
  const { markdownRemark: page } = data

  return <CentreTemplate {...page} {...page.frontmatter} />
}

export default Centre

// Query for Centre data
// Use GraphiQL interface (http://localhost:8000/___graphql)
// ID is processed via gatsby-node.js
export const pageQuery = graphql`
  query Centre($id: String!) {
    markdownRemark(id: { eq: $id }) {
      rawMarkdownBody
      frontmatter {
        title
        logo
        centreIntro
        centreDetails {
          openingHours
          location
          phone
          email
        }
      }
    }
  }
`
