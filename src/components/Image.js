import React from 'react'
import { graphql } from 'gatsby'
import GatsbyImage from 'gatsby-image'
import PropTypes from 'prop-types'
import _get from 'lodash/get'

import { extractChildImageSharp } from '../utils'
import './Image.css'

// Not lazy yet

class Image extends React.Component {
  static defaultProps = {
    lazy: false
  }

  render() {
    let {
      className = '',
      src,
      srcSet,
      source,
      sizes,
      // lazy,
      onClick,
      alt
    } = this.props

    const fluid = extractChildImageSharp(src, 'fluid')
    const fixed = extractChildImageSharp(src, 'fixed')
    const imageSrcSet = srcSet || extractChildImageSharp(src, 'srcSet')
    const imageSrc = extractChildImageSharp(src || source)

    if (fluid || fixed) {
      return (
        <GatsbyImage
          className={`Image ${className}`}
          fluid={fluid}
          fixed={fixed}
          onClick={onClick}
          alt={alt}
        />
      )
    }

    return (
      <img
        className={`Image loaded ${className}`}
        src={imageSrc}
        srcSet={imageSrcSet}
        sizes={sizes || '100vw'}
        onClick={onClick}
        alt={alt}
      />
    )
  }
}

Image.propTypes = {
  alt: PropTypes.string.isRequired
}

export default Image

export const query = graphql`
  fragment LargeImage on File {
    publicURL
    childImageSharp {
      fluid(maxWidth: 1800) {
        ...GatsbyImageSharpFluid_withWebp_tracedSVG
      }
    }
  }
  fragment MediumImage on File {
    publicURL
    childImageSharp {
      fluid(maxWidth: 1800) {
        ...GatsbyImageSharpFluid_withWebp_tracedSVG
      }
    }
  }
  fragment SmallImage on File {
    publicURL
    childImageSharp {
      fluid(maxWidth: 400) {
        ...GatsbyImageSharpFluid_withWebp_tracedSVG
      }
    }
  }
`
