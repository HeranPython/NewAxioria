import { useEffect, useState, useCallback, type FormEvent } from 'react';
import {
  LogIn,
  LogOut,
  Loader2,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Clock,
  Inbox,
  User,
  Mail,
  Phone,
  Users,
  ShieldCheck,
  ChevronRight,
  Search,
  Lock,
  Sprout,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

type Props = { navigate: (to: string) => void };

type Application = {
  id: string;
  full_name: string;
  grade: string;
  class_name: string;
  email: string;
  phone: string;
  guardian_name: string;
  guardian_contact: string;
  guardian_relationship: string;
  preferred_committee: string;
  second_choice_committee: string;
  skills: string;
  passions: string;
  holding_back: string;
  goals: string;
  why_join: string;
  anything_else: string;
  status: 'new' | 'accepted' | 'rejected';
  status_email_sent: string;
  created_at: string;
};

type Tab = 'new' | 'accepted' | 'rejected';

export function AdminPage({ navigate }: Props) {
  const [session, setSession] = useState<boolean | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const checkAdmin = useCallback(async () => {
    const { data } = await supabase.rpc('is_axioria_admin');
    setIsAdmin(!!data);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(!!data.session);
      if (data.session) checkAdmin();
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(!!s);
      if (s) checkAdmin();
      else setIsAdmin(false);
    });
    return () => sub.subscription.unsubscribe();
  }, [checkAdmin]);

  if (session === null) {
    return (
      <div className="py-32 flex items-center justify-center">
        <Loader2 className="h-7 w-7 animate-spin text-emerald-700" />
      </div>
    );
  }

  if (!session) return <Login onLoggedIn={() => setSession(true)} />;

  if (!isAdmin) return <NotAuthorized navigate={navigate} />;

  return <Dashboard onLogout={async () => {
    await supabase.auth.signOut();
    setSession(false);
  }} />;
}

function Login({ onLoggedIn }: { onLoggedIn: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (error) throw error;
      onLoggedIn();
    } catch {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-stone-100 py-16 px-5">
      <div className="w-full max-w-md">
        <div className="rounded-3xl bg-white border border-stone-200 p-8 sm:p-10 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-700 text-white">
              <Lock className="h-5 w-5" />
            </span>
            <div>
              <h1 className="font-serif text-2xl text-stone-900">
                Admin Sign In
              </h1>
              <p className="text-sm text-stone-500">Axioria Initiative</p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="mt-8 space-y-5" noValidate>
            <label className="block">
              <span className="block text-sm font-medium text-stone-700 mb-1.5">
                Email
              </span>
              <input
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@axioria.org"
                required
              />
            </label>
            <label className="block">
              <span className="block text-sm font-medium text-stone-700 mb-1.5">
                Password
              </span>
              <input
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                required
              />
            </label>
            {error && (
              <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                <AlertCircle className="h-4 w-4 flex-none" />
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-emerald-700 px-6 py-3.5 text-base font-semibold text-white hover:bg-emerald-800 disabled:opacity-60 transition-colors"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  Sign In
                </>
              )}
            </button>
          </form>
        </div>
        <p className="mt-5 text-center text-sm text-stone-500">
          Authorized administrators only.
        </p>
      </div>
    </section>
  );
}

