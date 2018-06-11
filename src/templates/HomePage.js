import React from 'react'
import Link from 'gatsby-link'

import PageHeader from '../components/PageHeader'
import BackgroundImage from '../components/BackgroundImage'
import Content from '../components/Content'
import Button from '../components/Button'
import './HomePage.css'

// Export Template for use in CMS preview
export const HomePageTemplate = ({
  title,
  subtitle,
  featuredImage,
  homeSection1,
  homeSection2
}) => (
  <main className="Home">
    <PageHeader large title={title} subtitle={subtitle} />

    {homeSection1 && (
      <div className="section">
        <div className="container taCenter">
          <h2>{homeSection1.title}</h2>
          {homeSection1.centres && (
            <div className="homeSection1--boxes">
              {homeSection1.centres.map((centre, index) => (
                <Link
                  key={'centre' + index}
                  className="hasBorder hasShadowHover homeSection1--box"
                  to={centre.linkTo}
                >
                  <img
                    className="homeSection1--box--logo"
                    src={centre.logo}
                    alt={centre.title}
                  />

                  <p className="homeSection1--box--description">
                    {centre.description}
                  </p>
                  <strong>View Centre</strong>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    )}

    {homeSection2 && (
      <div class="section light">
        <div class="container homeSection2--container">
          <div className="relative">
            <BackgroundImage src={homeSection2.image} />
          </div>
          <div>
            <h2>{homeSection2.title}</h2>
            <p>
              <strong>{homeSection2.subtitle}</strong>
            </p>
            <Content src={homeSection2.content} />
            <Button to={homeSection2.linkTo}>Read More</Button>
          </div>
        </div>
      </div>
    )}
  </main>
)

// Export Default HomePage for front-end
const HomePage = ({ data: { markdownRemark } }) => (
  <HomePageTemplate {...markdownRemark.frontmatter} />
)
export default HomePage

export const pageQuery = graphql`
  ## Query for HomePage data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query HomePage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        template
        subtitle
        featuredImage
        homeSection1 {
          title
          centres {
            logo
            description
          }
        }
        homeSection2 {
          title
          subtitle
          content
          linkTo
          image
        }
      }
    }
  }
`
