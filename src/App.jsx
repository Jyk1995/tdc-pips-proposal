import { useEffect, useRef, useState, memo } from 'react'
import { motion, useInView } from 'framer-motion'
import './index.css'

// ─── Animation variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 20 } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const staggerFast = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

function useScrollInView(threshold = 0.2) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: threshold })
  return [ref, isInView]
}

// ─── Progress indicator ───────────────────────────────────────────────────────

const SLIDE_COUNT = 7

const Progress = memo(function Progress({ current }) {
  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2 pointer-events-none">
      {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
        <div
          key={i}
          className="rounded-full transition-all duration-300"
          style={{
            width: '5px',
            height: current === i ? '28px' : '6px',
            backgroundColor: current === i ? '#EDB31D' : 'rgba(240,237,232,0.2)',
          }}
        />
      ))}
    </div>
  )
})

// ─── Ambient background ───────────────────────────────────────────────────────

const AmbientBg = memo(function AmbientBg() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden>
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full animate-pulse-glow"
        style={{ background: 'radial-gradient(circle, rgba(237,179,29,0.08) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 right-0 w-80 h-80 rounded-full animate-pulse-glow"
        style={{ background: 'radial-gradient(circle, rgba(200,57,26,0.06) 0%, transparent 70%)', animationDelay: '2.5s' }}
      />
    </div>
  )
})

// ─── Slide 1: Cover ──────────────────────────────────────────────────────────

function Cover() {
  return (
    <section className="section-snap relative min-h-dvh flex flex-col justify-between overflow-hidden" style={{ background: '#111110' }}>
      <div className="checker-pattern-sm h-10 w-full" style={{ opacity: 0.5 }} />

      <div className="flex-1 flex flex-col justify-center px-8 md:px-20 max-w-6xl mx-auto w-full py-16">
        <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-8">
          <motion.p
            variants={fadeUp}
            className="font-mono-num text-xs tracking-widest uppercase"
            style={{ color: '#EDB31D', letterSpacing: '0.2em' }}
          >
            A Consulting Proposal
          </motion.p>

          <div className="space-y-0">
            <motion.h1
              variants={fadeUp}
              className="font-display leading-none block"
              style={{
                fontSize: 'clamp(60px, 11vw, 130px)',
                letterSpacing: '-0.03em',
                color: '#F0EDE8',
              }}
            >
              Pip's
            </motion.h1>
            <motion.h1
              variants={fadeUp}
              className="font-display leading-none block"
              style={{
                fontSize: 'clamp(60px, 11vw, 130px)',
                letterSpacing: '-0.03em',
                color: '#EDB31D',
              }}
            >
              Deli.
            </motion.h1>
          </div>

          <motion.div variants={fadeUp} className="w-14 h-px" style={{ backgroundColor: '#EDB31D' }} />

          <motion.p
            variants={fadeUp}
            className="font-body text-base md:text-lg max-w-md leading-relaxed"
            style={{ color: 'rgba(240,237,232,0.5)' }}
          >
            Menu refinement. Operational clarity. The kitchen intelligence to make it last.
          </motion.p>

          <motion.div variants={fadeUp} className="pt-4">
            <p className="font-body font-semibold text-base" style={{ color: '#F0EDE8' }}>Stefan Kam</p>
            <p className="font-body text-sm" style={{ color: 'rgba(240,237,232,0.35)' }}>The Dinner Club SG</p>
          </motion.div>
        </motion.div>
      </div>

      <div className="checker-pattern-sm h-10 w-full" style={{ opacity: 0.5 }} />

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-16 right-8 md:right-20 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <span
          className="font-mono-num text-xs tracking-widest"
          style={{ color: 'rgba(240,237,232,0.25)', writingMode: 'vertical-rl', letterSpacing: '0.2em' }}
        >
          SCROLL
        </span>
        <motion.div
          className="w-px h-10"
          style={{ backgroundColor: 'rgba(237,179,29,0.35)' }}
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </motion.div>
    </section>
  )
}

// ─── Slide 2: What I See ─────────────────────────────────────────────────────

