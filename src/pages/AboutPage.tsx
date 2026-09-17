import {
  Sprout,
  Eye,
  Target,
  HeartHandshake,
  ShieldCheck,
  Users2,
  CalendarDays,
  Lightbulb,
  Sparkles,
  Handshake,
  Telescope,
  ArrowRight,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Props = { navigate: (to: string) => void };

export function AboutPage({ navigate }: Props) {
  return (
    <>
      <AboutHero />
      <Intro />
      <VisionMission />
      <WhyInitiative />
      <Promise />
      <WhyJoin />
      <Leadership />
      <WeeklyMeetings />
      <Topics />
      <SignaturePrograms />
      <SpecialEvents />
      <FuturePartners />
      <LongTermDream />
      <FinalMessage navigate={navigate} />
    </>
  );
}

function AboutHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/kshs.png"
          alt="Kallamino Special High School"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/75 via-stone-950/60 to-stone-950/85" />
      </div>
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 py-28 sm:py-36">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-emerald-200 ring-1 ring-white/20 backdrop-blur-sm">
            <Sprout className="h-3.5 w-3.5" />
            About Axioria Initiative
          </span>
          <h1 className="mt-6 font-serif text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.1] tracking-tight">
            What begins with one student can become a community.
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-stone-200 leading-relaxed">
            Axioria is a youth-led initiative at Kallamino Special High School,
            built on the belief that experience, guidance, and community can
            help young people grow together.
          </p>
        </div>
      </div>
    </section>
  );
}

