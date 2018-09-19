import React, { Fragment } from 'react'
import Helmet from 'react-helmet'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
import ReferFriendSection from '../components/ReferFriendSection'
import ExceedBanner from '../components/ExceedBanner'

// Export Template for use in CMS preview
export const ReferFriendTemplate = ({
  title,
  subtitle,
  footerSettings,
  body
}) => {

  return (
    <main className="ReferFriendForm background-dots">
      <Helmet defaultTitle={`${title} | Great Start ELC`}></Helmet>

      <PageHeader title={title} subtitle={subtitle} />

      <section className="section">
        <div className="container content">
          <Content source={body} />
          <ReferFriendSection />  
        </div>    
      </section>
      <div className="section thin">
        <div className="container">
          <ExceedBanner footerSettings={footerSettings} />
        </div>
      </div>
    </main>
  )
}

const ReferFriend = ({ data: { page, footerSettings } }) => (
  <ReferFriendTemplate {...page} {...page.frontmatter} body={page.html} footerSettings={footerSettings} />
)

export default ReferFriend

export const pageQuery = graphql`
  query ReferFriend($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      html
      rawMarkdownBody
      frontmatter {
        title
        subtitle
      }
    }
    footerSettings: settingsYaml(id: { regex: "/footer.yml/" }) {
      exceedText
      exceedTextLong
      exceedLogo
    }
  }
`
