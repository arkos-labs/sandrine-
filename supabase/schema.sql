-- ============================================================
-- SafeTask — Supabase Database Schema
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─────────────────────────────────────────────────────────────
-- TABLE: profiles
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id                  UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email               TEXT,
  full_name           TEXT,
  avatar_url          TEXT,
  bio                 TEXT,
  is_tasker           BOOLEAN DEFAULT FALSE,
  skills              TEXT[] DEFAULT '{}',
  hourly_rate         NUMERIC(10, 2),
  charter_signed      BOOLEAN DEFAULT FALSE,
  charter_signed_at   TIMESTAMPTZ,
  identity_verified   BOOLEAN DEFAULT FALSE,
  verification_status TEXT DEFAULT 'unsubmitted'
    CHECK (verification_status IN ('unsubmitted', 'pending', 'approved', 'rejected')),
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─────────────────────────────────────────────────────────────
-- TABLE: tasks (Client Requests)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.tasks (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id   UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  category    TEXT NOT NULL,
  title       TEXT NOT NULL,
  description TEXT,
  budget      NUMERIC(10, 2),
  status      TEXT DEFAULT 'open'
    CHECK (status IN ('open', 'assigned', 'completed', 'cancelled')),
  desired_date TIMESTAMPTZ,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────
-- TABLE: proposals (Tasker Offers)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.proposals (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_id         UUID NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,
  tasker_id       UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  price_proposal  NUMERIC(10, 2),
  message         TEXT,
  status          TEXT DEFAULT 'pending'
    CHECK (status IN ('pending', 'accepted', 'declined')),
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(task_id, tasker_id)
);

-- ─────────────────────────────────────────────────────────────
-- TABLE: messages (Chat)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.messages (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  proposal_id   UUID REFERENCES public.proposals(id) ON DELETE CASCADE,
  sender_id     UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  receiver_id   UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content       TEXT NOT NULL,
  read          BOOLEAN DEFAULT FALSE,
  frozen        BOOLEAN DEFAULT FALSE,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────
-- TABLE: reports (Safety & Moderation)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.reports (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reporter_id   UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  reported_id   UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  context_type  TEXT DEFAULT 'chat'
    CHECK (context_type IN ('chat', 'profile', 'task')),
  reason        TEXT NOT NULL,
  status        TEXT DEFAULT 'pending'
    CHECK (status IN ('pending', 'investigating', 'resolved')),
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- ─── Profiles ────────────────────────────────────────────────
-- Anyone can view profiles
CREATE POLICY "Profiles are publicly viewable"
  ON public.profiles FOR SELECT USING (TRUE);

-- Users can only update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ─── Tasks ───────────────────────────────────────────────────
-- All authenticated users can view open tasks
CREATE POLICY "Authenticated users can view tasks"
  ON public.tasks FOR SELECT
  USING (auth.role() = 'authenticated');

-- Only the task owner can insert / update / delete
CREATE POLICY "Clients can create tasks"
  ON public.tasks FOR INSERT
  WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Clients can update own tasks"
  ON public.tasks FOR UPDATE
  USING (auth.uid() = client_id);

-- ─── Proposals ───────────────────────────────────────────────
CREATE POLICY "Authenticated users can view proposals"
  ON public.proposals FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Taskers can create proposals"
  ON public.proposals FOR INSERT
  WITH CHECK (auth.uid() = tasker_id);

CREATE POLICY "Proposal owners can update their proposals"
  ON public.proposals FOR UPDATE
  USING (auth.uid() = tasker_id);

-- ─── Messages ────────────────────────────────────────────────
-- Only sender and receiver can see messages
CREATE POLICY "Participants can view their messages"
  ON public.messages FOR SELECT
  USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Authenticated users can send messages"
  ON public.messages FOR INSERT
  WITH CHECK (auth.uid() = sender_id);

-- ─── Reports ─────────────────────────────────────────────────
CREATE POLICY "Users can create reports"
  ON public.reports FOR INSERT
  WITH CHECK (auth.uid() = reporter_id);

CREATE POLICY "Users can view their own reports"
  ON public.reports FOR SELECT
  USING (auth.uid() = reporter_id);

-- ============================================================
-- STORAGE BUCKETS
-- ============================================================

-- Create KYC documents bucket (private)
INSERT INTO storage.buckets (id, name, public)
VALUES ('kyc-documents', 'kyc-documents', FALSE)
ON CONFLICT DO NOTHING;

-- Create avatars bucket (public)
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', TRUE)
ON CONFLICT DO NOTHING;

-- Storage policy: only owner can upload KYC
CREATE POLICY "Users can upload own KYC"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'kyc-documents' AND
    auth.uid()::TEXT = (storage.foldername(name))[2]
  );

-- Storage policy: avatars are public
CREATE POLICY "Avatars are public"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload own avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'avatars' AND auth.uid() IS NOT NULL);
