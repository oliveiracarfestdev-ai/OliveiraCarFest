export type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  address_url?: string;
  description?: string;
  banner_url?: string;
  is_next_event: boolean;
};

export type Album = {
  id: string;
  event_id: string;
  title: string;
  cover_url?: string;
};

export type Photo = {
  id: string;
  album_id: string;
  image_url: string;
};

export type Sponsor = {
  id: string;
  name: string;
  category: 'ouro' | 'prata' | 'bronze' | 'parceiro';
  logo_url?: string;
  description?: string;
  website_url?: string;
  instagram_url?: string;
};

// Dados Mockados para iniciar o desenvolvimento

export const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Encontro Noturno de Clássicos',
    date: '2026-09-15',
    time: '20:00',
    location: 'Bosque Maia - Guarulhos',
    address_url: 'https://maps.google.com',
    description: 'Um encontro focado apenas em veículos fabricados até 1999.',
    banner_url: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=1200&q=80',
    is_next_event: true,
  },
  {
    id: '2',
    title: 'Festival de Rebaixados e Customizados',
    date: '2026-10-20',
    time: '10:00',
    location: 'Estacionamento Internacional Guarulhos',
    description: 'O maior festival de customização da região.',
    is_next_event: false,
  }
];

export const MOCK_SPONSORS: Sponsor[] = [
  {
    id: '1',
    name: 'AutoParts Premium',
    category: 'ouro',
    website_url: 'https://example.com'
  },
  {
    id: '2',
    name: 'Garage Custom',
    category: 'prata'
  }
];
