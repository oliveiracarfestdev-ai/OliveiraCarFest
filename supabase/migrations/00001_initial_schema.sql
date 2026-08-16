-- Create events table
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  location TEXT NOT NULL,
  address_url TEXT,
  description TEXT,
  banner_url TEXT,
  is_next_event BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create albums table
CREATE TABLE albums (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  cover_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create photos table
CREATE TABLE photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  album_id UUID REFERENCES albums(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create sponsors table
CREATE TABLE sponsors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('ouro', 'prata', 'bronze', 'parceiro')),
  logo_url TEXT,
  description TEXT,
  website_url TEXT,
  instagram_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create event_sponsors table (N:M relationship)
CREATE TABLE event_sponsors (
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  sponsor_id UUID REFERENCES sponsors(id) ON DELETE CASCADE,
  PRIMARY KEY (event_id, sponsor_id)
);

-- Create contact_messages table
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  whatsapp TEXT,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create sponsor_leads table
CREATE TABLE sponsor_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  phone TEXT,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pendente',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enforce RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsors ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_sponsors ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsor_leads ENABLE ROW LEVEL SECURITY;

-- Public Read Policies
CREATE POLICY "Public read access for events" ON events FOR SELECT USING (true);
CREATE POLICY "Public read access for albums" ON albums FOR SELECT USING (true);
CREATE POLICY "Public read access for photos" ON photos FOR SELECT USING (true);
CREATE POLICY "Public read access for sponsors" ON sponsors FOR SELECT USING (true);
CREATE POLICY "Public read access for event_sponsors" ON event_sponsors FOR SELECT USING (true);

-- Admin Full Access Policies (using auth.uid() IS NOT NULL for authenticated users)
CREATE POLICY "Admin full access for events" ON events USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admin full access for albums" ON albums USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admin full access for photos" ON photos USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admin full access for sponsors" ON sponsors USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admin full access for event_sponsors" ON event_sponsors USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admin full access for contact_messages" ON contact_messages USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admin full access for sponsor_leads" ON sponsor_leads USING (auth.uid() IS NOT NULL);

-- Public Insert Policies for leads and contacts
CREATE POLICY "Public insert access for contact_messages" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert access for sponsor_leads" ON sponsor_leads FOR INSERT WITH CHECK (true);

-- Create Storage Buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('event-banners', 'event-banners', true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('gallery-images', 'gallery-images', true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('sponsor-logos', 'sponsor-logos', true) ON CONFLICT DO NOTHING;

-- Storage Policies (Banners)
CREATE POLICY "Public read access for banners" ON storage.objects FOR SELECT USING (bucket_id = 'event-banners');
CREATE POLICY "Admin insert access for banners" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'event-banners' AND auth.uid() IS NOT NULL);
CREATE POLICY "Admin update access for banners" ON storage.objects FOR UPDATE USING (bucket_id = 'event-banners' AND auth.uid() IS NOT NULL);
CREATE POLICY "Admin delete access for banners" ON storage.objects FOR DELETE USING (bucket_id = 'event-banners' AND auth.uid() IS NOT NULL);

-- Storage Policies (Gallery)
CREATE POLICY "Public read access for gallery" ON storage.objects FOR SELECT USING (bucket_id = 'gallery-images');
CREATE POLICY "Admin insert access for gallery" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'gallery-images' AND auth.uid() IS NOT NULL);
CREATE POLICY "Admin update access for gallery" ON storage.objects FOR UPDATE USING (bucket_id = 'gallery-images' AND auth.uid() IS NOT NULL);
CREATE POLICY "Admin delete access for gallery" ON storage.objects FOR DELETE USING (bucket_id = 'gallery-images' AND auth.uid() IS NOT NULL);

-- Storage Policies (Sponsors)
CREATE POLICY "Public read access for sponsors" ON storage.objects FOR SELECT USING (bucket_id = 'sponsor-logos');
CREATE POLICY "Admin insert access for sponsors" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'sponsor-logos' AND auth.uid() IS NOT NULL);
CREATE POLICY "Admin update access for sponsors" ON storage.objects FOR UPDATE USING (bucket_id = 'sponsor-logos' AND auth.uid() IS NOT NULL);
CREATE POLICY "Admin delete access for sponsors" ON storage.objects FOR DELETE USING (bucket_id = 'sponsor-logos' AND auth.uid() IS NOT NULL);
