import { useState, type FormEvent } from 'react';
import {
  Sprout,
  ArrowRight,
  HandHeart,
  Compass,
  Lightbulb,
  ShieldCheck,
  Users,
  GraduationCap,
  Newspaper,
  MessageSquare,
  Camera,
  CalendarDays,
  Mail,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Send,
} from 'lucide-react';
import { committees } from '@/lib/content';
import { supabase } from '@/lib/supabase';

type Props = { navigate: (to: string) => void };

const beliefPoints = [
  'Experience can become guidance.',
  'Mistakes can become lessons.',
  'Confidence can be developed.',
  'Leadership can be learned.',
  'Ideas can become action.',
  'Young people can create meaningful change.',
];

const howItWorks = [
  {
    icon: GraduationCap,
    title: 'Mentorship & Tutoring',
    body: 'Seniors guide freshmen through study skills, academic pressure, and the transition into a new environment.',
  },
  {
    icon: MessageSquare,
    title: 'Communication & Speaking',
    body: 'Discussions, storytelling, and debates help students find their voice and speak with confidence.',
  },
  {
    icon: CalendarDays,
    title: 'Events & Activities',
    body: 'Workshops, competitions, and community events turn ideas into shared experiences.',
  },
  {
    icon: Camera,
    title: 'Media & Storytelling',
    body: 'Photography, video, and design capture the spirit of the community and share it beyond the campus.',
  },
  {
    icon: Newspaper,
    title: 'News & Experience Sharing',
    body: 'Achievements, milestones, and lessons learned travel through the community so no one has to start from zero.',
  },
  {
    icon: Users,
    title: 'Student Participation',
    body: 'Members lead projects, contribute skills, and shape the direction of the initiative together.',
  },
];

export function HomePage({ navigate }: Props) {
  return (
    <>
      <Hero navigate={navigate} />
      <Origin />
      <WhyAxioria />
      <WhatWeBelieve />
      <Programs navigate={navigate} />
      <HowItWorks />
      <FutureVision />
      <ReachOut />
      <FinalCTA navigate={navigate} />
    </>
  );
}

