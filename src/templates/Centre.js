import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import Button from '../components/Button'
import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
import PopoutBanner from '../components/PopoutBanner'
import BreakoutBox from '../components/BreakoutBox'
import ExceedBanner from '../components/ExceedBanner'
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
  classroomsSection,
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

        <section className="section Centre--Intro">
          <div className="container content">
            <img className="Centre--Intro--Logo" src={logo} alt={title} />
            <h5 className="Centre--Intro--Title">{centreIntro}</h5>
          </div>
        </section>

        <section className="section Centre--MainSection">
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
              <Button to={'/'}>Enrol Now</Button>
            </BreakoutBox>
            <Content source={rawMarkdownBody} />
          </div>
        </section>

        <ExceedBanner long />

        {classroomsSection && (
          <section className="section secondary Centre--ClassroomsSection">
            <div className="container skinny taCenter">
              <h3>{classroomsSection.title}</h3>
            </div>
            <div className="container taCenter">
              {classroomsSection.items && (
                <div className="Centre--ClassroomsSection--Items">
                  {classroomsSection.items.map(item => (
                    <div className="Centre--ClassroomsSection--Item">
                      <img
                        className="Centre--ClassroomsSection--Item--Icon"
                        src={item.icon}
                        alt={item.title}
                      />
                      <h6 className="Centre--ClassroomsSection--Item--Title">
                        {item.title}
                      </h6>
                      <p>{item.subtitle}</p>
                    </div>
                  ))}
                </div>
              )}
              <div className="Centre--ClassroomsSection--Subtitle">
                {classroomsSection.subtitle}
                <Button to="/">Enrol Now</Button>
              </div>
            </div>
          </section>
        )}
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
        classroomsSection {
          title
          subtitle
          items {
            icon
            title
            subtitle
          }
        }
      }
    }
  }
`
