CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  project_type text,
  available_files text[] NOT NULL DEFAULT '{}',
  approximate_sheet_count text,
  deadline text,
  description text,
  page_path text,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  status text NOT NULL DEFAULT 'new'
);

GRANT ALL ON public.leads TO service_role;

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "No public access to leads" ON public.leads FOR SELECT TO authenticated USING (false);

CREATE INDEX leads_created_at_idx ON public.leads (created_at DESC);