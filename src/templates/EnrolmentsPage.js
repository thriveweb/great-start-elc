import React from 'react'
import Helmet from 'react-helmet'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content.js'
import { ICONDownload } from '../components/Icons.js'
import Button from '../components/Button.js'
import Accordion from '../components/Accordion.js'
import Image from '../components/Image.js'
import BreakoutBox from '../components/BreakoutBox.js'
import DownloadBanner from '../components/DownloadBanner.js'
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
  downloadFile,
  downloadFileText,
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
          {featuredImage && 
            <div className="relative EnrolmentsPage--Section1-Image">
              <Image
                background
                src={featuredImage}
                alt={enrolmentsSection1.title}
              />
            </div>
          }
          <div className='EnrolmentsPage--Section1-Content'>
            <Content src={enrolmentsSection1.title}/>
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

      {!!enrolmentsSection2.steps.length &&
        <section className="section">
          <div className="container content">
              {enrolmentsSection2.steps &&
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
      }

      {enrolBanner.title && 
        <section className="EnrolmentsPage--EnrolBanner background-clouds">
          <div className="container">
            <JoinBanner
              title={enrolBanner.title}
              buttonLinkTo={enrolBanner.buttonLinkTo}
              buttonTitle={enrolBanner.buttonTitle}
            />
          </div>
        </section>
      }

      <section className="section">
        <div className="container content">
          <Content src={enrolmentsSection3} />
          {downloadFile && 
            <section className='download-file'>
              <ICONDownload/>
              <a 
                href={downloadFile.publicURL}
                target="_blank"
              >
                {downloadFileText}
              </a>
            </section>
          }
          <Accordion items={accordion} />
        </div> 
      </section>
      <DownloadBanner />
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
        downloadFile {
          publicURL
        }
        downloadFileText
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