function WhatISee() {
  const [ref, inView] = useScrollInView()
  return (
    <section className="section-snap relative min-h-dvh flex flex-col justify-center overflow-hidden px-8 md:px-20" style={{ background: '#1A1A18' }}>
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          <div className="space-y-8">
            <motion.p variants={fadeUp} className="font-mono-num text-xs tracking-widest uppercase" style={{ color: '#EDB31D', letterSpacing: '0.2em' }}>
              01 / What I see
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display leading-tight"
              style={{ fontSize: 'clamp(32px, 5vw, 58px)', letterSpacing: '-0.02em', color: '#F0EDE8' }}
            >
              The concept is{' '}
              <span style={{ color: '#EDB31D', fontStyle: 'italic' }}>already there.</span>
            </motion.h2>

            <motion.div variants={staggerFast} className="space-y-5">
              {[
                {
                  label: 'Strong brand DNA',
                  body: "Bold, generous, warm — Pip's knows exactly what it is. Most F&B concepts haven't figured this out after three years of trading.",
                },
                {
                  label: 'Three sandwiches with good bones',
                  body: "Chicken Raisin, Wagyu Beef, Filet-O-Fish. Each has a clear idea. What's needed is refinement, execution consistency, and the operational backbone to deliver them day in, day out.",
                },
                {
                  label: 'A kiosk format that demands precision',
                  body: "Pop-up kitchens have no hiding room. Every element on the plate matters twice as much when there's no atmosphere to cover for it.",
                },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  variants={fadeUp}
                  className="border-l-2 pl-5 py-1"
                  style={{ borderColor: 'rgba(237,179,29,0.3)' }}
                >
                  <p className="font-body font-semibold text-sm mb-1" style={{ color: '#EDB31D' }}>{item.label}</p>
                  <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(240,237,232,0.55)' }}>{item.body}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Decorative quote block */}
          <motion.div variants={fadeUp} className="hidden md:block">
            <div
              className="checker-pattern rounded-2xl p-10 relative overflow-hidden"
              style={{ border: '1px solid rgba(237,179,29,0.12)' }}
            >
              <div
                className="absolute inset-0 rounded-2xl"
                style={{ background: 'linear-gradient(135deg, rgba(17,17,16,0.92) 0%, rgba(26,26,24,0.85) 100%)' }}
              />
              <div className="relative z-10 space-y-5">
                <div className="font-display text-6xl leading-none" style={{ color: 'rgba(237,179,29,0.25)' }}>"</div>
                <p className="font-display italic text-xl leading-relaxed" style={{ color: '#F0EDE8' }}>
                  Where you grab, go, and grin.
                </p>
                <p className="font-body text-xs tracking-widest uppercase" style={{ color: 'rgba(240,237,232,0.3)' }}>
                  Pip's Deli brand ethos
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Slide 3: What I Bring ───────────────────────────────────────────────────

const kitchens = [
  { name: 'Alchemist', detail: 'Copenhagen', stars: 2 },
  { name: 'De Librije', detail: 'Zwolle, NL', stars: 3 },
  { name: "Bord'eau", detail: 'Amsterdam', stars: 2 },
  { name: 'Table65', detail: 'Singapore', stars: 1 },
  { name: 'Tippling Club', detail: 'Singapore', stars: null },
]

function Stars({ count }) {
  if (!count) return null
  return (
    <span className="font-mono-num text-xs" style={{ color: '#EDB31D' }}>
      {'★'.repeat(count)}
    </span>
  )
}

function WhatIBring() {
  const [ref, inView] = useScrollInView()
  return (
    <section className="section-snap relative min-h-dvh flex flex-col justify-center overflow-hidden px-8 md:px-20" style={{ background: '#111110' }}>
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="space-y-12"
        >
          <div className="space-y-3">
            <motion.p variants={fadeUp} className="font-mono-num text-xs tracking-widest uppercase" style={{ color: '#EDB31D', letterSpacing: '0.2em' }}>
              02 / What I bring
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display leading-tight"
              style={{ fontSize: 'clamp(30px, 5vw, 56px)', letterSpacing: '-0.02em', color: '#F0EDE8' }}
            >
              Michelin kitchen discipline.{' '}
              <span style={{ color: '#EDB31D', fontStyle: 'italic' }}>Without the Michelin attitude.</span>
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div variants={staggerFast} className="space-y-1">
              <motion.p variants={fadeUp} className="font-body text-xs tracking-widest uppercase mb-5" style={{ color: 'rgba(240,237,232,0.3)' }}>
                Kitchens trained in
              </motion.p>
              {kitchens.map((k) => (
                <motion.div
                  key={k.name}
                  variants={fadeUp}
                  className="flex items-center justify-between py-3 border-b"
                  style={{ borderColor: 'rgba(240,237,232,0.07)' }}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-body font-semibold text-sm" style={{ color: '#F0EDE8' }}>{k.name}</span>
                    <span className="font-body text-xs" style={{ color: 'rgba(240,237,232,0.35)' }}>{k.detail}</span>
                  </div>
                  <Stars count={k.stars} />
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={staggerFast} className="space-y-5">
              <motion.p variants={fadeUp} className="font-body text-xs tracking-widest uppercase mb-5" style={{ color: 'rgba(240,237,232,0.3)' }}>
                What that means for Pip's
              </motion.p>
              {[
                "Recipes engineered to survive a bad day in the kitchen, not just a good one",
                "Food costing done properly — not guessed, not approximate",
                "Training that sticks because it's built around real scenarios, not theory",
                "A 4th sandwich if needed — or sharper versions of the three you already have",
              ].map((text, i) => (
                <motion.div key={i} variants={fadeUp} className="flex gap-4">
                  <span className="font-mono-num text-sm mt-0.5 shrink-0" style={{ color: '#EDB31D' }}>→</span>
                  <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(240,237,232,0.65)' }}>{text}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-3 px-5 py-3 rounded-full"
            style={{ backgroundColor: 'rgba(237,179,29,0.07)', border: '1px solid rgba(237,179,29,0.18)' }}
          >
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#EDB31D' }} />
            <span className="font-body text-sm" style={{ color: 'rgba(240,237,232,0.65)' }}>
              Singapore-based — every engagement is in person
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Tier Slide ───────────────────────────────────────────────────────────────

function TierSlide({ number, name, price, priceNote, tagline, deliverables, accentNote, bg, slideNum }) {
  const [ref, inView] = useScrollInView()
  return (
    <section className="section-snap relative min-h-dvh flex flex-col justify-center overflow-hidden px-8 md:px-20" style={{ background: bg }}>
      {/* Watermark number */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 font-display font-black pointer-events-none select-none"
        style={{
          fontSize: 'clamp(160px, 28vw, 300px)',
          color: 'rgba(237,179,29,0.035)',
          lineHeight: 1,
          letterSpacing: '-0.05em',
          right: '-1.5rem',
        }}
      >
        {number}
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid md:grid-cols-5 gap-12 items-start"
        >
          {/* Left: label + price */}
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-1">
              <motion.p variants={fadeUp} className="font-mono-num text-xs tracking-widest uppercase" style={{ color: '#EDB31D', letterSpacing: '0.2em' }}>
                {slideNum} / Tier {number}
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="font-display"
                style={{ fontSize: 'clamp(28px, 4vw, 50px)', letterSpacing: '-0.02em', color: '#F0EDE8' }}
              >
                {name}
              </motion.h2>
              <motion.p variants={fadeUp} className="font-body text-sm italic" style={{ color: 'rgba(240,237,232,0.45)' }}>
                {tagline}
              </motion.p>
            </div>

            <motion.div variants={fadeUp} className="space-y-1">
              <p
                className="font-display font-black"
                style={{ fontSize: 'clamp(22px, 3vw, 38px)', color: '#EDB31D', letterSpacing: '-0.02em' }}
              >
                {price}
              </p>
              {priceNote && (
                <p className="font-body text-sm" style={{ color: 'rgba(240,237,232,0.4)' }}>{priceNote}</p>
              )}
            </motion.div>

            {accentNote && (
              <motion.div
                variants={fadeUp}
                className="px-4 py-3 rounded-xl text-sm font-body leading-relaxed"
                style={{
                  backgroundColor: 'rgba(237,179,29,0.07)',
                  border: '1px solid rgba(237,179,29,0.18)',
                  color: 'rgba(240,237,232,0.6)',
                }}
              >
                {accentNote}
              </motion.div>
            )}
          </div>

          {/* Right: deliverables */}
          <motion.div variants={staggerFast} className="md:col-span-3 space-y-1">
            <motion.p variants={fadeUp} className="font-body text-xs tracking-widest uppercase mb-5" style={{ color: 'rgba(240,237,232,0.3)' }}>
              What's included
            </motion.p>
            {deliverables.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex gap-4 py-4 border-b"
                style={{ borderColor: 'rgba(240,237,232,0.06)' }}
              >
                <div
                  className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                  style={{ backgroundColor: 'rgba(237,179,29,0.12)' }}
                >
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#EDB31D' }} />
                </div>
                <div>
                  {item.title && (
                    <p className="font-body font-semibold text-sm mb-1" style={{ color: '#F0EDE8' }}>{item.title}</p>
                  )}
                  <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(240,237,232,0.5)' }}>{item.body}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Slide 7: Next Steps ─────────────────────────────────────────────────────

function NextSteps() {
  const [ref, inView] = useScrollInView()
  return (
    <section className="section-snap relative min-h-dvh flex flex-col justify-center overflow-hidden" style={{ background: '#111110' }}>
      <div className="checker-pattern-sm absolute top-0 left-0 right-0 h-10" style={{ opacity: 0.5 }} />

      <div className="max-w-6xl mx-auto w-full px-8 md:px-20">
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="space-y-12"
        >
          <div className="space-y-3">
            <motion.p variants={fadeUp} className="font-mono-num text-xs tracking-widest uppercase" style={{ color: '#EDB31D', letterSpacing: '0.2em' }}>
              06 / Next steps
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display"
              style={{ fontSize: 'clamp(40px, 7vw, 86px)', letterSpacing: '-0.03em', color: '#F0EDE8', lineHeight: 1.0 }}
            >
              Pull up a chair.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="font-body text-base md:text-lg max-w-lg leading-relaxed"
              style={{ color: 'rgba(240,237,232,0.5)' }}
            >
              Pick a tier, or come with questions. Either way, let's sit down and talk about what Pip's needs.
            </motion.p>
          </div>

          <motion.div variants={staggerFast} className="grid md:grid-cols-3 gap-4">
            {[
              { step: '01', title: 'Choose a tier', body: "Or mix elements. These are starting points, not contracts." },
              { step: '02', title: 'First meeting', body: "No deck needed. Just a conversation about the concept, the kitchen, and what's holding you back." },
              { step: '03', title: 'Start when ready', body: "Q4 is the earliest — that works. Good food takes time to get right." },
            ].map((item) => (
              <motion.div
                key={item.step}
                variants={fadeUp}
                className="p-6 rounded-2xl space-y-3"
                style={{ backgroundColor: 'rgba(240,237,232,0.03)', border: '1px solid rgba(240,237,232,0.07)' }}
              >
                <p className="font-mono-num text-3xl font-medium" style={{ color: 'rgba(237,179,29,0.35)' }}>{item.step}</p>
                <p className="font-body font-semibold text-base" style={{ color: '#F0EDE8' }}>{item.title}</p>
                <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(240,237,232,0.45)' }}>{item.body}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-center gap-6 pt-2">
            <div className="space-y-0.5">
              <p className="font-body font-semibold text-lg" style={{ color: '#F0EDE8' }}>Stefan Kam</p>
              <p className="font-body text-sm" style={{ color: 'rgba(240,237,232,0.35)' }}>Culinary Director — The Dinner Club SG</p>
            </div>
            <div className="hidden md:block w-px h-8" style={{ backgroundColor: 'rgba(240,237,232,0.1)' }} />
            <a
              href="mailto:stefan@thedinnerclusg.com"
              className="font-body text-sm transition-colors duration-200 hover:opacity-80"
              style={{ color: '#EDB31D' }}
            >
              stefan@thedinnerclusg.com
            </a>
          </motion.div>
        </motion.div>
      </div>

      <div className="checker-pattern-sm absolute bottom-0 left-0 right-0 h-10" style={{ opacity: 0.5 }} />
    </section>
  )
}

// ─── Tier data ────────────────────────────────────────────────────────────────

const TIERS = [
  {
    number: '1',
    name: 'Foundation',
    price: 'SGD 4,500 – 5,500',
    priceNote: 'One-time project fee',
    tagline: 'Get the menu right before you launch.',
    slideNum: '03',
    bg: '#151514',
    accentNote: 'Best for: testing the concept properly before committing to anything ongoing.',
    deliverables: [
      { title: 'Menu refinement & R&D', body: "Working with your existing 3 sandwiches — refining execution, flavour balance, and build consistency. Optional 4th sandwich if needed." },
      { title: 'Full recipe documentation', body: "SOPs written for kitchen staff, not chefs. Clear enough that anyone can replicate the result." },
      { title: 'Food cost sheet per item', body: "Every ingredient costed and tracked. You'll know your margin from day one." },
      { title: '1x on-site staff training session', body: "Half-day, in person at your kitchen. Recipe execution, plating standard, and common fixes." },
    ],
  },
  {
    number: '2',
    name: 'Foundation + Refresh',
    price: 'SGD 8,500 – 10,000',
    priceNote: 'Year 1 all-in / SGD 4,500 annual renewal',
    tagline: 'Stay sharp when the seasons change.',
    slideNum: '04',
    bg: '#1A1A18',
    accentNote: 'Annual renewal: 1x menu change or seasonal tweak + updated docs + 1 follow-up training session.',
    deliverables: [
      { title: 'Everything in Tier 1', body: "Full R&D, documentation, food costing, and staff training included." },
      { title: '1x menu change or tweak within the year', body: "New sandwich, retired item, or recipe adjustment — whatever the concept needs to stay relevant." },
      { title: 'Updated recipe documentation', body: "All changes reflected in your SOP library." },
      { title: 'Annual renewal option at SGD 4,500', body: "No retainer, no lock-in — just call when you need the next refresh." },
    ],
  },
  {
    number: '3',
    name: 'Partnership',
    price: 'SGD 4,000 / month',
    priceNote: '6-month minimum · billed monthly',
    tagline: 'A kitchen partner, not a vendor.',
    slideNum: '05',
    bg: '#151514',
    accentNote: 'Name rights: Stefan Kam credited on Pip\'s Deli for the duration of the agreement.',
    deliverables: [
      { title: 'Everything in Tier 2', body: "Full foundation work, documentation, costing, training, and annual refresh." },
      { title: 'Use of Stefan Kam\'s name', body: "Associate the menu with the chef behind it. Valid for the duration of the agreement." },
      { title: 'Monthly COGS review', body: "Food cost checked every month — suppliers, waste, portion drift. Problems caught before they become expensive." },
      { title: 'Direct access for operational adjustments', body: "Ingredient discontinued? Equipment issue? A direct line to Stefan for quick fixes — no waiting weeks for a meeting." },
      { title: 'Physical visit every 2 months', body: "In person at the kitchen. Eyes on execution, team confidence checked, quality kept honest." },
    ],
  },
]

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const sections = document.querySelectorAll('.section-snap')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(sections).indexOf(entry.target)
            setCurrentSlide(index)
          }
        })
      },
      { threshold: 0.5 }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    function onKey(e) {
      const sections = document.querySelectorAll('.section-snap')
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        const next = Math.min(currentSlide + 1, sections.length - 1)
        sections[next]?.scrollIntoView({ behavior: 'smooth' })
      }
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        const prev = Math.max(currentSlide - 1, 0)
        sections[prev]?.scrollIntoView({ behavior: 'smooth' })
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [currentSlide])

  return (
    <div>
      <AmbientBg />
      <Progress current={currentSlide} />
      <Cover />
      <WhatISee />
      <WhatIBring />
      {TIERS.map((tier) => (
        <TierSlide key={tier.number} {...tier} />
      ))}
      <NextSteps />
    </div>
  )
}
