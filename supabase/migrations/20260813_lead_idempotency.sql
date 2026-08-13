-- Idempotență + retry automat al notificărilor pentru pipeline-ul de lead.
-- Se aplică manual (Supabase Dashboard → SQL Editor) sau via CLI (`supabase db push`).
-- Idempotent: poate fi rulat de mai multe ori.

-- Token de idempotență generat client-side per încercare de trimitere.
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS submission_id uuid;

-- Statusul notificării email: 'pending' | 'sent' | 'failed'
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS notification_status text NOT NULL DEFAULT 'pending';

-- Contabilitatea retry-ului automat (maxim 5 încercări).
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS notification_attempts integer NOT NULL DEFAULT 0;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS notification_last_attempt_at timestamptz;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS notification_sent_at timestamptz;

-- Unicitate atomică: retry-urile aceleiași trimiteri nu pot crea rânduri
-- duplicate, nici la cereri concurente (fără race check-then-insert).
-- Index parțial: rândurile vechi cu submission_id NULL rămân permise.
CREATE UNIQUE INDEX IF NOT EXISTS leads_submission_id_idx
  ON public.leads (submission_id)
  WHERE submission_id IS NOT NULL;

-- Index pentru interogarea retry-ului programat (status + încercări).
CREATE INDEX IF NOT EXISTS leads_notification_status_idx
  ON public.leads (notification_status, notification_attempts)
  WHERE notification_status IN ('pending', 'failed');
