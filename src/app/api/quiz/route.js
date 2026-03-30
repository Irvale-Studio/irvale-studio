import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const NOTIFY_EMAIL = 'jacobmhorgan@gmail.com';
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'noreply@irvale.studio';

const BUSINESS_LABELS = {
  fitness: 'Fitness / Gym',
  tourism: 'Tourism / Travel',
  retail: 'Retail / E-commerce',
  restaurant: 'Restaurant / F&B',
  wellness: 'Wellness / Spa',
  services: 'Professional Services',
  other: 'Business',
};

const WEBSITE_TIERS = {
  small: {
    packageName: 'Essential Website',
    price: '฿22,000',
    priceNote: 'one-time',
    baseServices: [
      'Up to 5 custom-designed pages',
      'Responsive design — mobile, tablet, desktop',
      'Speed optimisation & SSL security',
      'Contact form integration',
      'On-page SEO foundations',
      '2 rounds of revisions',
    ],
  },
  medium: {
    packageName: 'Professional Website',
    price: '฿35,000',
    priceNote: 'one-time',
    baseServices: [
      'Up to 12 custom-designed pages',
      'Responsive design — mobile, tablet, desktop',
      'Speed optimisation & SSL security',
      'Contact forms & CTA integration',
      'Full on-page SEO + Schema markup',
      '3 rounds of revisions',
    ],
  },
  large: {
    packageName: 'Premium Website',
    price: '฿58,000+',
    priceNote: 'one-time',
    baseServices: [
      'Unlimited pages — full scope build',
      'Responsive design & Core Web Vitals tuned',
      'Advanced forms, CTAs & booking integration',
      'Full SEO suite — on-page, Schema & local SEO',
      'AI search optimisation (ChatGPT, Gemini, Perplexity)',
      'Multi-language support (e.g. English & Thai)',
      'E-commerce & online payment flows',
      'CRM & third-party API integrations',
      'Unlimited revisions during build',
    ],
  },
};

const ADDONS = {
  booking: {
    name: 'Zatrovo Booking System',
    description: 'Online booking, class scheduling, member management, and payments — from ฿1,800/mo',
  },
  ecommerce: {
    name: 'E-commerce & Payments',
    description: 'Stripe & Omise integration, multi-currency support, product management',
  },
  ai: {
    name: 'AI Search Visibility',
    description: 'Get recommended by ChatGPT, Gemini & Perplexity — from ฿2,500/mo',
  },
  hosting: {
    name: 'Managed Hosting & Maintenance',
    description: 'Cloud hosting, backups, security monitoring, content updates — from ฿1,000/mo',
  },
  email: {
    name: 'Email Marketing',
    description: 'Campaign design, automation sequences, list management — from ฿3,500/mo',
  },
};

const INSIGHTS = {
  fitness: 'Fitness studios that move to online booking typically see 80%+ of bookings shift online within the first month — freeing up hours of daily admin. BOXX Thailand saw exactly this with their Zatrovo integration.',
  tourism: 'Tour operators with online booking and multi-currency payments capture significantly more international customers. Chiang Mai Go Tours went from WhatsApp-only to 35+ tours bookable online.',
  restaurant: 'Restaurants with online ordering and Google Maps optimisation typically see 2-3x more foot traffic within 90 days.',
  wellness: 'Wellness businesses with streamlined online booking and active AI visibility capture significantly more walk-in and tourist bookings.',
  services: 'Service providers with optimised websites and AI search visibility generate 3-5x more qualified leads than those relying on word of mouth alone.',
  retail: 'Retail businesses with e-commerce websites and integrated payments typically see 40-60% of revenue shift online within the first quarter.',
  other: 'Businesses that invest in a professional website and online visibility consistently outperform competitors still relying on word of mouth alone.',
};

function generatePlan(answers) {
  const { business, needs, scale, businessName } = answers;

  const tier = (scale === 'unsure' || !scale) ? 'medium' : scale;
  const businessType = business || 'services';
  const selectedNeeds = needs || [];

  const pkg = WEBSITE_TIERS[tier];
  const services = [...pkg.baseServices];

  const addons = selectedNeeds
    .filter(need => need !== 'website' && need !== 'other' && ADDONS[need])
    .map(need => ADDONS[need]);

  if (addons.length > 0) {
    services.push('');
    services.push('--- RECOMMENDED ADD-ONS ---');
    addons.forEach(addon => {
      services.push(`${addon.name} — ${addon.description}`);
    });
  }

  const label = BUSINESS_LABELS[businessType] || 'Business';
  const name = businessName?.trim() || `Your ${label}`;

  return {
    headline: `Technical Plan for ${name}`,
    packageName: pkg.packageName,
    price: `${pkg.price} ${pkg.priceNote}`,
    services,
    insight: INSIGHTS[businessType] || null,
  };
}

// ── Email templates ──

