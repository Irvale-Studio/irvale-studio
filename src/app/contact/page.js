import ContactForm from '@/components/ContactForm';
import { LocalBusinessSchema } from '@/components/SchemaMarkup';

export const metadata = {
  title: 'Contact · Irvale Studio',
  description: 'Tell us about your brand. We respond within 24 hours.',
};

export default function ContactPage() {
  return (
    <main>
      <LocalBusinessSchema />
      <ContactForm />
    </main>
  );
}
