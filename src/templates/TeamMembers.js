import React, { Fragment } from 'react'
import Helmet from 'react-helmet'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
import MemberSlider from '../components/MemberSlider'
import PopoutBanner from '../components/PopoutBanner'
import './TeamMembers.css'

// Export Template for use in CMS preview
export const TeamMembersTemplate = ({ title, popoutBanner, members, body }) => {

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
    </main>
  )
}

const TeamMembers = ({ data: { page } }) => (
  <TeamMembersTemplate {...page} {...page.frontmatter} body={page.html} />
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
  }
`
