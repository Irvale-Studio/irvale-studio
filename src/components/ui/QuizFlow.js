'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles, Check } from 'lucide-react';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

// ── Option Card ──
function OptionCard({ option, selected, onSelect, type, theme }) {
  const isSelected = type === 'multi'
    ? selected?.includes(option.value)
    : selected === option.value;

  return (
    <button
      onClick={() => onSelect(option.value)}
      className="group relative flex flex-col items-center justify-center gap-3 p-5 rounded-xl border transition-all duration-300 cursor-pointer text-center min-h-[100px]"
      style={{
        borderColor: isSelected ? theme.accent : theme.border,
        backgroundColor: isSelected ? `${theme.accent}12` : theme.cardBg,
        boxShadow: isSelected ? `0 4px 20px ${theme.accent}18` : 'none',
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.borderColor = `${theme.accent}66`;
          e.currentTarget.style.backgroundColor = `${theme.accent}08`;
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.borderColor = theme.border;
          e.currentTarget.style.backgroundColor = theme.cardBg;
        }
      }}
    >
      {isSelected && (
        <motion.div
          layoutId={type === 'single' ? 'selected-indicator' : undefined}
          className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
          style={{ backgroundColor: theme.accent }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          <Check className="w-3 h-3 text-white" />
        </motion.div>
      )}

      {option.icon && (
        <option.icon
          className="w-7 h-7 transition-colors duration-300"
          style={{ color: isSelected ? theme.accent : theme.textMuted }}
        />
      )}
      <span
        className="text-sm font-medium transition-colors duration-300"
        style={{ color: isSelected ? theme.text : theme.textMuted }}
      >
        {option.label}
      </span>
      {option.sublabel && (
        <span className="text-xs" style={{ color: `${theme.textMuted}B3` }}>
          {option.sublabel}
        </span>
      )}
    </button>
  );
}

// ── Progress Bar ──
function ProgressBar({ current, total, theme }) {
  const pct = ((current + 1) / total) * 100;
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-between text-xs mb-2" style={{ color: theme.textMuted }}>
        <span>Step {current + 1} of {total}</span>
        <span>{Math.round(pct)}%</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: theme.bgAlt }}>
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: theme.accent }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

