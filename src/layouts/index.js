import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import 'modern-normalize/modern-normalize.css'

import './globalStyles.css'
import Meta from '../components/Meta'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import FamilyHandbookBanner from '../components/FamilyHandbookBanner'

export default ({ children, data }) => {
  const { footerSettings, globalSettings, centres, header } = data
  const { siteTitle, siteUrl, socialMediaCard, headerScripts } = globalSettings
  const { showHandbook = false, simpleFooter = false, downloadBanner } = data
  const allPages = data.allPages.edges.map(edge => edge.node)


  return (
    <Fragment>
      <Helmet defaultTitle={siteTitle} titleTemplate={`${siteTitle} | %s`}>
        <link
          href="https://fonts.googleapis.com/css?family=Montserrat:300,400,400i,600,700|Varela+Round"
          rel="stylesheet"
        />
      </Helmet>
      <Meta
        headerScripts={headerScripts}
        absoluteImageUrl={
          socialMediaCard &&
          socialMediaCard.image &&
          siteUrl + socialMediaCard.image
        }
      />

      <Nav allPages={allPages} header={header} />

      <Fragment>{children()}</Fragment>

      {downloadBanner && (
        <FamilyHandbookBanner
          file={downloadBanner.file}
          title={downloadBanner.title}
          preview={downloadBanner.preview}
        />
      )}

      <Footer
        showHandbook={showHandbook}
        simple={simpleFooter || !!downloadBanner}
        footerSettings={footerSettings}
        globalSettings={globalSettings}
        centres={centres}
      />
    </Fragment>
  )
}

export const query = graphql`
  query LayoutQuery {
    globalSettings: settingsYaml(id: { regex: "/global.yml/" }) {
      siteTitle
      headerScripts
    }

    footerSettings: settingsYaml(id: { regex: "/footer.yml/" }) {
      exceedText
      exceedTextLong
      exceedLogo
      handbookImage
    }

    header: settingsYaml {
      menu {
        title
        url
        subMenu {
          title
          url
        }
      }
    }

    centres: allMarkdownRemark( filter: { fields: { contentType: { regex: "/centre/" } } }) {
      edges {
        node {
          fields {
            slug          
          }
          frontmatter {
            title
            centreDetails {
              email
              phone
            }
          }
        }
      }
    }

    allPages: allMarkdownRemark {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
