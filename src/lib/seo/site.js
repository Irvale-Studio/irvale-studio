// Schema spec version: 2026-05-06

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://irvale.com';

export const BRAND = {
  name: 'Irvale Studio',
  legalName: 'Irvale Studio Ltd',
  logo: `${SITE_URL}/brand/irvale-logo-mark.png`, // square 600x600
  description:
    'UK + Chiang Mai hybrid digital studio engineering revenue systems for SMBs — websites, AI visibility, conversion, reviews, paid media, and APAC market entry.',
  email: 'hello@irvale.com',
  founders: [{ slug: 'jacob-horgan' }],
  sameAs: [
    'https://www.linkedin.com/company/irvale-studio',
    'https://github.com/jakesjacob',
    // 'https://x.com/...',
  ],
  addresses: [
    { city: 'London', country: 'GB', region: 'Greater London' },
    { city: 'Chiang Mai', country: 'TH', region: 'Chiang Mai' },
  ],
  priceRange: '$$$', // luxury studio
  defaultLanguages: ['en-GB', 'en'],
};

export const absUrl = (path = '/') =>
  path.startsWith('http')
    ? path
    : `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
