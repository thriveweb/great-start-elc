import React from 'react'
import Link from 'gatsby-link'

import PageHeader from '../components/PageHeader'
import Wave from '../components/Wave'
import Image from '../components/Image'
import Content from '../components/Content'
import Button from '../components/Button'

import './HomePage.css'

// Export Template for use in CMS preview
export const HomePageTemplate = ({
  title,
  subtitle,
  featuredImage,
  homeSection1,
  homeSection2,
  homeSection3,
  homeSection4
}) => (
  // showHandbook
  <main className="Home">
    <PageHeader
      large
      title={title}
      subtitle={subtitle}
      button={{ linkTo: '/enrol/', title: 'Enrol Now' }}
      backgroundImage={featuredImage}
    />
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
                  <Image
                    className="homeSection1--box--logo"
                    src={centre.logo}
                    alt={centre.title || centre.description}
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
      <div className="section light">
        <div className="container homeSection2--container">
          <div className="relative">
            <Image
              background
              src={homeSection2.image}
              alt={homeSection2.title}
            />
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
    {homeSection3 && (
      <div className="section">
        <div className="container">
          <h3>{homeSection3.title}</h3>
          {homeSection3.items && (
            <div className="homeSection3--items">
              {homeSection3.items.map(item => (
                <div className="homeSection3--item" key={item.title}>
                  <Image
                    src={item.icon}
                    className="homeSection3--item--icon"
                    alt={item.title}
                  />
                  <div>
                    <div className="homeSection3--item--title">
                      {item.title}
                    </div>
                    <div>{item.subtitle}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )}
    {homeSection4 && (
      <div className="section">
        <div className="container">
          <div className="homeSection4--grid">
            <div className="homeSection4--grid--image relative">
              <Image background src={homeSection4.image1} alt={title} />
            </div>
            {homeSection4.items &&
              homeSection4.items.map((item, index) => {
                const col = `col${index + 1}`
                return (
                  <Link
                    to={item.linkTo}
                    className={`homeSection4--grid--item hasShadowHover ${col}`}
                    key={item.title}
                  >
                    <h3 className="homeSection4--grid--item--title">
                      {item.title}
                    </h3>
                    <Wave />
                    <p className="homeSection4--grid--item--description">
                      {item.description}
                    </p>
                    <div className="Button homeSection4--grid--item--button">
                      Read More
                    </div>
                  </Link>
                )
              })}
            <div className="homeSection4--grid--image relative">
              <Image background src={homeSection4.image2} alt={title} />
            </div>
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
  query HomePage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        template
        subtitle
        featuredImage {
          ...MediumImage
        }
        homeSection1 {
          title
          centres {
            logo {
              ...SmallImage
            }
            description
            linkTo
          }
        }
        homeSection2 {
          title
          subtitle
          content
          linkTo
          image {
            ...MediumImage
          }
        }
        homeSection3 {
          title
          items {
            icon {
              ...SmallImage
            }
            title
            subtitle
          }
        }
        homeSection4 {
          image1 {
            ...MediumImage
          }
          image2 {
            ...MediumImage
          }
          items {
            title
            description
            linkTo
          }
        }
      }
    }
  }
`
