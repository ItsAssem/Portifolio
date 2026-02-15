-- Create projects table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  Glink TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Enable read access for all users" ON projects
  FOR SELECT USING (true);

-- Create policy for authenticated write access
CREATE POLICY "Enable insert for authenticated users" ON projects
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Create policy for authenticated update access
CREATE POLICY "Enable update for authenticated users" ON projects
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Create policy for authenticated delete access
CREATE POLICY "Enable delete for authenticated users" ON projects
  FOR DELETE USING (auth.role() = 'authenticated');

-- Insert sample data (you can remove this after testing)
INSERT INTO projects (title, description, tags, Glink, order_index) VALUES
('Q-SAR Drone Swarm for Disaster Management', 
 '-Designed and implemented a scalable disaster response system using autonomous drone swarms\n-Developed navigation algorithms and integrated real-time control with Mission Planner and sensor fusion\n-Improved system efficiency by 20% through optimized algorithms and advanced automation',
 ARRAY['React', 'NodeJS', 'DroneKit', 'Python', 'TailWind'],
 'https://mahmoudmohamed.vercel.app/',
 0),
('Second Project',
 'An innovative project with modern design patterns.',
 ARRAY['React', 'TypeScript'],
 'https://example.com/second-project',
 1),
('Third Project',
 'A creative project showcasing advanced techniques.',
 ARRAY['React', 'Tailwind'],
 'https://example.com/third-project',
 2),
('Fourth Project',
 'A robust application with scalable architecture.',
 ARRAY['React', 'NodeJS'],
 'https://example.com/fourth-project',
 3),
('Fifth Project',
 'A dynamic project leveraging cutting-edge technologies.',
 ARRAY['React', 'GraphQL'],
 '',
 4);
