import React from 'react'
import Helmet from 'react-helmet'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content.js'
import Button from '../components/Button.js'
import Accordion from '../components/Accordion.js'
import BackgroundImage from '../components/BackgroundImage.js'
import BreakoutBox from '../components/BreakoutBox.js'
import JoinBanner from '../components/JoinBanner.js'
import './EnrolmentsPage.css'

// Export Template for use in CMS preview
export const EnrolmentsPageTemplate = ({
  title,
  subtitle,
  featuredImage,
  enrolmentsSection1,
  breakoutBox,
  enrolmentsSection2,
  enrolBanner,
  enrolmentsSection3,
  accordion
}) => {
  // showHandbook
  return (
    <main className="EnrolmentsPage">
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <PageHeader title={title} subtitle={subtitle} />

      <section className="section EnrolmentsPage--Section1">
        <div className="container content">
          <div className="relative">
            <BackgroundImage src={featuredImage} />
          </div>
          <div>
            <h5>{enrolmentsSection1.title}</h5>
            <Button to="#">Book a Tour</Button>
          </div>
        </div>
      </section>

      <section className="">
        <div className="container content">
          <BreakoutBox title={breakoutBox.title}>
            <Content src={breakoutBox.content} />
          </BreakoutBox>
        </div>
      </section>

      <section className="section">
        <div className="container content">
          {enrolmentsSection2 &&
            enrolmentsSection2.steps &&
            enrolmentsSection2.steps.map((step, index) => (
              <div key={step.title} className="EnrolmentsPage--Section2--Step">
                <h4>
                  Step {index + 1}: &emsp; {step.title}
                </h4>
                <Content src={step.content} />
              </div>
            ))}
        </div>
      </section>

      <section className="EnrolmentsPage--EnrolBanner">
        <div className="container">
          <JoinBanner
            title={enrolBanner.title}
            buttonLinkTo={enrolBanner.buttonLinkTo}
            buttonTitle={enrolBanner.buttonTitle}
          />
        </div>
      </section>

      <section className="section">
        <div className="container content">
          <Content src={enrolmentsSection3} />
          <Accordion items={accordion} />
        </div>
      </section>
    </main>
  )
}

const EnrolmentsPage = ({ data }) => {
  const { markdownRemark: page } = data

  return <EnrolmentsPageTemplate {...page} {...page.frontmatter} />
}

export default EnrolmentsPage

export const pageQuery = graphql`
  query EnrolmentsPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      rawMarkdownBody
      frontmatter {
        title
        subtitle
        featuredImage {
          ...LargeImage
        }
        enrolmentsSection1 {
          title
        }
        breakoutBox {
          title
          content
        }
        enrolmentsSection2 {
          steps {
            title
            content
          }
        }
        enrolBanner {
          title
          buttonTitle
          buttonLinkTo
        }
        enrolmentsSection3
        accordion {
          title
          content
        }
      }
    }
  }
`
