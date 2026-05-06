import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Contact · Irvale Studio',
  description: 'Tell us about your brand. We respond within 24 hours.',
};

// Note: LocalBusiness JSON-LD now emitted site-wide by the root layout
// (London + Chiang Mai ProfessionalService nodes). No page-level schema
// needed here.

export default function ContactPage() {
  return (
    <main>
      <ContactForm />
    </main>
  );
}
