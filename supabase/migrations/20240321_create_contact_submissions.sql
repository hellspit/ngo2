-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT,
    motivation TEXT NOT NULL,
    skills TEXT NOT NULL,
    availability TEXT NOT NULL,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_submitted_at ON contact_submissions(submitted_at);

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow insert for authenticated users" ON contact_submissions;
DROP POLICY IF EXISTS "Allow select for authenticated users" ON contact_submissions;
DROP POLICY IF EXISTS "Allow public inserts" ON contact_submissions;

-- Add RLS (Row Level Security) policies
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (for contact form)
CREATE POLICY "Allow public inserts" ON contact_submissions
    FOR INSERT TO public
    WITH CHECK (true);

-- Allow select for authenticated users only
CREATE POLICY "Allow select for authenticated users" ON contact_submissions
    FOR SELECT TO authenticated
    USING (true); 