import _get from 'lodash/get'

export const extractChildImageSharp = (src = '', format) => {
  if (typeof src === 'string') return src
  const childImageSharp = _get(src, 'childImageSharp')
  if (!childImageSharp) return _get(src, 'publicURL')
  if (format === 'srcSet') return _get(src, 'childImageSharp.sizes.srcSet')
  if (format === 'webp') return _get(src, 'childImageSharp.sizes.srcWebp')
  return _get(src, 'childImageSharp.sizes.src')
}
