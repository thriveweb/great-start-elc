import React from 'react'

import PageHeader from '../components/PageHeader'
import Wave from '../components/Wave'
import Button from '../components/Button'
import ExceedBanner from '../components/ExceedBanner'
import Content from '../components/Content'

import './ThankYou.css'

// Export Template for use in CMS preview
export const ThankYouPageTemplate = ({
  title,
  mainContent,
  secondaryBanner,
  footerSettings
}) => {

  return <main className="ThankYou">
    <PageHeader title={title} />
    <div className="container">
      <div className="thankyou-content">
        <div className="container">
          <Content src={mainContent} />
        </div>  
      </div>
      <div className="col5 JoinBanner">
  		    <h3 className="JoinBanner--title">{secondaryBanner.title}</h3>
  		    <Wave />
  		    <Button to={secondaryBanner.buttonLink}>{secondaryBanner.buttonText}</Button>
  		</div>
      <div className="section thin">
          <ExceedBanner footerSettings={footerSettings} />
      </div>
    </div>
  </main>
}

// Export Default HomePage for front-end
const ThankYouPage = ({ data: { markdownRemark, footerSettings } }) => (
  <ThankYouPageTemplate {...markdownRemark.frontmatter} footerSettings={footerSettings} />
)
export default ThankYouPage

export const pageQuery = graphql`
  query ThankYouPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        mainContent
        secondaryBanner {
          buttonLink
          buttonText
          title
        }
        meta {
          canonicalLink
          description
          title
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
