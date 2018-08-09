import React, { Fragment } from 'react'
import Helmet from 'react-helmet'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
import ReferFriendForm from '../components/ReferFriendForm'
// import './DownloadPage.css'

// Export Template for use in CMS preview
export const ReferFriendTemplate = ({
  title,
  subtitle,
  body
}) => {

  return (
    <main className="DownloadPage background-dots">
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <PageHeader title={title} subtitle={subtitle} />

      <section className="section">
        <div className="container content">
          <Content source={body} />
        </div>  
        <ReferFriendForm />    
      </section>
    </main>
  )
}

const ReferFriend = ({ data: { page } }) => (
  <ReferFriendTemplate {...page} {...page.frontmatter} body={page.html} />
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
  }
`
