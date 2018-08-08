import React from 'react'
import Helmet from 'react-helmet'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content.js'
import Button from '../components/Button.js'
import Accordion from '../components/Accordion.js'
import Image from '../components/Image.js'
import BreakoutBox from '../components/BreakoutBox.js'
import DownloadForm from '../components/DownloadForm.js'
import JoinBanner from '../components/JoinBanner.js'
import ExceedBanner from '../components/ExceedBanner.js'
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
  accordion,
  footerSettings
}) => {
  // showHandbook
  return (
    <main className="EnrolmentsPage background-dots">
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <PageHeader title={title} subtitle={subtitle} />

      <section className="section EnrolmentsPage--Section1">
        <div className="container content">
          <div className="relative">
            <Image
              background
              src={featuredImage}
              alt={enrolmentsSection1.title}
            />
          </div>
          <div>
            <h5>{enrolmentsSection1.title}</h5>
            <Button to="#">Book a Tour</Button>
          </div>
        </div>
      </section>

      <section>
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
                <span className='Button hasShadow'>Step {index + 1}</span>
                <div>
                  <h4>{step.title}</h4>
                  <Content src={step.content} />
                </div>
              </div>
            ))}
        </div>
      </section>

      <section className="EnrolmentsPage--EnrolBanner background-clouds">
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
      <DownloadForm />
      <div className="section thin">
        <div className="container">
          <ExceedBanner footerSettings={footerSettings} />
        </div>
      </div>
    </main>
  )
}

const EnrolmentsPage = ({ data }) => {
  const { markdownRemark: page, footerSettings } = data

  return <EnrolmentsPageTemplate {...page} {...page.frontmatter} footerSettings={footerSettings} />
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
    footerSettings: settingsYaml(id: { regex: "/footer.yml/" }) {
      exceedText
      exceedTextLong
      exceedLogo
    }
  }
`
