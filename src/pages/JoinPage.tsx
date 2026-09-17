import { useState, type FormEvent } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Sprout,
} from 'lucide-react';
import { committeeNames } from '@/lib/content';
import { supabase } from '@/lib/supabase';

type Props = { navigate: (to: string) => void };

type Step1 = {
  full_name: string;
  grade: string;
  class_name: string;
  email: string;
  phone: string;
  guardian_name: string;
  guardian_contact: string;
  guardian_relationship: string;
};

type Step2 = {
  preferred_committee: string;
  second_choice_committee: string;
  skills: string;
  passions: string;
  holding_back: string;
  goals: string;
  why_join: string;
  anything_else: string;
};

const empty1: Step1 = {
  full_name: '',
  grade: '',
  class_name: '',
  email: '',
  phone: '',
  guardian_name: '',
  guardian_contact: '',
  guardian_relationship: '',
};
const empty2: Step2 = {
  preferred_committee: '',
  second_choice_committee: '',
  skills: '',
  passions: '',
  holding_back: '',
  goals: '',
  why_join: '',
  anything_else: '',
};

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function JoinPage({ navigate }: Props) {
  const [step, setStep] = useState<1 | 2>(1);
  const [data1, setData1] = useState<Step1>(empty1);
  const [data2, setData2] = useState<Step2>(empty2);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [done, setDone] = useState(false);

  const validate1 = (): Record<string, string> => {
    const e: Record<string, string> = {};
    if (!data1.full_name.trim()) e.full_name = 'Please enter your full name.';
    if (!data1.grade.trim()) e.grade = 'Please select your grade.';
    if (!data1.class_name.trim()) e.class_name = 'Please enter your class.';
    if (!data1.email.trim()) e.email = 'Please enter your email.';
    else if (!emailRe.test(data1.email))
      e.email = 'Please enter a valid email address.';
    if (!data1.phone.trim()) e.phone = 'Please enter your phone number.';
    if (!data1.guardian_name.trim())
      e.guardian_name = 'Please enter a parent or guardian name.';
    if (!data1.guardian_contact.trim())
      e.guardian_contact = 'Please enter a parent or guardian contact.';
    if (!data1.guardian_relationship.trim())
      e.guardian_relationship = 'Please enter the relationship.';
    return e;
  };

  const validate2 = (): Record<string, string> => {
    const e: Record<string, string> = {};
    if (!data2.preferred_committee)
      e.preferred_committee = 'Please select your preferred committee.';
    if (!data2.second_choice_committee)
      e.second_choice_committee =
        'Please select a second-choice committee.';
    if (
      data2.preferred_committee &&
      data2.second_choice_committee &&
      data2.preferred_committee === data2.second_choice_committee
    )
      e.second_choice_committee =
        'Second choice must be different from your preferred committee.';
    if (!data2.skills.trim())
      e.skills = 'Please share what skills you can bring.';
    if (!data2.passions.trim())
      e.passions = 'Please share what you are passionate about.';
    if (!data2.holding_back.trim())
      e.holding_back = 'Please share what currently holds you back.';
    if (!data2.goals.trim())
      e.goals = 'Please share what you want to accomplish.';
    if (!data2.why_join.trim())
      e.why_join = 'Please share why you want to join Axioria.';
    return e;
  };

  const onNext = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate1();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const onBack = () => {
    setStep(1);
    setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate2();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setStatus('loading');
    try {
      const { error } = await supabase.from('applications').insert({
        ...data1,
        ...data2,
        anything_else: data2.anything_else.trim(),
      });
      if (error) {
        if (error.code === '23505') {
          setErrors({
            email: 'An application with this email may already exist.',
          });
          setStep(1);
          setStatus('idle');
          return;
        }
        throw error;
      }
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
              type: 'application_received',
              to: data1.email.trim(),
              applicant_name: data1.full_name.trim(),
              preferred_committee: data2.preferred_committee,
            }),
          }
        );
      } catch {
        // confirmation email is best-effort; application is saved
      }
      setDone(true);
      setStatus('idle');
    } catch {
      setStatus('error');
    }
  };

  if (done) {
    return <Confirmation navigate={navigate} />;
  }

  return (
    <>
      <section className="py-16 sm:py-20 bg-stone-50">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-700">
            Join Axioria
          </span>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl text-stone-900 tracking-tight">
            Student Application
          </h1>
          <p className="mt-4 text-lg text-stone-600">
            Two short steps. Take your time — honest answers help us understand
            how you can grow with the community.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <StepBadge n={1} active={step === 1} done={step > 1} label="Personal" />
            <div className="h-px flex-1 bg-stone-300" />
            <StepBadge n={2} active={step === 2} done={false} label="Application" />
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          {status === 'error' && (
            <div className="mb-6 flex items-center gap-3 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              <AlertCircle className="h-5 w-5 flex-none" />
              Something went wrong submitting your application. Please try
              again.
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={onNext} className="space-y-6" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full name" error={errors.full_name} required>
                  <input
                    className="form-input"
                    value={data1.full_name}
                    onChange={(e) =>
                      setData1({ ...data1, full_name: e.target.value })
                    }
                    placeholder="Your full name"
                  />
                </Field>
                <Field label="Grade" error={errors.grade} required>
                  <select
                    className="form-input"
                    value={data1.grade}
                    onChange={(e) =>
                      setData1({ ...data1, grade: e.target.value })
                    }
                  >
                    <option value="">Select grade</option>
                    {['9', '10', '11', '12'].map((g) => (
                      <option key={g} value={g}>
                        Grade {g}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Class" error={errors.class_name} required>
                  <input
                    className="form-input"
                    value={data1.class_name}
                    onChange={(e) =>
                      setData1({ ...data1, class_name: e.target.value })
                    }
                    placeholder="e.g. Section A"
                  />
                </Field>
                <Field label="Email" error={errors.email} required>
                  <input
                    type="email"
                    className="form-input"
                    value={data1.email}
                    onChange={(e) =>
                      setData1({ ...data1, email: e.target.value })
                    }
                    placeholder="you@example.com"
                  />
                </Field>
                <Field label="Phone number" error={errors.phone} required>
                  <input
                    type="tel"
                    className="form-input"
                    value={data1.phone}
                    onChange={(e) =>
                      setData1({ ...data1, phone: e.target.value })
                    }
                    placeholder="Your phone number"
                  />
                </Field>
                <Field
                  label="Parent / guardian name"
                  error={errors.guardian_name}
                  required
                >
                  <input
                    className="form-input"
                    value={data1.guardian_name}
                    onChange={(e) =>
                      setData1({ ...data1, guardian_name: e.target.value })
                    }
                    placeholder="Parent or guardian name"
                  />
                </Field>
                <Field
                  label="Parent / guardian contact"
                  error={errors.guardian_contact}
                  required
                >
                  <input
                    type="tel"
                    className="form-input"
                    value={data1.guardian_contact}
                    onChange={(e) =>
                      setData1({ ...data1, guardian_contact: e.target.value })
                    }
                    placeholder="Phone or email"
                  />
                </Field>
                <Field
                  label="Relationship to applicant"
                  error={errors.guardian_relationship}
                  required
                >
                  <input
                    className="form-input"
                    value={data1.guardian_relationship}
                    onChange={(e) =>
                      setData1({
                        ...data1,
                        guardian_relationship: e.target.value,
                      })
                    }
                    placeholder="e.g. Mother, Father, Guardian"
                  />
                </Field>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-7 py-3.5 text-base font-semibold text-white hover:bg-emerald-800 transition-colors"
                >
                  Continue
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={onSubmit} className="space-y-6" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Preferred committee"
                  error={errors.preferred_committee}
                  required
                >
                  <select
                    className="form-input"
                    value={data2.preferred_committee}
                    onChange={(e) =>
                      setData2({
                        ...data2,
                        preferred_committee: e.target.value,
                      })
                    }
                  >
                    <option value="">Select a committee</option>
                    {committeeNames.map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field
                  label="Second-choice committee"
                  error={errors.second_choice_committee}
                  required
                >
                  <select
                    className="form-input"
                    value={data2.second_choice_committee}
                    onChange={(e) =>
                      setData2({
                        ...data2,
                        second_choice_committee: e.target.value,
                      })
                    }
                  >
                    <option value="">Select a committee</option>
                    {committeeNames.map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <TextArea
                label="What skills can you bring to Axioria?"
                error={errors.skills}
                required
                value={data2.skills}
                onChange={(v) => setData2({ ...data2, skills: v })}
              />
              <TextArea
                label="What are you passionate about?"
                error={errors.passions}
                required
                value={data2.passions}
                onChange={(v) => setData2({ ...data2, passions: v })}
              />
              <TextArea
                label="What is something that currently holds you back?"
                error={errors.holding_back}
                required
                value={data2.holding_back}
                onChange={(v) => setData2({ ...data2, holding_back: v })}
              />
              <TextArea
                label="What do you want to accomplish as an Axioria member?"
                error={errors.goals}
                required
                value={data2.goals}
                onChange={(v) => setData2({ ...data2, goals: v })}
              />
              <TextArea
                label="Why do you want to join Axioria?"
                error={errors.why_join}
                required
                value={data2.why_join}
                onChange={(v) => setData2({ ...data2, why_join: v })}
              />
              <TextArea
                label="Anything else you would like us to know?"
                error={undefined}
                required={false}
                value={data2.anything_else}
                onChange={(v) => setData2({ ...data2, anything_else: v })}
              />

              <div className="flex flex-col sm:flex-row gap-3 justify-between">
                <button
                  type="button"
                  onClick={onBack}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-stone-100 px-6 py-3.5 text-base font-semibold text-stone-700 hover:bg-stone-200 transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                  Back
                </button>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-700 px-7 py-3.5 text-base font-semibold text-white hover:bg-emerald-800 disabled:opacity-60 transition-colors"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit application
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

function StepBadge({
  n,
  active,
  done,
  label,
}: {
  n: number;
  active: boolean;
  done: boolean;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
          done
            ? 'bg-emerald-600 text-white'
            : active
            ? 'bg-emerald-700 text-white'
            : 'bg-stone-200 text-stone-500'
        }`}
      >
        {done ? <Check className="h-4 w-4" /> : n}
      </span>
      <span
        className={`text-sm font-medium ${
          active || done ? 'text-stone-900' : 'text-stone-400'
        }`}
      >
        {label}
      </span>
    </div>
  );
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-stone-700 mb-1.5">
        {label}
        {required && <span className="text-emerald-700"> *</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-sm text-red-600">{error}</span>}
    </label>
  );
}

function TextArea({
  label,
  error,
  required,
  value,
  onChange,
}: {
  label: string;
  error?: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-stone-700 mb-1.5">
        {label}
        {required && <span className="text-emerald-700"> *</span>}
      </span>
      <textarea
        rows={4}
        className="form-input resize-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <span className="mt-1 block text-sm text-red-600">{error}</span>}
    </label>
  );
}

function Confirmation({ navigate }: Props) {
  return (
    <section className="py-24 sm:py-32 bg-stone-50">
      <div className="mx-auto max-w-2xl px-5 sm:px-8 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2 className="h-8 w-8 text-emerald-600" />
        </span>
        <h1 className="mt-6 font-serif text-4xl sm:text-5xl text-stone-900 tracking-tight">
          Application Received
        </h1>
        <p className="mt-5 text-lg text-stone-600 leading-relaxed">
          Thank you for applying to Axioria Initiative. Your application has
          been successfully received and will be reviewed by the Axioria team.
        </p>
        <p className="mt-3 text-sm text-stone-500">
          A confirmation email is on its way to the address you provided.
        </p>
        <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-700 px-7 py-3.5 text-base font-semibold text-white hover:bg-emerald-800 transition-colors"
          >
            <Sprout className="h-4 w-4" />
            Back to Home
          </button>
          <button
            onClick={() => navigate('/programs')}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-stone-700 border border-stone-300 hover:bg-stone-100 transition-colors"
          >
            Explore Programs
          </button>
        </div>
      </div>
    </section>
  );
}
