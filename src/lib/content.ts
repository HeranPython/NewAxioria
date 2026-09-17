import {
  GraduationCap,
  Newspaper,
  MessageSquare,
  Camera,
  CalendarDays,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type Committee = {
  slug: string;
  name: string;
  short: string;
  tagline: string;
  description: string;
  focus: string;
  activities: string[];
  icon: LucideIcon;
};

export const committees: Committee[] = [
  {
    slug: 'tutoring-mentorship',
    name: 'Tutoring & Mentorship',
    short: 'Learning, guidance, mentorship, academic support.',
    tagline: 'Guidance grows with every student it touches.',
    description:
      'Supports freshmen through guidance and mentorship. We pair experience with curiosity so that every student has someone to ask, someone to learn from, and someone who believes in their next step.',
    focus: 'Learning • Guidance • Mentorship • Academic Support',
    activities: [
      'Peer tutoring',
      'Freshman guidance',
      'Experience sharing',
      'Study support',
      'Mentorship',
      'Academic and personal-growth guidance',
    ],
    icon: GraduationCap,
  },
  {
    slug: 'news',
    name: 'News',
    short: 'Information, stories, achievements, community updates.',
    tagline: 'Every milestone deserves to be remembered.',
    description:
      'Shares KSHS history, news, achievements, and proud milestones. We keep the community informed and celebrate the people and moments that make Kallamino Special High School what it is.',
    focus: 'Information • Stories • Achievements • Community Updates',
    activities: [
      'School news',
      'Student achievements',
      'KSHS history',
      'Milestones',
      'Interviews',
      'Community updates',
    ],
    icon: Newspaper,
  },
  {
    slug: 'public-speaking',
    name: 'Public Speaking',
    short: 'Communication, confidence, speaking, leadership.',
    tagline: 'A quiet voice can still reach the whole room.',
    description:
      'Develops communication through speeches, storytelling, debates, and discussions. We help students find their voice, shape their thoughts, and speak with confidence and clarity.',
    focus: 'Communication • Confidence • Speaking • Leadership',
    activities: [
      'Public speaking',
      'Storytelling',
      'Debate',
      'Discussions',
      'Communication',
      'Confidence',
      'Leadership',
      'Experience sharing',
    ],
    icon: MessageSquare,
  },
  {
    slug: 'media',
    name: 'Media',
    short: 'Creativity, media, design, digital communication.',
    tagline: 'Ideas become visible when creativity speaks.',
    description:
      'Creates videos, posters, quotes, photography, and club presentations. We turn ideas into visual stories that capture the spirit of Axioria and the life of our community.',
    focus: 'Creativity • Media • Design • Digital Communication',
    activities: [
      'Video',
      'Graphic design',
      'Posters',
      'Photography',
      'Social media and content',
      'Presentations',
      'Visual storytelling',
    ],
    icon: Camera,
  },
  {
    slug: 'events',
    name: 'Events',
    short: 'Planning, teamwork, events, activities.',
    tagline: 'An idea becomes a moment when people gather.',
    description:
      'Plans workshops, competitions, guest speakers, and special events. We turn ideas into experiences that bring students together and create memories worth carrying forward.',
    focus: 'Planning • Teamwork • Events • Activities',
    activities: [
      'Workshops',
      'Competitions',
      'Guest speakers',
      'Welcome events',
      'Leadership activities',
      'Axioria meetings',
      'Special events',
    ],
    icon: CalendarDays,
  },
];

export const committeeNames = committees.map((c) => c.name);

export const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Programs', href: '/programs', children: committees },
  { label: 'Reach Out', href: '/#reach-out' },
  { label: 'Join Axioria', href: '/join', highlight: true },
];
