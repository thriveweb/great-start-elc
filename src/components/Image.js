import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'

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

    const imageSrcSet = srcSet || extractChildImageSharp(src, 'srcSet')
    const imageSrc = extractChildImageSharp(src || source)

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
      sizes(maxWidth: 1800) {
        src
        srcSet
        srcWebp
      }
    }
  }
  fragment MediumImage on File {
    publicURL
    childImageSharp {
      sizes(maxWidth: 800) {
        src
        srcSet
        srcWebp
      }
    }
  }
  fragment SmallImage on File {
    publicURL
    childImageSharp {
      sizes(maxWidth: 400) {
        src
        srcSet
        srcWebp
      }
    }
  }
`
