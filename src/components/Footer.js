import React, { Fragment } from 'react'

import JoinBanner from '../components/JoinBanner'
import FamilyHandbookSection from '../components/FamilyHandbookSection'
import ExceedBanner from '../components/ExceedBanner'
import './Footer.css'

export default ({
  showHandbook = false,
  simple = false,
  showExceedBannerLong = false,
  globalSettings = {},
  footerSettings = {},
  ...props
}) => {
  const { siteTitle } = globalSettings
  return (
    <Fragment>
      {!simple && (
        <Fragment>
          <div className="section thin JoinBannerSection">
            <div className="container">
              <JoinBanner linkTo="/" />
            </div>
          </div>

          {showHandbook &&
            footerSettings && (
              <FamilyHandbookSection
                image={footerSettings.handbookImage}
                file={footerSettings.handbookFile}
              />
            )}

          <div className="section thin">
            <div className="container">
              <ExceedBanner long={showExceedBannerLong} />
            </div>
          </div>
        </Fragment>
      )}

      <footer className="Footer">
        <div className="Footer--upper">
          <div className="container Footer--upper--container">
            <div className="Footer--column">
              <div className="Footer--column--title">East Malvern</div>
              <a href="" className="Footer--email noDecoration colorInherit">
                email@email.com
              </a>
              <a href="" className="Footer--phone noDecoration colorInherit">
                01 234 567
              </a>
              <a href="" className="Footer--view colorInherit">
                View Centre
              </a>
            </div>
            <div className="Footer--column">
              <div className="Footer--column--title">East Malvern</div>
              <a href="" className="Footer--email noDecoration colorInherit">
                email@email.com
              </a>
              <a href="" className="Footer--phone noDecoration colorInherit">
                01 234 567
              </a>
              <a href="" className="Footer--view colorInherit">
                View Centre
              </a>
            </div>
            <div className="Footer--column">
              <div className="Footer--column--title">East Malvern</div>
              <a href="" className="Footer--email noDecoration colorInherit">
                email@email.com
              </a>
              <a href="" className="Footer--phone noDecoration colorInherit">
                01 234 567
              </a>
              <a href="" className="Footer--view colorInherit">
                View Centre
              </a>
            </div>
            <div className="Footer--column">
              <div className="Footer--column--title">
                Sign up for Centre Newsletter
              </div>
            </div>
          </div>
        </div>

        <div className="Footer--lower">
          <div className="container taCenter">
            © {new Date().getFullYear()} {siteTitle} | Web Design by{' '}
            <a
              href="https://thriveweb.com.au"
              target="_blank"
              className="colorInherit"
              rel="noopener noreferrer"
            >
              Thrive
            </a>
          </div>
        </div>
      </footer>
    </Fragment>
  )
}