function Hero({ navigate }: Props) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/kallamino_photo.jpg"
          alt="Kallamino Special High School gardens"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/70 via-stone-950/55 to-stone-950/80" />
      </div>
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 py-28 sm:py-36 lg:py-44">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-emerald-200 ring-1 ring-white/20 backdrop-blur-sm">
            <Sprout className="h-3.5 w-3.5" />
            Axioria Initiative · Kallamino Special High School
          </span>
          <h1 className="mt-6 font-serif text-4xl sm:text-6xl lg:text-7xl text-white leading-[1.05] tracking-tight">
            No Student
            <br />
            Walks Alone.
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-stone-200 leading-relaxed max-w-2xl">
            A youth-led community where students learn, lead, create, and
            support one another. What begins with one student can become a
            community. What begins with one idea can become an opportunity for
            many.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate('/join')}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-7 py-3.5 text-base font-semibold text-white hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-900/30"
            >
              Join Axioria
              <ArrowRight className="h-5 w-5" />
            </button>
            <button
              onClick={() => navigate('/programs')}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-7 py-3.5 text-base font-semibold text-white ring-1 ring-white/30 hover:bg-white/20 transition-colors backdrop-blur-sm"
            >
              Explore Programs
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="max-w-3xl">
      <span className="text-xs font-semibold uppercase tracking-widest text-emerald-700">
        {eyebrow}
      </span>
      <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 tracking-tight leading-tight">
        {title}
      </h2>
      {children && (
        <div className="mt-5 text-lg text-stone-600 leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
}

function Origin() {
  return (
    <section className="py-24 sm:py-32 bg-stone-50">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHeading eyebrow="The Story" title="Where a Seed Became a Vision">
          <p>
            Axioria began in the green gardens of Kallamino Special High School.
            As a freshman, the founder experienced the uncertainty that comes
            with entering a new environment — academic pressure, homesickness,
            and the quiet question of whether anyone else felt the same way.
          </p>
          <p className="mt-4">
            Walking through the campus gardens, an idea took root: what if young
            people could use their own experiences to guide and support one
            another? What if a student who had once needed help could become the
            person who offers it?
          </p>
          <p className="mt-4">
            Like a small seed that needs care before it can grow into a tree,
            young people need guidance, opportunity, encouragement, and someone
            who believes in their potential. That idea became Axioria
            Initiative.
          </p>
        </SectionHeading>
      </div>
    </section>
  );
}

function WhyAxioria() {
  const challenges = [
    {
      icon: GraduationCap,
      title: 'Academic Pressure',
      body: 'The weight of expectations, exams, and results can feel overwhelming without support.',
    },
    {
      icon: HandHeart,
      title: 'Homesickness & Loneliness',
      body: 'Being far from family in a new environment leaves many students feeling isolated.',
    },
    {
      icon: AlertCircle,
      title: 'Stress & Self-Doubt',
      body: 'Uncertainty about abilities and the future can quietly erode confidence.',
    },
    {
      icon: Compass,
      title: 'Uncertainty',
      body: 'Not knowing what comes next — or who to ask — makes the path harder than it needs to be.',
    },
  ];
  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Why Axioria?"
          title="Challenges that textbooks alone cannot solve"
        >
          <p>
            Young people often face challenges that are not solved by lessons
            alone. Sometimes they need someone who has already walked the path.
            Sometimes they need an opportunity to speak, create, lead, or simply
            know that they are not alone.
          </p>
        </SectionHeading>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {challenges.map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border border-stone-200 bg-stone-50/60 p-7 hover:border-emerald-300 hover:bg-white transition-colors"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <c.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-serif text-xl text-stone-900">
                {c.title}
              </h3>
              <p className="mt-2 text-sm text-stone-600 leading-relaxed">
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatWeBelieve() {
  return (
    <section className="py-24 sm:py-32 bg-emerald-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-emerald-400 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-emerald-500 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-300">
              What We Believe
            </span>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight">
              Our mindset is the foundation of our growth.
            </h2>
            <p className="mt-6 text-lg text-emerald-100/90 leading-relaxed">
              We are not here because we have all the answers. We are here
              because we can learn from one another. A student who once needed
              help can eventually become the person who helps someone else. A
              quiet student can find their voice. A small idea can become a
              meaningful project.
            </p>
          </div>
          <div className="space-y-3">
            {beliefPoints.map((b) => (
              <div
                key={b}
                className="flex items-center gap-4 rounded-xl bg-white/5 px-5 py-4 ring-1 ring-white/10 backdrop-blur-sm"
              >
                <ShieldCheck className="h-5 w-5 flex-none text-emerald-300" />
                <span className="text-base sm:text-lg text-emerald-50">
                  {b}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Programs({ navigate }: Props) {
  return (
    <section className="py-24 sm:py-32 bg-stone-50">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Programs"
          title="Five committees, one community"
        >
          <p>
            Axioria brings different skills and interests together through five
            main committees. Each one opens a different path to learn,
            contribute, and grow.
          </p>
        </SectionHeading>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {committees.map((c) => (
            <button
              key={c.slug}
              onClick={() => navigate(`/programs/${c.slug}`)}
              className="group text-left rounded-2xl border border-stone-200 bg-white p-7 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-900/5 transition-all"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                <c.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-serif text-xl text-stone-900">
                {c.name}
              </h3>
              <p className="mt-2 text-sm text-stone-600 leading-relaxed">
                {c.short}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700 group-hover:gap-2.5 transition-all">
                Learn more
                <ArrowRight className="h-4 w-4" />
              </span>
            </button>
          ))}
          <div className="rounded-2xl bg-gradient-to-br from-emerald-700 to-emerald-900 p-7 text-white flex flex-col justify-between">
            <div>
              <Lightbulb className="h-6 w-6 text-emerald-200" />
              <h3 className="mt-5 font-serif text-xl">
                Not sure which committee fits you?
              </h3>
              <p className="mt-2 text-sm text-emerald-100/90 leading-relaxed">
                Explore all five and find where your skills and passions come
                alive.
              </p>
            </div>
            <button
              onClick={() => navigate('/programs')}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-white group-hover:gap-2.5 transition-all"
            >
              Explore all programs
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="How Axioria Works"
          title="Learning by doing, together"
        >
          <p>
            Axioria creates opportunities for young people to participate —
            through mentorship, tutoring, communication, events, media, news,
            experience sharing, and student-led projects.
          </p>
        </SectionHeading>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {howItWorks.map((item) => (
            <div key={item.title} className="rounded-2xl p-7 bg-stone-50/70 border border-stone-200/80">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-emerald-700 ring-1 ring-stone-200">
                <item.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-serif text-lg text-stone-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-stone-600 leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FutureVision() {
  return (
    <section className="py-24 sm:py-32 bg-stone-100">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <SectionHeading eyebrow="Future Vision" title="From one seed to a forest of young leaders">
            <p>
              Axioria begins with young people, but the vision can grow beyond
              one school, one community, or one generation. Through camps,
              volunteering, outreach, and collaboration with students,
              educators, professionals, and organizations, we hope to create
              more opportunities for young people to learn, lead, serve, and
              connect.
            </p>
            <p className="mt-4">
              Our long-term vision is to develop a model of youth participation
              that can inspire and support young people in different
              communities.
            </p>
          </SectionHeading>
          <div className="space-y-4">
            {[
              { from: 'From one idea', to: 'to a community.' },
              { from: 'From one community', to: 'to many.' },
              { from: 'From one seed', to: 'to a forest of young leaders.' },
            ].map((s) => (
              <div
                key={s.from}
                className="flex items-center gap-4 rounded-2xl bg-white p-6 border border-stone-200"
              >
                <Sprout className="h-6 w-6 flex-none text-emerald-600" />
                <div>
                  <p className="font-serif text-lg text-stone-900">{s.from}</p>
                  <p className="text-sm text-stone-600">{s.to}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ReachOut() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Please enter your name.';
    if (!form.email.trim()) e.email = 'Please enter your email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Please enter a valid email address.';
    if (!form.message.trim()) e.message = 'Please enter a message.';
    return e;
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setStatus('loading');
    try {
      const { error } = await supabase.from('contact_messages').insert({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      });
      if (error) throw error;
      try {
        await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-confirmation`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            },
            body: JSON.stringify({
              type: 'contact_message',
              to: 'heranataklti@gmail.com',
              contact_name: form.name.trim(),
              contact_email: form.email.trim(),
              contact_message: form.message.trim(),
            }),
          }
        );
      } catch {
        // email forward is best-effort; message is saved in DB
      }
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="reach-out" className="py-24 sm:py-32 bg-white scroll-mt-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionHeading eyebrow="Reach Out" title="Let's talk">
            <p>
              Have a question, an idea, or want to collaborate? Send a message
              and the Axioria team will get back to you.
            </p>
            <a
              href="mailto:heranataklti@gmail.com"
              className="mt-5 inline-flex items-center gap-2 text-emerald-700 font-medium hover:text-emerald-800"
            >
              <Mail className="h-4 w-4" />
              heranataklti@gmail.com
            </a>
          </SectionHeading>

          <div>
            {status === 'success' ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
                <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto" />
                <h3 className="mt-4 font-serif text-xl text-stone-900">
                  Thank you. Your message has been received.
                </h3>
                <p className="mt-2 text-sm text-stone-600">
                  We appreciate you reaching out and will respond soon.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-5 text-sm font-medium text-emerald-700 hover:text-emerald-800"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="rounded-2xl border border-stone-200 bg-stone-50/60 p-7 sm:p-8 space-y-5"
                noValidate
              >
                <Field label="Name" error={errors.name}>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="form-input"
                    placeholder="Your name"
                  />
                </Field>
                <Field label="Email" error={errors.email}>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="form-input"
                    placeholder="you@example.com"
                  />
                </Field>
                <Field label="Message" error={errors.message}>
                  <textarea
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    rows={5}
                    className="form-input resize-none"
                    placeholder="Your message"
                  />
                </Field>
                {status === 'error' && (
                  <p className="text-sm text-red-600">
                    Something went wrong. Please try again.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-emerald-700 px-6 py-3 text-base font-semibold text-white hover:bg-emerald-800 disabled:opacity-60 transition-colors"
                >
                  {status === 'loading' ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-stone-700 mb-1.5">
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block text-sm text-red-600">{error}</span>}
    </label>
  );
}

function FinalCTA({ navigate }: Props) {
  return (
    <section className="py-24 sm:py-32 bg-stone-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-emerald-500 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-3xl px-5 text-center">
        <Sprout className="h-10 w-10 text-emerald-400 mx-auto" />
        <h2 className="mt-6 font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight">
          No Student Walks Alone.
        </h2>
        <p className="mt-5 text-lg text-stone-300 leading-relaxed">
          The journey begins with us, but it should never end with us. Every
          student deserves guidance, encouragement, and an opportunity to grow.
        </p>
        <button
          onClick={() => navigate('/join')}
          className="mt-9 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-8 py-4 text-base font-semibold text-white hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-900/40"
        >
          Join Axioria
          <ArrowRight className="h-5 w-5" />
        </button>
        <p className="mt-8 font-serif text-lg text-emerald-300">
          The Future Begins Here.
        </p>
      </div>
    </section>
  );
}
