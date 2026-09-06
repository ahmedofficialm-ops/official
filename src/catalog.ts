export type SkillSummary = {
  name: string
  description: string
  version: string
  category: string
  related: string[]
  body: string
}

export const CATEGORIES: { id: string; label: string; skills: string[] }[] = [
  {
    id: 'conversion',
    label: 'Conversion',
    skills: ['cro', 'signup', 'onboarding', 'popups', 'paywalls'],
  },
  {
    id: 'copy',
    label: 'Content & copy',
    skills: [
      'copywriting',
      'copy-editing',
      'cold-email',
      'emails',
      'social',
      'sms',
      'image',
      'video',
    ],
  },
  {
    id: 'seo',
    label: 'SEO & discovery',
    skills: [
      'seo-audit',
      'ai-seo',
      'programmatic-seo',
      'site-architecture',
      'competitors',
      'schema',
      'aso',
      'content-strategy',
    ],
  },
  {
    id: 'paid',
    label: 'Paid & distribution',
    skills: [
      'ads',
      'ad-creative',
      'events',
      'influencer-marketing',
      'directory-submissions',
      'public-relations',
    ],
  },
  {
    id: 'measure',
    label: 'Measurement',
    skills: ['analytics', 'ab-testing', 'attribution'],
  },
  {
    id: 'growth',
    label: 'Growth & retention',
    skills: [
      'churn-prevention',
      'referrals',
      'free-tools',
      'lead-magnets',
      'community-marketing',
      'co-marketing',
    ],
  },
  {
    id: 'gtm',
    label: 'Sales & GTM',
    skills: [
      'product-marketing',
      'launch',
      'pricing',
      'offers',
      'revops',
      'sales-enablement',
      'prospecting',
      'competitor-profiling',
    ],
  },
  {
    id: 'strategy',
    label: 'Strategy',
    skills: [
      'marketing-ideas',
      'marketing-psychology',
      'marketing-plan',
      'marketing-loops',
      'marketing-council',
      'customer-research',
    ],
  },
]

export const INSTALL_COMMAND = 'npx skills add ahmedofficialm-ops/official'
export const REPO_URL = 'https://github.com/ahmedofficialm-ops/official'
export const UPSTREAM_URL = 'https://github.com/coreyhaines31/marketingskills'

export function categoryFor(name: string): string {
  const found = CATEGORIES.find((c) => c.skills.includes(name))
  return found?.label ?? 'Other'
}

export function shortDescription(description: string): string {
  const cut = description.split('. Also use')[0].split('. Use this')[0]
  return cut.length > 180 ? `${cut.slice(0, 177).trim()}…` : cut
}
