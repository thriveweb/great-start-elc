import React, { Fragment } from 'react'
import Helmet from 'react-helmet'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
import MemberSlider from '../components/MemberSlider'
import PopoutBanner from '../components/PopoutBanner'
import JoinBanner from '../components/JoinBanner'
import ExceedBanner from '../components/ExceedBanner'
import './TeamMembers.css'

// Export Template for use in CMS preview
export const TeamMembersTemplate = ({ title, popoutBanner, members, body, footerSettings }) => {

  console.log(body)

  return (
    <main className="TeamMembers background-dots">
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <PageHeader 
        title={title} 
      />
      <section className="section team-content">
        <div className="container content">
          <Content source={body} />
        </div>
      </section>
      <section className='about-team background-clouds'>
        <div className='container'>
          <h3>Our Teachers and Educators</h3>
          <MemberSlider members={members} />
        </div>  
      </section>  
      {popoutBanner && (
        <PopoutBanner image={popoutBanner.image} title={popoutBanner.title} />
      )}
      <div className="section thin JoinBannerSection">
        <div className="container">
          <JoinBanner linkTo="/" />
        </div>
      </div>
      <div className="section thin">
        <div className="container">
          <ExceedBanner footerSettings={footerSettings} />
        </div>
      </div>
    </main>
  )
}

const TeamMembers = ({ data: { page, footerSettings } }) => (
  <TeamMembersTemplate {...page} {...page.frontmatter} body={page.html} footerSettings={footerSettings} />
)

export default TeamMembers

export const pageQuery = graphql`
  query TeamMembers($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      html
      rawMarkdownBody
      frontmatter {
        title
        members {
          description
          excerpt
          name
          title
          image {
            ...SmallImage
          }
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
