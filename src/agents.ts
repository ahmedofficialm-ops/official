export type MarketingAgent = {
  name: string
  title: string
  summary: string
  skills: string[]
}

export const MARKETING_AGENTS: MarketingAgent[] = [
  {
    name: 'product-marketer',
    title: 'Product marketer',
    summary:
      'Owns ICP, positioning, and .agents/product-marketing.md. Run this first.',
    skills: ['product-marketing'],
  },
  {
    name: 'cro-specialist',
    title: 'CRO specialist',
    summary: 'Pages, signup, onboarding, popups, and paywalls.',
    skills: ['cro', 'signup', 'onboarding', 'popups', 'paywalls'],
  },
  {
    name: 'copywriter',
    title: 'Copywriter',
    summary: 'Site copy, emails, social, SMS, image and video scripts.',
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
    name: 'seo-specialist',
    title: 'SEO specialist',
    summary: 'SEO, AI search, schema, architecture, ASO, comparison pages.',
    skills: [
      'seo-audit',
      'ai-seo',
      'programmatic-seo',
      'site-architecture',
      'schema',
      'aso',
      'content-strategy',
      'competitors',
    ],
  },
  {
    name: 'paid-media',
    title: 'Paid media',
    summary: 'Ads, creative, events, influencers, PR, directories.',
    skills: [
      'ads',
      'ad-creative',
      'events',
      'influencer-marketing',
      'public-relations',
      'directory-submissions',
    ],
  },
  {
    name: 'analytics-specialist',
    title: 'Analytics',
    summary: 'Tracking, experiments, and attribution.',
    skills: ['analytics', 'ab-testing', 'attribution'],
  },
  {
    name: 'growth-retention',
    title: 'Growth & retention',
    summary: 'Referrals, churn, magnets, community, co-marketing.',
    skills: [
      'referrals',
      'churn-prevention',
      'lead-magnets',
      'free-tools',
      'community-marketing',
      'co-marketing',
    ],
  },
  {
    name: 'gtm-sales',
    title: 'GTM & sales',
    summary: 'Launch, pricing, offers, RevOps, enablement, prospecting.',
    skills: [
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
    name: 'marketing-strategist',
    title: 'Strategist',
    summary: 'Plans, ideas, research, psychology, and marketing loops.',
    skills: [
      'marketing-plan',
      'marketing-ideas',
      'marketing-psychology',
      'customer-research',
      'marketing-loops',
    ],
  },
  {
    name: 'marketing-council',
    title: 'Council',
    summary: 'Simulated advisory board. Read-only debate, then hand off.',
    skills: ['marketing-council'],
  },
]