// ── Results Page ──
function ResultsPage({ answers, onReset, config, apiEndpoint }) {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = config;

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await fetch(apiEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(answers),
        });
        if (!res.ok) throw new Error('Failed to generate plan');
        const data = await res.json();
        setPlan(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPlan();
  }, [answers, apiEndpoint]);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center gap-6 min-h-[400px]"
      >
        <div className="relative">
          <div
            className="w-16 h-16 rounded-full border-2 animate-spin"
            style={{ borderColor: theme.bgAlt, borderTopColor: theme.accent }}
          />
          <Sparkles
            className="w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ color: theme.accent }}
          />
        </div>
        <div className="text-center">
          <p className="text-lg font-medium" style={{ color: theme.text }}>{config.loading.headline}</p>
          <p className="text-sm mt-1" style={{ color: theme.textMuted }}>{config.loading.subtitle}</p>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center gap-6 min-h-[400px] text-center"
      >
        <p style={{ color: theme.textMuted }}>{config.error.message}</p>
        <p className="text-sm" style={{ color: `${theme.textMuted}B3` }}>{config.error.fallbackMessage}</p>
        <div className="flex gap-4 mt-4">
          <a
            href={config.error.fallbackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold text-white transition-all"
            style={{ backgroundColor: theme.accent }}
          >
            {config.error.fallbackLabel}
          </a>
          <button
            onClick={onReset}
            className="px-6 py-3 rounded-lg text-sm font-medium border transition-all"
            style={{ borderColor: theme.border, color: theme.text }}
          >
            Try Again
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto"
    >
      <div className="text-center mb-8">
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4"
          style={{ backgroundColor: `${theme.accent}18`, border: `1px solid ${theme.accent}33` }}
        >
          <Sparkles className="w-4 h-4" style={{ color: theme.accent }} />
          <span className="text-xs font-medium uppercase tracking-wider" style={{ color: theme.accent }}>
            {config.results.badge}
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold" style={{ color: theme.text }}>
          {plan.headline}
        </h2>
      </div>

      <div
        className="rounded-2xl p-6 md:p-8 mb-6"
        style={{
          backgroundColor: theme.cardBg,
          border: `1px solid ${theme.accent}33`,
          boxShadow: `0 8px 30px ${theme.accent}12`,
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold" style={{ color: theme.text }}>{plan.packageName}</h3>
          {plan.price && (
            <span className="text-xl font-bold" style={{ color: theme.accent }}>{plan.price}</span>
          )}
        </div>

        <ul className="space-y-3 mb-6">
          {plan.services.map((service, i) => (
            <li key={i} className="flex items-start gap-3">
              <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: theme.accent }} />
              <span className="text-sm leading-relaxed" style={{ color: theme.textMuted }}>{service}</span>
            </li>
          ))}
        </ul>

        {plan.insight && (
          <div className="rounded-lg p-4" style={{ backgroundColor: theme.bg, border: `1px solid ${theme.border}` }}>
            <p className="text-sm italic leading-relaxed" style={{ color: theme.textMuted }}>{plan.insight}</p>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={config.results.ctaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold text-white text-sm uppercase tracking-wider transition-all"
          style={{ backgroundColor: theme.accent }}
        >
          {config.results.ctaLabel}
        </a>
        <button
          onClick={onReset}
          className="flex-1 px-8 py-4 rounded-lg font-medium text-sm uppercase tracking-wider border transition-all"
          style={{ borderColor: theme.border, color: theme.text }}
        >
          {config.results.resetLabel}
        </button>
      </div>
    </motion.div>
  );
}

// ── Main Quiz Flow ──
export default function QuizFlow({ isOpen, onClose, config, apiEndpoint = '/api/quiz' }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [direction, setDirection] = useState(1);

  const { theme, steps, emailStep } = config;
  const totalSteps = steps.length + 1;
  const currentQuizStep = steps[step];
  const isEmailStep = step === steps.length;

  const handleSelect = useCallback((value) => {
    if (!currentQuizStep) return;
    const { id, type } = currentQuizStep;

    if (type === 'multi') {
      setAnswers(prev => {
        const current = prev[id] || [];
        const updated = current.includes(value)
          ? current.filter(v => v !== value)
          : [...current, value];
        return { ...prev, [id]: updated };
      });
    } else {
      setAnswers(prev => ({ ...prev, [id]: value }));
      setTimeout(() => {
        setDirection(1);
        setStep(s => s + 1);
      }, 300);
    }
  }, [currentQuizStep]);

  const canAdvance = () => {
    if (isEmailStep) return email.trim().length > 0;
    if (!currentQuizStep) return false;
    const { id, type } = currentQuizStep;
    if (type === 'multi') return (answers[id] || []).length > 0;
    return !!answers[id];
  };

  const handleNext = () => {
    if (!canAdvance()) return;
    setDirection(1);
    if (isEmailStep) {
      setShowResults(true);
    } else {
      setStep(s => s + 1);
    }
  };

  const handleBack = () => {
    if (step === 0) {
      onClose();
    } else {
      setDirection(-1);
      setStep(s => s - 1);
    }
  };

  const handleReset = () => {
    setStep(0);
    setAnswers({});
    setEmail('');
    setBusinessName('');
    setShowResults(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && canAdvance()) handleNext();
  };

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] backdrop-blur-sm md:backdrop-blur-xl flex flex-col"
          style={{ backgroundColor: `${theme.bg}FA` }}
          onKeyDown={handleKeyDown}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: `1px solid ${theme.border}` }}>
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-sm transition-colors"
              style={{ color: theme.textMuted }}
            >
              <ArrowLeft className="w-4 h-4" />
              {step === 0 ? 'Close' : 'Back'}
            </button>
            <span className="text-sm font-medium" style={{ color: theme.textMuted }}>{config.title}</span>
            <button
              onClick={onClose}
              className="text-sm transition-colors"
              style={{ color: theme.textMuted }}
            >
              Close
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center px-6 py-8">
            {showResults ? (
              <ResultsPage
                answers={{ ...answers, email, businessName }}
                onReset={handleReset}
                config={config}
                apiEndpoint={apiEndpoint}
              />
            ) : (
              <>
                <div className="w-full max-w-lg mb-10">
                  <ProgressBar current={step} total={totalSteps} theme={theme} />
                </div>

                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={step}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="w-full max-w-lg"
                  >
                    {isEmailStep ? (
                      <div className="text-center">
                        <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: theme.text }}>
                          {emailStep.headline}
                        </h2>
                        <p className="mb-8" style={{ color: theme.textMuted }}>
                          {emailStep.subtitle}
                        </p>
                        <div className="space-y-4 max-w-sm mx-auto">
                          <input
                            type="text"
                            placeholder={emailStep.businessNamePlaceholder}
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                            className="w-full rounded-xl px-5 py-4 focus:outline-none transition-all"
                            style={{
                              backgroundColor: theme.cardBg,
                              border: `1px solid ${theme.border}`,
                              color: theme.text,
                            }}
                          />
                          <input
                            type="email"
                            placeholder={emailStep.emailPlaceholder}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-xl px-5 py-4 focus:outline-none transition-all"
                            style={{
                              backgroundColor: theme.cardBg,
                              border: `1px solid ${theme.border}`,
                              color: theme.text,
                            }}
                            autoFocus
                          />
                          <button
                            onClick={handleNext}
                            disabled={!canAdvance()}
                            className={cn(
                              'w-full flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold text-white text-sm uppercase tracking-wider transition-all',
                              !canAdvance() && 'opacity-40 cursor-not-allowed'
                            )}
                            style={{ backgroundColor: theme.accent }}
                          >
                            <Sparkles className="w-4 h-4" />
                            {emailStep.ctaLabel}
                          </button>
                          <p className="text-xs" style={{ color: `${theme.textMuted}80` }}>
                            {emailStep.disclaimer}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: theme.text }}>
                          {currentQuizStep.question}
                        </h2>
                        <p className="mb-8" style={{ color: theme.textMuted }}>{currentQuizStep.subtitle}</p>

                        <div className={cn(
                          'grid gap-3',
                          currentQuizStep.options.length <= 3
                            ? 'grid-cols-1 max-w-sm mx-auto'
                            : 'grid-cols-2 sm:grid-cols-3'
                        )}>
                          {currentQuizStep.options.map((option) => (
                            <OptionCard
                              key={option.value}
                              option={option}
                              selected={answers[currentQuizStep.id]}
                              onSelect={handleSelect}
                              type={currentQuizStep.type}
                              theme={theme}
                            />
                          ))}
                        </div>

                        {currentQuizStep.type === 'multi' && (
                          <button
                            onClick={handleNext}
                            disabled={!canAdvance()}
                            className={cn(
                              'mt-8 flex items-center gap-2 mx-auto px-8 py-4 rounded-lg font-semibold text-white text-sm uppercase tracking-wider transition-all',
                              !canAdvance() && 'opacity-40 cursor-not-allowed'
                            )}
                            style={{ backgroundColor: theme.accent }}
                          >
                            Continue
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
