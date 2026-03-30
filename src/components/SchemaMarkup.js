export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Irvale Studio',
    description: 'Premium software solutions for hospitality, wellness & professional services.',
    email: 'jacobmhorgan@gmail.com',
    url: 'https://irvale.studio',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Chiang Mai',
      addressCountry: 'Thailand',
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
      name: 'Essential Website Build',
      description:
        'Up to 5 custom-designed pages with responsive design, speed optimisation, SSL, domain hosting, contact form, and on-page SEO foundations.',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Irvale Studio',
        url: 'https://irvale.studio',
      },
      offers: {
        '@type': 'Offer',
        price: '22000',
        priceCurrency: 'THB',
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: '22000',
          priceCurrency: 'THB',
          description: 'One-time project fee',
        },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Professional Website Build',
      description:
        'Up to 12 custom-designed pages with responsive design, speed optimisation, SSL, domain hosting, CTA integration, full on-page SEO and Schema markup.',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Irvale Studio',
        url: 'https://irvale.studio',
      },
      offers: {
        '@type': 'Offer',
        price: '35000',
        priceCurrency: 'THB',
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: '35000',
          priceCurrency: 'THB',
          description: 'One-time project fee',
        },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Premium Website Build',
      description:
        'Unlimited pages with full SEO suite, AI search optimisation, multi-language support, staff admin portal, e-commerce, API integrations, and custom automations.',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Irvale Studio',
        url: 'https://irvale.studio',
      },
      offers: {
        '@type': 'Offer',
        price: '58000',
        priceCurrency: 'THB',
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: '58000',
          priceCurrency: 'THB',
          description: 'Starting from',
        },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Managed Hosting & Maintenance',
      description:
        'Managed cloud hosting with SSL, weekly backups, security monitoring, monthly updates, and content change support.',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Irvale Studio',
        url: 'https://irvale.studio',
      },
      offers: {
        '@type': 'Offer',
        price: '1000',
        priceCurrency: 'THB',
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: '1000',
          priceCurrency: 'THB',
          unitText: 'MONTH',
          description: 'Monthly retainer',
        },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Growth Hosting & Maintenance',
      description:
        'Managed cloud hosting with daily backups, malware scanning, performance monitoring, dedicated account manager, and 5 hours of content changes per month.',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Irvale Studio',
        url: 'https://irvale.studio',
      },
      offers: {
        '@type': 'Offer',
        price: '2000',
        priceCurrency: 'THB',
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: '2000',
          priceCurrency: 'THB',
          unitText: 'MONTH',
          description: 'Monthly retainer',
        },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Premium Hosting & Maintenance',
      description:
        'Managed cloud hosting with daily backups, offsite redundancy, web application firewall, unlimited content changes, real-time monitoring, and a dedicated engineer.',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Irvale Studio',
        url: 'https://irvale.studio',
      },
      offers: {
        '@type': 'Offer',
        price: '3500',
        priceCurrency: 'THB',
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: '3500',
          priceCurrency: 'THB',
          unitText: 'MONTH',
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
        name: 'How long does a website build take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Essential sites are typically delivered within 2\u20133 weeks. Professional builds take around 4\u20136 weeks. Premium projects vary based on scope \u2014 we provide a detailed timeline after our initial consultation.',
        },
      },
      {
        '@type': 'Question',
        name: 'What does the monthly hosting subscription cover?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Your hosting fee covers managed cloud hosting, SSL certificate, automated backups, security monitoring, software updates, content changes, and customer support. Think of it as your entire web presence, professionally managed.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is Zatrovo?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Zatrovo is our proprietary booking and scheduling platform built specifically for professional service businesses in Southeast Asia. We handle the full setup, embed it into your website, and support you throughout. Every tier includes a dedicated admin panel.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I upgrade my plan later?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely. We build every site with scalability in mind. Many clients start with Essential and move to Professional as their business grows. The same applies to hosting and Zatrovo tiers \u2014 upgrading is seamless.',
        },
      },
      {
        '@type': 'Question',
        name: 'What if I need changes to my website?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Content edits are included in every hosting plan \u2014 from 2 hours per month on Managed up to unlimited changes on Premium. For larger structural changes or new features, we provide a clear quote before any work begins.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I own my website?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. You own all custom design and content created for your site. The monthly hosting subscription covers the infrastructure, maintenance, and support that keeps it running.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the payment terms?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Website builds are invoiced 50% upfront and 50% on launch day. Monthly subscriptions (hosting and Zatrovo) can be cancelled at any time and continue until the end of the billing month. All prices are in Thai Baht (THB) and exclude VAT where applicable.',
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
