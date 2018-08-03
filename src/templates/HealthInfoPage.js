import React, { Fragment } from 'react'
import Helmet from 'react-helmet'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
import Accordion from '../components/Accordion'
import Table from '../components/Table'
import './HealthInfoPage.css'

// Export Template for use in CMS preview
export const HealthInfoPageTemplate = ({
  title,
  subtitle,
  featuredImage,
  downloadBanner,
  popoutBanner,
  accordion,
  body,
  lowerSection,
  table
}) => (
  <main className="HealthInfoPage">
    <Helmet>
      <title>{title}</title>
    </Helmet>

    <PageHeader title={title} subtitle={subtitle} />

    <section className="section">
      <div className="container content">
        <Content source={body} />
      </div>
    </section>

    <section>
      <div className="container content">
        <Table
          headings={table.headings.map(item => item.heading)}
          items={table.items}
        />
      </div>
    </section>

    <section className="section">
      <div className="container content">
        <Content source={lowerSection} />
      </div>
      {accordion && (
        <Fragment>
          <br />
          <br />
          <div className="container content">
            <Accordion items={accordion} />
          </div>
        </Fragment>
      )}
    </section>
  </main>
)

const HealthInfoPage = ({ data }) => {
  const { markdownRemark: page } = data

  return (
    <HealthInfoPageTemplate {...page} {...page.frontmatter} body={page.html} />
  )
}

export default HealthInfoPage

export const pageQuery = graphql`
  query HealthInfoPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        subtitle
        lowerSection
        table {
          headings {
            heading
          }
          items {
            cell1
            cell2
          }
        }
        accordion {
          title
          content
        }
      }
    }
  }
`
