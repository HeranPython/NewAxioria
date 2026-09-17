import { type ReactNode } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

type Props = {
  children: ReactNode;
  current: string;
  navigate: (to: string) => void;
};

export function PageShell({ children, current, navigate }: Props) {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-800 antialiased">
      <Navbar current={current} navigate={navigate} />
      <main className="flex-1 pt-16 sm:pt-20">{children}</main>
      <Footer navigate={navigate} />
    </div>
  );
}
