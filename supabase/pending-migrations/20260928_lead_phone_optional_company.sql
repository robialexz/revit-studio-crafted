-- NEAPLICATĂ. Necesită aprobare explicită înainte de rulare în producție.
-- Se află în supabase/pending-migrations/ ca să nu fie preluată automat de
-- `supabase db push` sau de sincronizarea cu Lovable. După aprobare: mut-o în
-- supabase/migrations/ și rul-o (SQL Editor sau `supabase db push`).
--
-- Efect: telefonul devine opțional (primul contact cere email, nu telefon) și
-- se adaugă compania / biroul, opțional. Aditiv, fără pierdere de date;
-- rândurile existente rămân neschimbate. Idempotentă: poate fi rulată de mai
-- multe ori.
--
-- Codul funcționează și înainte de migrare: la schema veche salvează telefonul
-- ca șir gol și trece compania în descriere (vezi legacyPayload în
-- src/lib/leads.functions.ts).
--
-- Rollback (doar dacă nu există rânduri cu phone NULL):
--   ALTER TABLE public.leads ALTER COLUMN phone SET NOT NULL;
--   ALTER TABLE public.leads DROP COLUMN IF EXISTS company;

ALTER TABLE public.leads ALTER COLUMN phone DROP NOT NULL;

ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS company text;
