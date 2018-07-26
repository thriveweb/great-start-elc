import React from 'react'
import CMS from 'netlify-cms'
import './cms-utils'

import { HomePageTemplate } from '../templates/HomePage'
import { DefaultPageTemplate } from '../templates/DefaultPage'
import { CentreTemplate } from '../templates/Centre'
import { HealthInfoPageTemplate } from '../templates/HealthInfoPage'
import { FamilyChecklistTemplate } from '../templates/FamilyChecklist'

CMS.registerPreviewStyle('/styles.css')

CMS.registerPreviewTemplate('home-page', ({ entry }) => (
  <HomePageTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('defaultPages', ({ entry }) => (
  <DefaultPageTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('centres', ({ entry }) => (
  <CentreTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('health-info-page', ({ entry }) => (
  <HealthInfoPageTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('family-checklist', ({ entry }) => (
  <FamilyChecklistTemplate {...entry.toJS().data} />
))
