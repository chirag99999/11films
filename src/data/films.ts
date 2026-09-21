export interface Credit {
  role: string;
  name: string;
}

export interface Film {
  slug: string;
  title: string;
  year: number;
  category: string;
  director: string;
  producer: string;
  runtime: string;
  logline: string;
  synopsis: string;
  hero: string;
  gallery: string[];
  credits: Credit[];
  awards?: string[];
  featured?: boolean;
}

export const stills = {
  interior: '/assets/still-interior-BLx-dOBQ.jpg',
  sunset: '/assets/still-sunset-9fLaKA3z.jpg',
  slate: '/assets/still-slate-DrnEhz_h.jpg',
  corridor: '/assets/still-corridor-CMXz0aml.jpg',
  crew: '/assets/still-crew-DT7lqnz8.jpg',
  dance: '/assets/still-dance-DlQ2PXHJ.jpg',
  coast: '/assets/still-coast-6Ml7JQZp.jpg',
  rooftop: '/assets/still-rooftop-C-7vE0Cr.jpg',
};

export const films: Film[] = [
  {
    slug: 'the-last-light',
    title: 'The Last Light',
    year: 2026,
    category: 'Feature',
    director: 'Maya Iyer',
    producer: '11:11 Pictures',
    runtime: '1h 48m',
    logline: 'A woman returns to the town she left, one night before it disappears.',
    synopsis:
      'Set over a single night in a bar that is closing for good, The Last Light follows Ana as she meets the people she abandoned twelve years ago. There are no confrontations. Only glasses, lamps, and the things nobody says. A film about the quiet violence of time.',
    hero: stills.interior,
    gallery: [stills.interior, stills.corridor, stills.dance],
    credits: [
      { role: 'Director', name: 'Maya Iyer' },
      { role: 'Cinematography', name: 'Tomas Rivell' },
      { role: 'Editor', name: 'Sana Kapoor' },
      { role: 'Music', name: 'Elias Roth' },
    ],
    awards: ['Official Selection — Rotterdam 2026'],
    featured: true,
  },
  {
    slug: 'route-66-at-dusk',
    title: 'Route Sixty-Six',
    year: 2025,
    category: 'Feature',
    director: 'Arjun Mehta',
    producer: '11:11 Pictures',
    runtime: '2h 04m',
    logline: 'Two brothers drive west to bury a father they never knew.',
    synopsis:
      'A road film shot entirely at magic hour across four states. The brothers talk about everything except him. By the time the sun goes down for the last time, they have said it anyway.',
    hero: stills.sunset,
    gallery: [stills.sunset, stills.crew, stills.rooftop],
    credits: [
      { role: 'Director', name: 'Arjun Mehta' },
      { role: 'Cinematography', name: 'Lena Voss' },
      { role: 'Editor', name: 'Daniel Okafor' },
      { role: 'Music', name: 'Nadia Fell' },
    ],
  },
  {
    slug: 'glass-weather',
    title: 'Glass Weather',
    year: 2025,
    category: 'Short',
    director: 'Maya Iyer',
    producer: '11:11 Pictures',
    runtime: '18m',
    logline: 'A boy waits for a phone call that may never come.',
    synopsis:
      'Filmed in one apartment over three rainy mornings. Glass Weather is a study in stillness: what a face does when it believes nobody is watching.',
    hero: stills.slate,
    gallery: [stills.slate, stills.coast, stills.dance],
    credits: [
      { role: 'Director', name: 'Maya Iyer' },
      { role: 'Cinematography', name: 'Tomas Rivell' },
      { role: 'Editor', name: 'Sana Kapoor' },
    ],
    awards: ['Best Short — Dharamshala 2025'],
  },
  {
    slug: 'corridor',
    title: 'Corridor',
    year: 2024,
    category: 'Short',
    director: 'Ravi Sen',
    producer: '11:11 Pictures',
    runtime: '24m',
    logline: 'A night porter walks the same hallway for the last time.',
    synopsis:
      'A hotel is being demolished tomorrow. Tonight the porter does his rounds. Every door he passes holds a memory that the building will take with it.',
    hero: stills.corridor,
    gallery: [stills.corridor, stills.interior, stills.slate],
    credits: [
      { role: 'Director', name: 'Ravi Sen' },
      { role: 'Cinematography', name: 'Lena Voss' },
      { role: 'Sound', name: 'Priya Nair' },
    ],
  },
  {
    slug: 'slow-dance',
    title: 'Slow Dance',
    year: 2024,
    category: 'Music',
    director: 'Arjun Mehta',
    producer: '11:11 Pictures',
    runtime: '4m 12s',
    logline: 'One take. One living room. One song.',
    synopsis:
      'A music film built from a single unbroken shot, lit by the television in the corner. The camera never moves. The people do.',
    hero: stills.dance,
    gallery: [stills.dance, stills.rooftop, stills.interior],
    credits: [
      { role: 'Director', name: 'Arjun Mehta' },
      { role: 'Cinematography', name: 'Tomas Rivell' },
    ],
  },
  {
    slug: 'north-shore',
    title: 'North Shore',
    year: 2023,
    category: 'Commercial',
    director: 'Ravi Sen',
    producer: '11:11 Pictures',
    runtime: '1m 30s',
    logline: 'A coat, a cliff, a country that feels like weather.',
    synopsis:
      'A brand film for an outerwear house, shot on the Atlantic coast at blue hour. No product shots. The garment is only ever seen doing what it is for.',
    hero: stills.coast,
    gallery: [stills.coast, stills.slate, stills.crew],
    credits: [
      { role: 'Director', name: 'Ravi Sen' },
      { role: 'Cinematography', name: 'Lena Voss' },
    ],
  },
  {
    slug: 'rooftop-sessions',
    title: 'Rooftop Sessions',
    year: 2023,
    category: 'Music',
    director: 'Maya Iyer',
    producer: '11:11 Pictures',
    runtime: '6m 40s',
    logline: 'The city as a second instrument.',
    synopsis:
      'Recorded live on a rooftop at dusk with the traffic mixed into the track. The neon door behind the musician was already there. We just waited for it to turn on.',
    hero: stills.rooftop,
    gallery: [stills.rooftop, stills.sunset, stills.dance],
    credits: [
      { role: 'Director', name: 'Maya Iyer' },
      { role: 'Sound', name: 'Priya Nair' },
    ],
  },
];

export const featuredFilm = films.find((f) => f.featured) ?? films[0]!;

export function getFilm(slug: string): Film | undefined {
  return films.find((f) => f.slug === slug);
}

export function getNextFilm(slug: string): Film {
  const index = films.findIndex((f) => f.slug === slug);
  return films[(index + 1) % films.length]!;
}