function NotAuthorized({ navigate }: Props) {
  return (
    <section className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-stone-100 py-16 px-5">
      <div className="text-center max-w-md">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-700">
          <ShieldCheck className="h-7 w-7" />
        </span>
        <h1 className="mt-5 font-serif text-2xl text-stone-900">
          You are signed in, but not authorized as an Axioria administrator.
        </h1>
        <p className="mt-3 text-stone-600">
          Your account does not have admin access. Contact the Axioria
          coordinator if you believe this is an error.
        </p>
        <button
          onClick={async () => {
            await supabase.auth.signOut();
            navigate('/');
          }}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-stone-800 px-6 py-3 text-sm font-semibold text-white hover:bg-stone-900"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </section>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>('new');
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Application | null>(null);
  const [search, setSearch] = useState('');
  const [acting, setActing] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setApps(data as Application[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = apps
    .filter((a) => a.status === tab)
    .filter((a) =>
      search.trim()
        ? a.full_name.toLowerCase().includes(search.toLowerCase()) ||
          a.email.toLowerCase().includes(search.toLowerCase()) ||
          a.preferred_committee.toLowerCase().includes(search.toLowerCase())
        : true
    );

  const counts = {
    new: apps.filter((a) => a.status === 'new').length,
    accepted: apps.filter((a) => a.status === 'accepted').length,
    rejected: apps.filter((a) => a.status === 'rejected').length,
  };

  const updateStatus = async (app: Application, status: 'accepted' | 'rejected') => {
    if (app.status === status) return;
    setActing(app.id);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;
      if (!token) throw new Error('No session');

      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-status-email`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            application_id: app.id,
            new_status: status,
          }),
        }
      );
      if (!res.ok) throw new Error('Failed to update status');

      setToast(
        status === 'accepted'
          ? `${app.full_name} has been accepted. A welcome email was sent.`
          : `${app.full_name} has been rejected. An update email was sent.`
      );
      setTimeout(() => setToast(null), 4000);
      await load();
      setSelected(null);
    } catch {
      setToast('Could not update the application. Please try again.');
      setTimeout(() => setToast(null), 4000);
    } finally {
      setActing(null);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-stone-100">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-700 text-white">
                <Sprout className="h-5 w-5" />
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl text-stone-900">
                Admin Dashboard
              </h1>
            </div>
            <p className="mt-1.5 text-sm text-stone-500">
              Axioria Initiative — application management
            </p>
          </div>
          <button
            onClick={onLogout}
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-stone-700 border border-stone-300 hover:bg-stone-50"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <TabCard
            label="New"
            count={counts.new}
            active={tab === 'new'}
            onClick={() => setTab('new')}
            icon={Inbox}
            accent="emerald"
          />
          <TabCard
            label="Accepted"
            count={counts.accepted}
            active={tab === 'accepted'}
            onClick={() => setTab('accepted')}
            icon={CheckCircle2}
            accent="green"
          />
          <TabCard
            label="Rejected"
            count={counts.rejected}
            active={tab === 'rejected'}
            onClick={() => setTab('rejected')}
            icon={XCircle}
            accent="stone"
          />
        </div>

        <div className="mt-6 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
          <input
            className="form-input pl-11"
            placeholder="Search by name, email, or committee"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="mt-6 rounded-2xl bg-white border border-stone-200 overflow-hidden">
          {loading ? (
            <div className="py-20 flex items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-stone-400" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center">
              <Inbox className="h-10 w-10 text-stone-300 mx-auto" />
              <p className="mt-3 text-stone-500">
                No {tab} applications {search ? 'match your search' : 'yet'}.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-stone-100">
              {filtered.map((app) => (
                <li key={app.id}>
                  <button
                    onClick={() => setSelected(app)}
                    className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-stone-50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-stone-900 truncate">
                        {app.full_name}
                      </p>
                      <p className="text-sm text-stone-500 truncate">
                        Grade {app.grade} · {app.preferred_committee}
                      </p>
                    </div>
                    <div className="hidden sm:block text-right">
                      <p className="text-sm text-stone-600">
                        {new Date(app.created_at).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-stone-400">
                        {new Date(app.created_at).toLocaleTimeString()}
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-stone-300 flex-none" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {selected && (
        <DetailDrawer
          app={selected}
          onClose={() => setSelected(null)}
          onAccept={() => updateStatus(selected, 'accepted')}
          onReject={() => updateStatus(selected, 'rejected')}
          acting={acting === selected.id}
        />
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-xl bg-stone-900 text-white px-5 py-3 text-sm shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}

function TabCard({
  label,
  count,
  active,
  onClick,
  icon: Icon,
  accent,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
  icon: typeof Inbox;
  accent: 'emerald' | 'green' | 'stone';
}) {
  const accentMap = {
    emerald: active ? 'bg-emerald-700 text-white' : 'bg-white text-stone-700',
    green: active ? 'bg-green-700 text-white' : 'bg-white text-stone-700',
    stone: active ? 'bg-stone-800 text-white' : 'bg-white text-stone-700',
  };
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl p-5 border transition-all text-left ${accentMap[accent]} ${
        active ? 'border-transparent shadow-md' : 'border-stone-200 hover:border-stone-300'
      }`}
    >
      <div className="flex items-center justify-between">
        <Icon className="h-5 w-5 opacity-80" />
        <span className="text-2xl font-serif">{count}</span>
      </div>
      <p className="mt-2 text-sm font-medium">{label} applications</p>
    </button>
  );
}

function DetailDrawer({
  app,
  onClose,
  onAccept,
  onReject,
  acting,
}: {
  app: Application;
  onClose: () => void;
  onAccept: () => void;
  onReject: () => void;
  acting: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-stone-950/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-xl h-full bg-white shadow-2xl overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between">
          <h2 className="font-serif text-xl text-stone-900">Application</h2>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700"
          >
            <XCircle className="h-5 w-5" />
          </button>
        </div>

        <div className="px-6 py-6 space-y-6">
          <div className="flex items-center gap-3">
            <StatusBadge status={app.status} />
            <span className="text-sm text-stone-500">
              Submitted {new Date(app.created_at).toLocaleString()}
            </span>
          </div>

          <Section title="Personal Information">
            <Row icon={User} label="Full name" value={app.full_name} />
            <Row icon={Inbox} label="Grade" value={`Grade ${app.grade}`} />
            <Row icon={Inbox} label="Class" value={app.class_name} />
            <Row icon={Mail} label="Email" value={app.email} />
            <Row icon={Phone} label="Phone" value={app.phone} />
            <Row
              icon={Users}
              label="Parent / guardian"
              value={`${app.guardian_name} (${app.guardian_relationship})`}
            />
            <Row
              icon={Phone}
              label="Guardian contact"
              value={app.guardian_contact}
            />
          </Section>

          <Section title="Application Responses">
            <Row
              icon={Inbox}
              label="Preferred committee"
              value={app.preferred_committee}
            />
            <Row
              icon={Inbox}
              label="Second choice"
              value={app.second_choice_committee}
            />
            <TextRow label="Skills you can bring" value={app.skills} />
            <TextRow label="Passions" value={app.passions} />
            <TextRow label="What holds you back" value={app.holding_back} />
            <TextRow label="Goals as a member" value={app.goals} />
            <TextRow label="Why Axioria" value={app.why_join} />
            {app.anything_else && (
              <TextRow label="Anything else" value={app.anything_else} />
            )}
          </Section>

          {app.status === 'new' && (
            <div className="flex gap-3 pt-2">
              <button
                onClick={onAccept}
                disabled={acting}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-700 px-6 py-3.5 text-base font-semibold text-white hover:bg-emerald-800 disabled:opacity-60 transition-colors"
              >
                {acting ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <CheckCircle2 className="h-5 w-5" />
                    Accept
                  </>
                )}
              </button>
              <button
                onClick={onReject}
                disabled={acting}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-stone-200 px-6 py-3.5 text-base font-semibold text-stone-700 hover:bg-stone-300 disabled:opacity-60 transition-colors"
              >
                <XCircle className="h-5 w-5" />
                Reject
              </button>
            </div>
          )}

          {app.status !== 'new' && (
            <div className="rounded-xl bg-stone-50 border border-stone-200 px-5 py-4 text-sm text-stone-600">
              This application has been <strong>{app.status}</strong>. A
              status email was sent to the applicant.
              {app.status === 'accepted' && (
                <button
                  onClick={onReject}
                  disabled={acting}
                  className="mt-3 block text-sm font-medium text-stone-700 hover:text-stone-900"
                >
                  Move to rejected instead
                </button>
              )}
              {app.status === 'rejected' && (
                <button
                  onClick={onAccept}
                  disabled={acting}
                  className="mt-3 block text-sm font-medium text-emerald-700 hover:text-emerald-800"
                >
                  Move to accepted instead
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="font-serif text-lg text-stone-900 mb-3">{title}</h3>
      <div className="space-y-2.5">{children}</div>
    </div>
  );
}

function Row({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof User;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="h-4 w-4 text-stone-400 mt-0.5 flex-none" />
      <div>
        <span className="block text-xs text-stone-500">{label}</span>
        <span className="text-sm text-stone-800">{value}</span>
      </div>
    </div>
  );
}

function TextRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-stone-50 p-4">
      <span className="block text-xs text-stone-500 mb-1">{label}</span>
      <p className="text-sm text-stone-800 leading-relaxed whitespace-pre-wrap">
        {value}
      </p>
    </div>
  );
}

function StatusBadge({ status }: { status: Tab }) {
  const map = {
    new: { icon: Clock, text: 'New', cls: 'bg-amber-100 text-amber-800' },
    accepted: {
      icon: CheckCircle2,
      text: 'Accepted',
      cls: 'bg-emerald-100 text-emerald-800',
    },
    rejected: {
      icon: XCircle,
      text: 'Rejected',
      cls: 'bg-stone-200 text-stone-700',
    },
  };
  const m = map[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${m.cls}`}
    >
      <m.icon className="h-3.5 w-3.5" />
      {m.text}
    </span>
  );
}
