import {
  Dumbbell, Globe, Building2, UtensilsCrossed, Sparkles,
  Search, Share2, MessageCircle, Users, HelpCircle,
  Code, Calendar, ShoppingBag, Mail,
  Shield, MoreHorizontal,
} from 'lucide-react';

export const QUIZ_CONFIG = {
  theme: {
    accent: '#C9A96E',
    accentHover: '#D9BC89',
    bg: '#111111',
    bgAlt: '#1A1A1A',
    text: '#F0EDE6',
    textMuted: '#9A9590',
    border: '#2A2A2A',
    cardBg: '#1A1A1A',
  },

  title: 'Free Technical Plan',

  steps: [
    {
      id: 'business',
      question: "What type of business are you?",
      subtitle: 'This helps us tailor your recommendation',
      type: 'single',
      options: [
        { value: 'fitness', label: 'Fitness / Gym', icon: Dumbbell },
        { value: 'tourism', label: 'Tourism / Travel', icon: Globe },
        { value: 'retail', label: 'Retail / E-commerce', icon: ShoppingBag },
        { value: 'restaurant', label: 'Restaurant / F&B', icon: UtensilsCrossed },
        { value: 'wellness', label: 'Wellness / Spa', icon: Sparkles },
        { value: 'services', label: 'Professional Services', icon: Building2 },
        { value: 'other', label: 'Other', icon: MoreHorizontal },
      ],
    },
    {
      id: 'needs',
      question: 'What do you need?',
      subtitle: 'Select all that apply',
      type: 'multi',
      options: [
        { value: 'website', label: 'A Website', icon: Code },
        { value: 'booking', label: 'Booking System', icon: Calendar },
        { value: 'ecommerce', label: 'Online Payments', icon: ShoppingBag },
        { value: 'ai', label: 'AI Search Visibility', icon: Search },
        { value: 'hosting', label: 'Hosting & Maintenance', icon: Shield },
        { value: 'email', label: 'Email Marketing', icon: Mail },
        { value: 'other', label: 'Other / Not Sure', icon: HelpCircle },
      ],
    },
    {
      id: 'channels',
      question: 'How do customers find you now?',
      subtitle: 'Select all that apply',
      type: 'multi',
      options: [
        { value: 'walkins', label: 'Walk-ins', icon: Users },
        { value: 'instagram', label: 'Instagram / Social', icon: Share2 },
        { value: 'google', label: 'Google / Maps', icon: Search },
        { value: 'wordofmouth', label: 'Word of Mouth', icon: MessageCircle },
        { value: 'notsure', label: 'Not Sure / Other', icon: HelpCircle },
      ],
    },
    {
      id: 'scale',
      question: "What's your budget?",
      subtitle: 'This helps us recommend the right package',
      type: 'single',
      options: [
        { value: 'small', label: 'Getting Started', sublabel: '$100 – $600' },
        { value: 'medium', label: 'Growing Business', sublabel: '$600 – $1,500' },
        { value: 'large', label: 'Full Platform', sublabel: '$1,500+' },
        { value: 'unsure', label: 'Not Sure Yet', sublabel: "Help me figure it out" },
      ],
    },
  ],

  emailStep: {
    headline: 'Almost there!',
    subtitle: "We'll send your custom technical plan here.",
    businessNamePlaceholder: 'Your business name',
    emailPlaceholder: 'Your email address',
    ctaLabel: 'Get My Free Plan',
    disclaimer: 'No spam, ever. Just your personalised technical plan.',
  },

  loading: {
    headline: 'Building Your Technical Plan',
    subtitle: 'Matching services to your needs...',
  },

  error: {
    message: "Something went wrong generating your plan.",
    fallbackMessage: "Book a free call and we'll put one together for you.",
    fallbackUrl: 'https://irvale-studio.zatrovo.com/book',
    fallbackLabel: 'Book a Call',
  },

  results: {
    badge: 'Your Technical Plan',
    ctaLabel: 'Book a Free Consultation',
    ctaUrl: 'https://irvale-studio.zatrovo.com/book',
    resetLabel: 'Start Over',
  },
};
