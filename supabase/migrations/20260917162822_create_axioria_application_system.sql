/*
# Create Axioria application system

1. New Tables
- `admin_users`: allowlisted Supabase accounts that may access the private dashboard.
- `applications`: student applications, private to administrators after public submission.
- `contact_messages`: messages sent from the public Reach Out form, private to administrators.

2. Application fields
- `applications` stores applicant details, selected committees, written responses, status, timestamps, and a status-email marker.
- Status is restricted to `new`, `accepted`, or `rejected`.

3. Contact fields
- `contact_messages` stores the sender name, email, message, and timestamps.

4. Security
- Row-level security is enabled on every table.
- Anonymous visitors may only create applications and contact messages.
- Only authenticated accounts listed in `admin_users` may view or update applications and contact messages.
- Admin status changes are limited to the accepted status values.
- The helper function used by policies has a fixed search path and cannot be called by anonymous visitors.

5. Notes
- Add an administrator by inserting their authenticated user ID into `admin_users` through a trusted administrative workflow.
- No applicant data is exposed through public reads.
*/

CREATE TABLE IF NOT EXISTS public.admin_users (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  grade text NOT NULL,
  class_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  guardian_name text NOT NULL,
  guardian_contact text NOT NULL,
  guardian_relationship text NOT NULL,
  preferred_committee text NOT NULL,
  second_choice_committee text NOT NULL,
  skills text NOT NULL,
  passions text NOT NULL,
  holding_back text NOT NULL,
  goals text NOT NULL,
  why_join text NOT NULL,
  anything_else text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'accepted', 'rejected')),
  status_email_sent text NOT NULL DEFAULT 'none' CHECK (status_email_sent IN ('none', 'accepted', 'rejected')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE OR REPLACE FUNCTION public.is_axioria_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()
  );
$$;

REVOKE ALL ON FUNCTION public.is_axioria_admin() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.is_axioria_admin() FROM anon;
GRANT EXECUTE ON FUNCTION public.is_axioria_admin() TO authenticated;

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "admins_read_own_admin_record" ON public.admin_users;
CREATE POLICY "admins_read_own_admin_record" ON public.admin_users FOR SELECT TO authenticated USING (user_id = auth.uid());
DROP POLICY IF EXISTS "no_public_admin_inserts" ON public.admin_users;
CREATE POLICY "no_public_admin_inserts" ON public.admin_users FOR INSERT TO authenticated WITH CHECK (false);
DROP POLICY IF EXISTS "no_public_admin_updates" ON public.admin_users;
CREATE POLICY "no_public_admin_updates" ON public.admin_users FOR UPDATE TO authenticated USING (false) WITH CHECK (false);
DROP POLICY IF EXISTS "no_public_admin_deletes" ON public.admin_users;
CREATE POLICY "no_public_admin_deletes" ON public.admin_users FOR DELETE TO authenticated USING (false);

DROP POLICY IF EXISTS "public_submit_applications" ON public.applications;
CREATE POLICY "public_submit_applications" ON public.applications FOR INSERT TO anon, authenticated WITH CHECK (
  status = 'new' AND status_email_sent = 'none'
);
DROP POLICY IF EXISTS "admins_read_applications" ON public.applications;
CREATE POLICY "admins_read_applications" ON public.applications FOR SELECT TO authenticated USING (public.is_axioria_admin());
DROP POLICY IF EXISTS "admins_update_applications" ON public.applications;
CREATE POLICY "admins_update_applications" ON public.applications FOR UPDATE TO authenticated USING (public.is_axioria_admin()) WITH CHECK (
  public.is_axioria_admin() AND status IN ('new', 'accepted', 'rejected')
);
DROP POLICY IF EXISTS "admins_delete_applications" ON public.applications;
CREATE POLICY "admins_delete_applications" ON public.applications FOR DELETE TO authenticated USING (public.is_axioria_admin());

DROP POLICY IF EXISTS "public_submit_contact_messages" ON public.contact_messages;
CREATE POLICY "public_submit_contact_messages" ON public.contact_messages FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "admins_read_contact_messages" ON public.contact_messages;
CREATE POLICY "admins_read_contact_messages" ON public.contact_messages FOR SELECT TO authenticated USING (public.is_axioria_admin());
DROP POLICY IF EXISTS "admins_update_contact_messages" ON public.contact_messages;
CREATE POLICY "admins_update_contact_messages" ON public.contact_messages FOR UPDATE TO authenticated USING (public.is_axioria_admin()) WITH CHECK (public.is_axioria_admin());
DROP POLICY IF EXISTS "admins_delete_contact_messages" ON public.contact_messages;
CREATE POLICY "admins_delete_contact_messages" ON public.contact_messages FOR DELETE TO authenticated USING (public.is_axioria_admin());

CREATE INDEX IF NOT EXISTS applications_status_created_at_idx ON public.applications(status, created_at DESC);
CREATE INDEX IF NOT EXISTS contact_messages_created_at_idx ON public.contact_messages(created_at DESC);
