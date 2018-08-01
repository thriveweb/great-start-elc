import React, { Fragment } from 'react'
import Helmet from 'react-helmet'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
import PopoutBanner from '../components/PopoutBanner'
import './DefaultPage.css'

// Export Template for use in CMS preview
export const TeamMembersTemplate = ({
  title,
  subtitle,
  featuredImage,
  popoutBanner,
  body
}) => {
  return (
    <main className="TeamMembers background-dots">
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <PageHeader 
        title={title} 
        subtitle={subtitle} 
      />
      <section className="section">
        <div className="container content">
          <Content source={body} />
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
        members {
          description
          excerpt
          name
          title
        }
      }
    }
  }
`