function buildLeadNotificationHtml(answers, plan) {
  const { email, businessName, business, needs, channels, scale } = answers;
  const businessLabel = BUSINESS_LABELS[business] || business || 'Not specified';
  const needsList = (needs || []).join(', ') || 'Not specified';
  const channelsList = (channels || []).join(', ') || 'Not specified';
  const scaleLabel = scale || 'Not specified';

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
      <h2 style="color: #C9A96E; margin-bottom: 4px;">New Technical Plan Lead</h2>
      <p style="color: #666; margin-top: 0;">Someone completed the quiz on irvale.studio</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px 0; color: #999; width: 140px;">Business Name</td><td style="padding: 8px 0; color: #333; font-weight: 600;">${businessName || 'Not provided'}</td></tr>
        <tr><td style="padding: 8px 0; color: #999;">Email</td><td style="padding: 8px 0; color: #333; font-weight: 600;"><a href="mailto:${email}" style="color: #C9A96E;">${email}</a></td></tr>
        <tr><td style="padding: 8px 0; color: #999;">Business Type</td><td style="padding: 8px 0; color: #333;">${businessLabel}</td></tr>
        <tr><td style="padding: 8px 0; color: #999;">Needs</td><td style="padding: 8px 0; color: #333;">${needsList}</td></tr>
        <tr><td style="padding: 8px 0; color: #999;">Current Channels</td><td style="padding: 8px 0; color: #333;">${channelsList}</td></tr>
        <tr><td style="padding: 8px 0; color: #999;">Project Scale</td><td style="padding: 8px 0; color: #333;">${scaleLabel}</td></tr>
      </table>
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
      <h3 style="color: #333; margin-bottom: 8px;">Recommended: ${plan.packageName}</h3>
      <p style="color: #C9A96E; font-size: 18px; font-weight: 600; margin: 0 0 16px;">${plan.price}</p>
      <ul style="padding-left: 20px; color: #555;">
        ${plan.services.filter(s => s && !s.startsWith('---')).map(s => `<li style="padding: 4px 0;">${s}</li>`).join('')}
      </ul>
    </div>
  `;
}

function buildClientPlanHtml(answers, plan) {
  const { businessName } = answers;
  const name = businessName?.trim() || 'there';

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #111; color: #F0EDE6;">
      <div style="text-align: center; padding: 32px 0 24px;">
        <p style="color: #C9A96E; font-size: 12px; text-transform: uppercase; letter-spacing: 3px; margin: 0 0 8px;">Irvale Studio</p>
        <h1 style="color: #F0EDE6; font-size: 24px; font-weight: 400; margin: 0;">Your Technical Plan</h1>
      </div>
      <div style="background: #1A1A1A; border: 1px solid #2A2A2A; border-radius: 12px; padding: 32px; margin-bottom: 24px;">
        <p style="color: #9A9590; margin: 0 0 4px;">Hi ${name},</p>
        <p style="color: #F0EDE6; font-size: 13px; line-height: 1.7; margin: 0 0 24px;">Thanks for completing the quiz. Based on your answers, here's what we'd recommend:</p>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <h2 style="color: #F0EDE6; font-size: 20px; font-weight: 600; margin: 0;">${plan.packageName}</h2>
          <span style="color: #C9A96E; font-size: 18px; font-weight: 600;">${plan.price}</span>
        </div>
        ${plan.services.filter(s => s).map(s => {
          if (s.startsWith('---')) {
            return `<p style="color: #C9A96E; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin: 24px 0 12px; border-top: 1px solid #2A2A2A; padding-top: 16px;">Recommended Add-ons</p>`;
          }
          return `<div style="display: flex; align-items: flex-start; gap: 10px; padding: 6px 0;"><span style="color: #C9A96E;">&#10003;</span><span style="color: #9A9590; font-size: 13px; line-height: 1.5;">${s}</span></div>`;
        }).join('')}
        ${plan.insight ? `
          <div style="background: #111; border: 1px solid #2A2A2A; border-radius: 8px; padding: 16px; margin-top: 24px;">
            <p style="color: #9A9590; font-size: 13px; font-style: italic; line-height: 1.6; margin: 0;">${plan.insight}</p>
          </div>
        ` : ''}
      </div>
      <div style="text-align: center; padding: 16px 0 32px;">
        <a href="https://irvale-studio.zatrovo.com/book" style="display: inline-block; background: #C9A96E; color: #111; text-decoration: none; padding: 14px 32px; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border-radius: 4px;">Book a Free Consultation</a>
        <p style="color: #9A9590; font-size: 12px; margin: 16px 0 0;">Or reply to this email — we respond within 24 hours.</p>
      </div>
      <hr style="border: none; border-top: 1px solid #2A2A2A; margin: 0 0 16px;" />
      <p style="color: #555; font-size: 11px; text-align: center; margin: 0;">Irvale Studio · jacobmhorgan@gmail.com</p>
    </div>
  `;
}

export async function POST(request) {
  try {
    const answers = await request.json();

    if (!answers || typeof answers !== 'object') {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const plan = generatePlan(answers);

    // Send emails if Resend is configured
    if (resend) {
      const emailPromises = [];

      emailPromises.push(
        resend.emails.send({
          from: `Irvale Studio <${FROM_EMAIL}>`,
          to: NOTIFY_EMAIL,
          subject: `New Lead: ${answers.businessName || 'Unknown'} — ${plan.packageName}`,
          html: buildLeadNotificationHtml(answers, plan),
        }).catch(err => console.error('Failed to send lead notification:', err))
      );

      if (answers.email) {
        emailPromises.push(
          resend.emails.send({
            from: `Irvale Studio <${FROM_EMAIL}>`,
            to: answers.email,
            subject: `Your Technical Plan — ${plan.packageName}`,
            html: buildClientPlanHtml(answers, plan),
            replyTo: NOTIFY_EMAIL,
          }).catch(err => console.error('Failed to send client plan:', err))
        );
      }

      Promise.all(emailPromises);
    }

    return NextResponse.json(plan);
  } catch (error) {
    console.error('Quiz API error:', error);
    return NextResponse.json({ error: 'Failed to generate plan' }, { status: 500 });
  }
}
