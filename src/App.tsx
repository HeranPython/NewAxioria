import { useHashRoute } from '@/lib/useHashRoute';
import { PageShell } from '@/components/PageShell';
import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { ProgramsPage, CommitteePage } from '@/pages/ProgramsPage';
import { JoinPage } from '@/pages/JoinPage';
import { AdminPage } from '@/pages/AdminPage';

function App() {
  const [path, navigate] = useHashRoute();

  let page;
  if (path === '/about') page = <AboutPage navigate={navigate} />;
  else if (path === '/programs') page = <ProgramsPage navigate={navigate} />;
  else if (path.startsWith('/programs/')) {
    const slug = path.replace('/programs/', '');
    const valid = ['tutoring-mentorship', 'news', 'public-speaking', 'media', 'events'];
    if (valid.includes(slug)) {
      page = <CommitteePage slug={slug} navigate={navigate} />;
    } else {
      page = <HomePage navigate={navigate} />;
    }
  } else if (path === '/join') page = <JoinPage navigate={navigate} />;
  else if (path === '/admin') page = <AdminPage navigate={navigate} />;
  else page = <HomePage navigate={navigate} />;

  const hideChrome = path === '/admin';

  if (hideChrome) {
    return (
      <div className="min-h-screen bg-stone-100 font-sans text-stone-800 antialiased">
        {page}
      </div>
    );
  }

  return (
    <PageShell current={path} navigate={navigate}>
      {page}
    </PageShell>
  );
}

export default App;
