import React from 'react'

// Export Template for use in CMS preview
export const ThankYouPageTemplate = ({

}) => {

  return <main className="ThankYou">
  </main>
}

// Export Default HomePage for front-end
const ThankYouPage = ({ data: { markdownRemark } }) => (
  <ThankYouPageTemplate {...markdownRemark.frontmatter}/>
)
export default ThankYouPage

export const pageQuery = graphql`
  query ThankYouPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
      }
    }
  }
`