function Section({
  eyebrow,
  title,
  children,
  bg = 'white',
  icon: Icon,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  bg?: 'white' | 'stone';
  icon: LucideIcon;
}) {
  return (
    <section
      className={`py-20 sm:py-28 ${
        bg === 'stone' ? 'bg-stone-50' : 'bg-white'
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-700">
                {eyebrow}
              </span>
            </div>
            <h2 className="mt-5 font-serif text-3xl sm:text-4xl text-stone-900 tracking-tight leading-tight">
              {title}
            </h2>
          </div>
          <div className="lg:col-span-2 text-lg text-stone-600 leading-relaxed space-y-4">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <Section eyebrow="Introduction" title="A youth-led community" icon={Sprout}>
      <p>
        Axioria began with a simple question: what if young people could use
        their experiences to guide and support one another? The idea grew from
        the belief that students do not only need lessons from classrooms. They
        also need encouragement, mentorship, opportunities, practical skills,
        and a community that understands their journey.
      </p>
      <p>
        Like a small seed that needs care before it can grow into a tree, young
        people need guidance, opportunity, encouragement, and someone who
        believes in their potential. That idea became Axioria Initiative — a
        youth-led community focused on education, leadership, personal growth,
        technology, community service, creativity, and collaboration.
      </p>
    </Section>
  );
}

function VisionMission() {
  return (
    <section className="py-20 sm:py-28 bg-stone-50">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-8 sm:p-10 border border-stone-200">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
            <Eye className="h-5 w-5" />
          </span>
          <h2 className="mt-5 font-serif text-2xl sm:text-3xl text-stone-900">
            Our Vision
          </h2>
          <p className="mt-4 text-lg text-stone-600 leading-relaxed">
            To build a community where young people are supported, confident,
            capable, and empowered to discover their potential and contribute
            positively to their communities. We envision a future where students
            can access guidance, encouragement, knowledge, opportunities, and
            meaningful experiences regardless of where they begin.
          </p>
        </div>
        <div className="rounded-2xl bg-white p-8 sm:p-10 border border-stone-200">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
            <Target className="h-5 w-5" />
          </span>
          <h2 className="mt-5 font-serif text-2xl sm:text-3xl text-stone-900">
            Our Mission
          </h2>
          <p className="mt-4 text-lg text-stone-600 leading-relaxed">
            Axioria brings young people together to learn, lead, create, support
            one another, and make a positive impact. We aim to provide spaces
            for mentorship, experience sharing, tutoring, communication,
            leadership, creativity, technology, community service, and personal
            development.
          </p>
          <p className="mt-3 font-serif text-lg text-emerald-800">
            Our mindset is the foundation of our growth.
          </p>
        </div>
      </div>
    </section>
  );
}

function WhyInitiative() {
  return (
    <Section
      eyebrow="Why This Initiative?"
      title="Because some paths are easier with a hand"
      icon={HeartHandshake}
      bg="white"
    >
      <p>
        Young people often face challenges that are not solved by textbooks
        alone. Sometimes they need someone who has already walked the path.
        Sometimes they need an opportunity to speak, create, lead, ask
        questions, or simply know that they are not alone.
      </p>
      <p>
        Axioria exists to create that kind of community — the initiative we wish
        more young people had access to. A place where experiences become
        lessons, ideas become projects, and students become supporters of one
        another.
      </p>
      <p className="font-serif text-xl text-emerald-800">
        Motto: No Student Walks Alone.
      </p>
    </Section>
  );
}

function Promise() {
  return (
    <Section
      eyebrow="Our Promise"
      title="Progress over perfection"
      icon={ShieldCheck}
      bg="stone"
    >
      <p>
        We do not promise shortcuts. We do not promise perfect results. We
        promise to create a space where young people can learn from experience,
        support one another, discover opportunities, develop skills, and grow
        with confidence.
      </p>
      <p>
        We believe progress matters more than perfection. The goal is not
        simply to become successful individually, but to help create an
        environment where others can succeed too.
      </p>
    </Section>
  );
}

function WhyJoin() {
  const gains = [
    'Mentorship & Guidance from peers, seniors, educators, and alumni',
    'Leadership Experience through projects, teamwork, and responsibility',
    'Communication Skills through public speaking and collaboration',
    'Academic Support through study strategies and learning resources',
    'Personal Growth through confidence, discipline, and resilience',
    'Creative Experience through media, photography, design, and writing',
    'Project & Event Experience through workshops and community activities',
    'Opportunity Awareness through shared educational opportunities',
    'Networking & Community with other young people who want to contribute',
    'Real-World Experience by turning ideas into practical projects',
    'A Platform to Contribute by sharing knowledge, skills, and ideas',
    'A Supportive Community where members encourage one another',
  ];
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
            <Users2 className="h-5 w-5" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-700">
            Why Join?
          </span>
        </div>
        <h2 className="mt-5 font-serif text-3xl sm:text-4xl text-stone-900 tracking-tight">
          What members gain
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-stone-600">
          Being part of Axioria is an opportunity to learn, contribute, and
          grow — to learn something, teach something, try something, and become
          something more.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gains.map((g) => (
            <div
              key={g}
              className="flex items-start gap-3 rounded-xl bg-stone-50/70 p-5 border border-stone-200/80"
            >
              <Sparkles className="h-5 w-5 flex-none text-emerald-600 mt-0.5" />
              <span className="text-sm text-stone-700 leading-relaxed">
                {g}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Leadership() {
  const roles = [
    {
      title: 'Founder & Lead',
      body: 'Provides overall vision, direction, and coordination for the initiative.',
    },
    {
      title: 'Committee Leads',
      body: 'Each of the five committees is guided by a student lead who coordinates activities and members.',
    },
    {
      title: 'Committee Members',
      body: 'Active members who contribute within their chosen committee and collaborate across teams.',
    },
    {
      title: 'Advisors',
      body: 'Educators and mentors who provide guidance, perspective, and support.',
    },
  ];
  return (
    <Section
      eyebrow="Leadership Structure"
      title="Led by students, guided by experience"
      icon={Users2}
      bg="stone"
    >
      <div className="space-y-4">
        {roles.map((r) => (
          <div
            key={r.title}
            className="rounded-xl bg-white p-5 border border-stone-200"
          >
            <h3 className="font-serif text-lg text-stone-900">{r.title}</h3>
            <p className="mt-1 text-sm text-stone-600">{r.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function WeeklyMeetings() {
  return (
    <Section
      eyebrow="Weekly Meetings"
      title="A rhythm of connection"
      icon={CalendarDays}
      bg="white"
    >
      <p>
        Members gather regularly to share updates, plan activities, discuss
        ideas, and reflect on progress. Weekly meetings keep the community
        connected and ensure that every committee has space to move its work
        forward.
      </p>
      <p>
        Meetings are a time for mentorship, experience sharing, and planning —
        and a reminder that no one is walking the path alone.
      </p>
    </Section>
  );
}

function Topics() {
  const topics = [
    'Personal development',
    'Leadership',
    'Communication',
    'Study skills',
    'Time management',
    'Mentorship',
    'Tutoring',
    'Opportunities and educational resources',
    'Creativity and media',
    'Community service',
    'Technology',
    'Public speaking',
    'Experience sharing',
    'Student-led projects',
  ];
  return (
    <section className="py-20 sm:py-28 bg-stone-50">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
            <Lightbulb className="h-5 w-5" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-700">
            Main Topics
          </span>
        </div>
        <h2 className="mt-5 font-serif text-3xl sm:text-4xl text-stone-900 tracking-tight">
          What we explore together
        </h2>
        <div className="mt-10 flex flex-wrap gap-3">
          {topics.map((t) => (
            <span
              key={t}
              className="rounded-full bg-white px-4 py-2 text-sm font-medium text-stone-700 border border-stone-200"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function SignaturePrograms() {
  const programs = [
    {
      title: 'Freshman Guidance',
      body: 'Mentorship and support for new students as they navigate their first year at KSHS.',
    },
    {
      title: 'Peer Tutoring',
      body: 'Students helping students — sharing study strategies and academic support.',
    },
    {
      title: 'Public Speaking Sessions',
      body: 'Structured opportunities to practice speeches, storytelling, and debate.',
    },
    {
      title: 'Creative Media Projects',
      body: 'Photography, video, and design projects that capture and share the community.',
    },
  ];
  return (
    <Section
      eyebrow="Signature Programs"
      title="Work that defines us"
      icon={Sparkles}
      bg="white"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {programs.map((p) => (
          <div
            key={p.title}
            className="rounded-xl bg-stone-50/70 p-6 border border-stone-200/80"
          >
            <h3 className="font-serif text-lg text-stone-900">{p.title}</h3>
            <p className="mt-2 text-sm text-stone-600">{p.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function SpecialEvents() {
  const events = [
    'Welcome events for new members',
    'Workshops and skill-building sessions',
    'Competitions and challenges',
    'Guest speaker sessions',
    'Community service activities',
    'End-of-term reflections and celebrations',
  ];
  return (
    <Section
      eyebrow="Special Events"
      title="Moments that bring us together"
      icon={CalendarDays}
      bg="stone"
    >
      <ul className="space-y-3">
        {events.map((e) => (
          <li key={e} className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
            <span className="text-stone-700">{e}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function FuturePartners() {
  return (
    <Section
      eyebrow="Future Partners"
      title="Collaboration is part of the vision"
      icon={Handshake}
      bg="white"
    >
      <p>
        Through collaboration with students, educators, professionals,
        organizations, and communities, Axioria hopes to create more
        opportunities for young people to learn, lead, serve, and connect. We
        welcome partners who share the belief that every young person deserves
        guidance and opportunity.
      </p>
    </Section>
  );
}

function LongTermDream() {
  return (
    <Section
      eyebrow="Long-Term Dream"
      title="A model that can grow beyond one school"
      icon={Telescope}
      bg="stone"
    >
      <p>
        Our long-term vision is to develop a model of youth participation that
        can inspire and support young people in different communities. From one
        idea to a community. From one community to many. From one seed to a
        forest of young leaders.
      </p>
    </Section>
  );
}

function FinalMessage({ navigate }: Props) {
  return (
    <section className="py-24 sm:py-32 bg-emerald-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-emerald-400 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-3xl px-5 text-center">
        <Sprout className="h-10 w-10 text-emerald-300 mx-auto" />
        <h2 className="mt-6 font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight">
          Every student deserves guidance. Every young person deserves an
          opportunity to grow.
        </h2>
        <p className="mt-6 text-lg text-emerald-100/90 leading-relaxed">
          The greatest impact is not only what we achieve individually. It is
          also what we leave behind for the people who come after us. If we can
          help someone gain confidence, discover an opportunity, or believe in
          themselves a little more, then our effort has meaning.
        </p>
        <p className="mt-8 font-serif text-2xl text-emerald-200">
          No Student Walks Alone.
        </p>
        <button
          onClick={() => navigate('/join')}
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-7 py-3.5 text-base font-semibold text-white hover:bg-emerald-400 transition-colors"
        >
          Join Axioria
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
