-- Idempotență + status notificare pentru pipeline-ul de lead (V1).
-- Se aplică manual (Supabase Dashboard → SQL Editor) sau via CLI (`supabase db push`).
-- Idempotent: poate fi rulat de mai multe ori.

-- Token de idempotență generat client-side per încercare de trimitere.
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS submission_id uuid;

-- Statusul notificării email: 'pending' | 'sent' | 'failed'
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS notification_status text NOT NULL DEFAULT 'pending';

-- Unicitate atomică: retry-urile aceleiași trimiteri nu pot crea rânduri
-- duplicate, nici la cereri concurente (fără race check-then-insert).
-- Index parțial: rândurile vechi cu submission_id NULL rămân permise.
CREATE UNIQUE INDEX IF NOT EXISTS leads_submission_id_idx
  ON public.leads (submission_id)
  WHERE submission_id IS NOT NULL;
