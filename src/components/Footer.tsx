import { Sprout, Instagram, Send, Mail } from 'lucide-react';

type Props = { navigate: (to: string) => void };

export function Footer({ navigate }: Props) {
  return (
    <footer className="bg-stone-950 text-stone-300">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-white">
                <Sprout className="h-5 w-5" />
              </span>
              <span className="font-serif text-xl text-white">Axioria</span>
            </div>
            <p className="mt-4 text-sm text-stone-400 leading-relaxed max-w-xs">
              A youth-led initiative at Kallamino Special High School. No
              Student Walks Alone.
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider text-stone-500 font-semibold">
              Explore
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <button
                  onClick={() => navigate('/')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/about')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/programs')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Programs
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/join')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Join Axioria
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider text-stone-500 font-semibold">
              Reach Out
            </h4>
            <a
              href="mailto:heranataklti@gmail.com"
              className="mt-4 inline-flex items-center gap-2 text-sm hover:text-emerald-400 transition-colors"
            >
              <Mail className="h-4 w-4" /> heranataklti@gmail.com
            </a>
            <div className="mt-4 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-800 hover:bg-emerald-600 transition-colors cursor-pointer">
                <Instagram className="h-4 w-4" />
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-800 hover:bg-emerald-600 transition-colors cursor-pointer">
                <Send className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-stone-500">
            © {new Date().getFullYear()} Axioria Initiative. The Future Begins
            Here.
          </p>
          <button
            onClick={() => navigate('/admin')}
            className="text-xs text-stone-600 hover:text-stone-400 transition-colors"
          >
            Admin
          </button>
        </div>
      </div>
    </footer>
  );
}
