import React from 'react'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
import BreakoutBox from '../components/BreakoutBox'
import Button from '../components/Button'
import GoogleMaps from '../components/GoogleMaps'
import DownloadForm from '../components/DownloadForm'
import ExceedBanner from '../components/ExceedBanner'
import './ContactPage.css'

import Helmet from 'react-helmet'


// Export Template for use in CMS preview
export const ContactPageTemplate = ({
  body,
  title,
  featuredImage,
  centres = [],
  footerSettings
}) => (
  <main className="Contact">
    <PageHeader title={title} backgroundImage={featuredImage} />

    <div className="section Contact--Section1">
      <div className="container content Contact--Section1--Container">
        <Content source={body} />
      </div>

      <div className="container Contact--Centres">
        <Helmet>
          <script
            async
            defer
            src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyARcDElAI3_4wBfjMmPIU_pXmzOlKobLHE&callback=initMap`}
          />
        </Helmet>
        {centres && centres.map(({ title, centreDetails = {} }) => {
           
           if(!centreDetails) return null

           return <BreakoutBox title={title} key={title}>
              {centreDetails.openingHours && (
                <p>
                  <strong>Open Hours</strong>
                  <br />
                  {centreDetails.openingHours}
                </p>
              )}
              {centreDetails.location && (
                <div className='location'>
                  <p>
                    <strong>Centre Location</strong>
                    <br />
                    {centreDetails.location}
                  </p>
                  {/*<GoogleMaps lat={parseFloat(centreDetails.latitude)} lng={parseFloat(centreDetails.longitude)} styles={'[{"featureType": "all", "elementType": "labels", "stylers": [{"visibility": "off"}]},{"featureType": "administrative", "elementType": "all", "stylers": [{"visibility": "off"},{"color": "#efebe2"}]},{"featureType": "landscape", "elementType": "all", "stylers": [{"color": "#efebe2"}]},{"featureType": "poi", "elementType": "all", "stylers": [{"color": "#efebe2"}]},{"featureType": "poi.attraction", "elementType": "all", "stylers": [{"color": "#efebe2"}]},{"featureType": "poi.business", "elementType": "all", "stylers": [{"color": "#efebe2"}]},{"featureType": "poi.government", "elementType": "all", "stylers": [{"color": "#dfdcd5"}]},{"featureType": "poi.medical", "elementType": "all", "stylers": [{"color": "#D9CBAA"}]},{"featureType": "poi.park", "elementType": "all", "stylers": [{"color": "#f1f1f1"}]},{"featureType": "poi.place_of_worship", "elementType": "all", "stylers": [{"color": "#efebe2"}]},{"featureType": "poi.school", "elementType": "all", "stylers": [{"color": "#efebe2"}]},{"featureType": "poi.sports_complex", "elementType": "all", "stylers": [{"color": "#efebe2"}]},{"featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{"color": "#ffffff"}]},{"featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{"visibility": "off"}]},{"featureType": "road.arterial", "elementType": "geometry.fill", "stylers": [{"color": "#ffffff"}]},{"featureType": "road.arterial", "elementType": "geometry.stroke", "stylers": [{"visibility": "off"}]},{"featureType": "road.local", "elementType": "geometry.fill", "stylers": [{"color": "#fbfbfb"}]},{"featureType": "road.local", "elementType": "geometry.stroke", "stylers": [{"visibility": "off"}]},{"featureType": "transit", "elementType": "all", "stylers": [{"visibility": "off"}]},{"featureType": "water", "elementType": "all", "stylers": [{"color": "#a5d7e0"}]}]'} />*/}
                </div>
              )}
              {(centreDetails.email || centreDetails.phone) && (
                <div>
                  <strong>Contact Info</strong>
                  <br />
                  {centreDetails.phone && <p>T: {centreDetails.phone}</p>}
                  {centreDetails.email && <p>E: {centreDetails.email}</p>}
                </div>
              )}
              <br />
              <Button to={'/enrolments/enrolling-great-start-early-learing-centre/'}>Enrol Now</Button>
              <Button to={'/enrolments/book/'}>Book Tour</Button>
            </BreakoutBox>
          }
        )}
      </div>
      <DownloadForm />
      <div className="section thin">
        <div className="container">
          <ExceedBanner footerSettings={footerSettings} />
        </div>
      </div>
    </div>
  </main>
)

const ContactPage = ({ data }) => {
  const { page, footerSettings } = data
  return (
    <ContactPageTemplate
      body={page.html}
      {...page.frontmatter}
      centres={data.centres.edges.map(edge => ({
        ...edge.node,
        ...edge.node.frontmatter
      }))}
      footerSettings={footerSettings}
    />
  )
}

export default ContactPage

// Query for DefaultPage data
// Use GraphiQL interface (http://localhost:8000/___graphql)
// ID is processed via gatsby-node.js
export const pageQuery = graphql`
  query ContactPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
    centres: allMarkdownRemark(
      filter: { fields: { contentType: { regex: "/centre/" } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            centreDetails {
              email
              location
              latitude
              longitude
              openingHours
              phone
            }
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
