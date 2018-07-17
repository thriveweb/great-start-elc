import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import Image from '../components/Image'
import Button from '../components/Button'
import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
import BreakoutBox from '../components/BreakoutBox'
import ExceedBanner from '../components/ExceedBanner'
import Testimonials from '../components/Testimonials'
import Gallery from '../components/Gallery'

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
  testimonials,
  directorStatement,
  gallery = [],
  additionalInfoBoxes = [],
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
            <Image className="Centre--Intro--Logo" src={logo} alt={title} />
            <h5 className="Centre--Intro--Title">{centreIntro}</h5>
          </div>
        </section>

        <section className="section Centre--MainSection">
          <div className="container content">
            <BreakoutBox className="Centre--Details" title="Centre Details">
              {openingHours && (
                <p>
                  <strong>Open Hours</strong>
                  <br />
                  {openingHours}
                </p>
              )}
              {location && (
                <p>
                  <strong>Centre Location</strong>
                  <br />
                  {location}
                </p>
              )}
              {(email || phone) && (
                <div>
                  <strong>Contact Info</strong>
                  <br />
                  {phone && <div>T: {phone}</div>}
                  {email && <div>E: {email}</div>}
                </div>
              )}
              <br />
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
                    <div
                      className="Centre--ClassroomsSection--Item"
                      key={item.title}
                    >
                      <Image
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

        {testimonials && <Testimonials items={testimonials} />}

        {directorStatement && (
          <section className="section Centre--DirectorStatement">
            <div className="container">
              <h5 className="Centre--DirectorStatement--Title">
                {directorStatement.title}
              </h5>
              {directorStatement.image && (
                <Image
                  className="Centre--DirectorStatement--Image"
                  src={directorStatement.image}
                  alt={directorStatement.title}
                />
              )}
              <Content src={directorStatement.content} />
            </div>
          </section>
        )}

        {gallery.length && (
          <section className="section thin Centre--Gallery">
            <div className="container taCenter">
              <h3 className="Centre--Gallery--Title">Centre Gallery</h3>
              <Gallery images={gallery} />
            </div>
          </section>
        )}

        <section className="section thin Centre--InfoBoxes">
          <div className="container">
            {additionalInfoBoxes.map((box, index) => {
              const cols = [3, 4, 5]
              const color = cols[index % cols.length]
              return (
                <BreakoutBox
                  className="Centre--InfoBox"
                  title={box.title}
                  key={box.title}
                  color={color}
                  noShadow
                >
                  <p>{box.content}</p>
                  {box.buttonTitle && (
                    <Button to={box.buttonLinkTo}>{box.buttonTitle}</Button>
                  )}
                </BreakoutBox>
              )
            })}
          </div>
        </section>
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
        logo {
          ...LargeImage
        }
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
            icon {
              ...SmallImage
            }
            title
            subtitle
          }
        }
        testimonials {
          name
          testimonial
        }
        directorStatement {
          image {
            ...MediumImage
          }
          title
          content
        }
        gallery {
          ...LargeImageFluid
        }
        additionalInfoBoxes {
          title
          content
          buttonTitle
          buttonLinkTo
        }
      }
    }
  }
`
