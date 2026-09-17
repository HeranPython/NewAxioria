import { ArrowRight, ArrowLeft } from 'lucide-react';
import { committees } from '@/lib/content';

type Props = { navigate: (to: string) => void };

export function ProgramsPage({ navigate }: Props) {
  return (
    <>
      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-700">
            Programs
          </span>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl lg:text-6xl text-stone-900 tracking-tight">
            Five committees, one community
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-stone-600 leading-relaxed">
            Axioria brings different skills and interests together through five
            main committees. Each opens a different path to learn, contribute,
            and grow.
          </p>
        </div>
      </section>

      <section className="pb-24 sm:pb-32 bg-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 space-y-8">
          {committees.map((c) => (
            <div
              key={c.slug}
              className="grid gap-8 lg:grid-cols-3 rounded-3xl border border-stone-200 bg-stone-50/50 p-7 sm:p-10"
            >
              <div className="lg:col-span-1">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-700 text-white">
                  <c.icon className="h-7 w-7" />
                </span>
                <h2 className="mt-5 font-serif text-2xl sm:text-3xl text-stone-900">
                  {c.name}
                </h2>
                <p className="mt-2 text-sm font-medium text-emerald-700">
                  {c.focus}
                </p>
              </div>
              <div className="lg:col-span-2">
                <p className="font-serif text-lg text-stone-800 italic">
                  {c.tagline}
                </p>
                <p className="mt-3 text-stone-600 leading-relaxed">
                  {c.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {c.activities.map((a) => (
                    <span
                      key={a}
                      className="rounded-full bg-white px-3.5 py-1.5 text-sm text-stone-700 border border-stone-200"
                    >
                      {a}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => navigate(`/programs/${c.slug}`)}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:gap-2.5 transition-all"
                >
                  Learn more
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export function CommitteePage({
  slug,
  navigate,
}: {
  slug: string;
  navigate: (to: string) => void;
}) {
  const committee = committees.find((c) => c.slug === slug);
  if (!committee) {
    return (
      <div className="py-32 text-center">
        <h1 className="font-serif text-3xl text-stone-900">Committee not found</h1>
        <button
          onClick={() => navigate('/programs')}
          className="mt-6 text-emerald-700 font-medium"
        >
          Back to Programs
        </button>
      </div>
    );
  }

  const idx = committees.findIndex((c) => c.slug === slug);
  const prev = committees[(idx - 1 + committees.length) % committees.length];
  const next = committees[(idx + 1) % committees.length];

  return (
    <>
      <section className="py-20 sm:py-28 bg-stone-50">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <button
            onClick={() => navigate('/programs')}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-500 hover:text-emerald-700"
          >
            <ArrowLeft className="h-4 w-4" />
            All Programs
          </button>
          <div className="mt-8 grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-700 text-white">
                <committee.icon className="h-8 w-8" />
              </span>
              <h1 className="mt-6 font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 tracking-tight">
                {committee.name} Committee
              </h1>
              <p className="mt-3 text-sm font-medium text-emerald-700">
                {committee.focus}
              </p>
            </div>
            <div className="lg:col-span-2">
              <p className="font-serif text-xl text-stone-800 italic">
                {committee.tagline}
              </p>
              <p className="mt-4 text-lg text-stone-600 leading-relaxed">
                {committee.description}
              </p>
              <h3 className="mt-8 font-serif text-lg text-stone-900">
                Possible Activities
              </h3>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {committee.activities.map((a) => (
                  <span
                    key={a}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-stone-700 border border-stone-200"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                    {a}
                  </span>
                ))}
              </div>
              <div className="mt-10 rounded-2xl bg-gradient-to-br from-emerald-700 to-emerald-900 p-8 text-white">
                <h3 className="font-serif text-xl">
                  Ready to join the {committee.name} Committee?
                </h3>
                <p className="mt-2 text-sm text-emerald-100/90">
                  Apply to Axioria and choose this committee as your preference.
                </p>
                <button
                  onClick={() => navigate('/join')}
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-800 hover:bg-emerald-50 transition-colors"
                >
                  Join This Committee
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-t border-stone-200">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 flex flex-col sm:flex-row gap-4 justify-between">
          <button
            onClick={() => navigate(`/programs/${prev.slug}`)}
            className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-emerald-700"
          >
            <ArrowLeft className="h-4 w-4" />
            {prev.name}
          </button>
          <button
            onClick={() => navigate(`/programs/${next.slug}`)}
            className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-emerald-700"
          >
            {next.name}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </>
  );
}
