export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Irvale Studio',
    description: 'Where luxury brands meet their digital moment.',
    email: 'hello@irvale.studio',
    url: 'https://irvale.studio',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'London',
      addressCountry: 'United Kingdom',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceSchema() {
  const services = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Essentials',
      description:
        'Bespoke web design for luxury brands. Includes custom design, clean development, and foundational SEO.',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Irvale Studio',
        url: 'https://irvale.studio',
      },
      offers: {
        '@type': 'Offer',
        price: '6000',
        priceCurrency: 'GBP',
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: '6000',
          priceCurrency: 'GBP',
          description: 'Starting from',
        },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Signature',
      description:
        'Premium web design with advanced interactions, CMS integration, and SEO strategy for luxury hospitality brands.',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Irvale Studio',
        url: 'https://irvale.studio',
      },
      offers: {
        '@type': 'Offer',
        price: '12000',
        priceCurrency: 'GBP',
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: '12000',
          priceCurrency: 'GBP',
          description: 'Starting from',
        },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Elite',
      description:
        'Full-scope digital experience including bespoke design, advanced development, SEO, and AI Visibility for luxury brands.',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Irvale Studio',
        url: 'https://irvale.studio',
      },
      offers: {
        '@type': 'Offer',
        price: '22000',
        priceCurrency: 'GBP',
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: '22000',
          priceCurrency: 'GBP',
          description: 'Starting from',
        },
      },
    },
  ];

  return (
    <>
      {services.map((service, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
        />
      ))}
    </>
  );
}

export function FAQPageSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How long does a typical project take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Essentials projects take around 5 weeks, Signature around 8\u201310 weeks, and Elite projects 12\u201316 weeks. Timelines depend on content readiness and feedback speed.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you work with brands outside hospitality?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our expertise is deepest in luxury hospitality, wellness, and private membership. If your brand shares those values of quality and exclusivity, we\'re open to a conversation.',
        },
      },
      {
        '@type': 'Question',
        name: 'What\'s included in the retainer pricing?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Retainers cover ongoing maintenance, performance monitoring, content updates, and priority support. SEO and AI Visibility retainers include monthly strategy and optimisation work.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I start with Essentials and upgrade later?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely. We build every site with scalability in mind. Many clients start with Essentials and move to Signature or Elite as their needs grow.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you handle content and photography?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We offer photography direction as an add-on and can recommend trusted collaborators. For copy, we provide guidance and structure \u2014 you bring the brand voice, we shape it for the web.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is AI Visibility?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'AI Visibility ensures your brand appears in AI-generated recommendations (ChatGPT, Gemini, Perplexity). It\'s the next evolution of search \u2014 and most brands aren\'t prepared for it. Our Elite tier includes it by default.',
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function CreativeWorkSchema({ name, description, image, datePublished }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name,
    description,
    image,
    datePublished,
    author: {
      '@type': 'Organization',
      name: 'Irvale Studio',
      url: 'https://irvale.studio',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
