import { useEffect, useState } from 'react';
import { Menu, X, ChevronDown, Sprout } from 'lucide-react';
import { navItems } from '@/lib/content';

type Props = {
  current: string;
  navigate: (to: string) => void;
};

export function Navbar({ current, navigate }: Props) {
  const [open, setOpen] = useState(false);
  const [progOpen, setProgOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setProgOpen(false);
  }, [current]);

  const go = (href: string) => {
    navigate(href);
    setOpen(false);
  };

  const isActive = (href: string) =>
    href === '/' ? current === '/' : current.startsWith(href);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-stone-200/70'
          : 'bg-white/80 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 flex items-center justify-between h-16 sm:h-20">
        <button
          onClick={() => go('/')}
          className="flex items-center gap-2.5 group"
          aria-label="Axioria home"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-700 text-white shadow-sm group-hover:scale-105 transition-transform">
            <Sprout className="h-5 w-5" strokeWidth={2.25} />
          </span>
          <span className="font-serif text-lg sm:text-xl tracking-tight text-stone-900">
            Axioria
          </span>
        </button>

        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setProgOpen(true)}
                onMouseLeave={() => setProgOpen(false)}
              >
                <button
                  onClick={() => go(item.href)}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-stone-700 hover:text-emerald-800 rounded-full hover:bg-stone-100/80 transition-colors"
                >
                  {item.label}
                  <ChevronDown className="h-4 w-4 opacity-60" />
                </button>
                <div
                  className={`absolute left-1/2 -translate-x-1/2 top-full pt-2 w-72 transition-all duration-200 ${
                    progOpen
                      ? 'opacity-100 visible translate-y-0'
                      : 'opacity-0 invisible -translate-y-1'
                  }`}
                >
                  <div className="rounded-2xl border border-stone-200 bg-white p-2 shadow-xl shadow-stone-300/30">
                    <button
                      onClick={() => go(item.href)}
                      className="block w-full text-left px-3 py-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 hover:bg-emerald-50 rounded-lg"
                    >
                      All Programs
                    </button>
                    {item.children.map((c) => (
                      <button
                        key={c.slug}
                        onClick={() => go(`/programs/${c.slug}`)}
                        className="flex w-full items-start gap-3 px-3 py-2.5 text-left rounded-xl hover:bg-stone-50"
                      >
                        <span className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                          <c.icon className="h-4 w-4" />
                        </span>
                        <span>
                          <span className="block text-sm font-medium text-stone-900">
                            {c.name}
                          </span>
                          <span className="block text-xs text-stone-500 leading-snug">
                            {c.short}
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <button
                key={item.label}
                onClick={() => go(item.href)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  item.highlight
                    ? 'bg-emerald-700 text-white hover:bg-emerald-800 shadow-sm'
                    : isActive(item.href)
                    ? 'text-emerald-800 bg-emerald-50'
                    : 'text-stone-700 hover:text-emerald-800 hover:bg-stone-100/80'
                }`}
              >
                {item.label}
              </button>
            )
          )}
        </div>

        <button
          className="lg:hidden flex items-center justify-center h-10 w-10 rounded-full text-stone-800 hover:bg-stone-100"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <div
        className={`lg:hidden overflow-hidden transition-[max-height] duration-300 ${
          open ? 'max-h-[80vh]' : 'max-h-0'
        }`}
      >
        <div className="px-5 pb-6 pt-2 space-y-1 bg-white border-t border-stone-200">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.label} className="py-1">
                <button
                  onClick={() => setProgOpen((v) => !v)}
                  className="flex w-full items-center justify-between px-3 py-2.5 text-base font-medium text-stone-800"
                >
                  {item.label}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      progOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {progOpen && (
                  <div className="pl-3 space-y-0.5">
                    <button
                      onClick={() => go(item.href)}
                      className="block w-full text-left px-3 py-2 text-sm text-emerald-700 font-medium"
                    >
                      All Programs
                    </button>
                    {item.children.map((c) => (
                      <button
                        key={c.slug}
                        onClick={() => go(`/programs/${c.slug}`)}
                        className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm text-stone-700"
                      >
                        <c.icon className="h-4 w-4 text-emerald-600 flex-none" />
                        {c.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <button
                key={item.label}
                onClick={() => go(item.href)}
                className={`block w-full text-left px-3 py-2.5 rounded-xl text-base font-medium ${
                  item.highlight
                    ? 'bg-emerald-700 text-white'
                    : 'text-stone-800 hover:bg-stone-100'
                }`}
              >
                {item.label}
              </button>
            )
          )}
        </div>
      </div>
    </header>
  );
}
