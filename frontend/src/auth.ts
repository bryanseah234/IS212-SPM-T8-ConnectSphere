import { createClient, type Session, type SupabaseClient } from '@supabase/supabase-js';

type AuthProvider = 'supabase' | 'demo';

export type AuthUser = {
  email: string;
  roleId: string;
  provider: AuthProvider;
};

type SignInResult =
  | { ok: true; user: AuthUser }
  | { ok: false; message: string };

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ?? import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

let supabaseClient: SupabaseClient | null = null;

function getSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  supabaseClient ??= createClient(supabaseUrl, supabaseAnonKey);
  return supabaseClient;
}

function roleFromSession(session: Session | null) {
  const role = session?.user.app_metadata?.role;
  return typeof role === 'string' ? role : 'organiser';
}

function userFromSession(session: Session | null): AuthUser | null {
  if (!session?.user.email) {
    return null;
  }

  return {
    email: session.user.email,
    roleId: roleFromSession(session),
    provider: 'supabase',
  };
}

function demoSignIn(email: string, password: string): SignInResult {
  const normalisedEmail = email.trim().toLowerCase();
  const demoUsers: Record<string, string> = {
    'organiser_a@clienta.com': 'organiser',
    'coordinator@connectsphere.sg': 'coordinator',
    'venue.staff@connectsphere.sg': 'venue',
    'tech.staff@connectsphere.sg': 'technical',
    'attendee@example.com': 'attendee',
  };

  if (password !== 'connectsphere-demo' || !demoUsers[normalisedEmail]) {
    return { ok: false, message: 'Email or password is incorrect.' };
  }

  return {
    ok: true,
    user: {
      email: normalisedEmail,
      roleId: demoUsers[normalisedEmail],
      provider: 'demo',
    },
  };
}

export function hasSupabaseConfig() {
  return Boolean(getSupabaseClient());
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const client = getSupabaseClient();
  if (!client) {
    return null;
  }

  const { data } = await client.auth.getSession();
  return userFromSession(data.session);
}

export async function signInWithEmail(email: string, password: string): Promise<SignInResult> {
  const client = getSupabaseClient();
  if (!client) {
    return demoSignIn(email, password);
  }

  const { data, error } = await client.auth.signInWithPassword({ email, password });
  if (error) {
    return { ok: false, message: 'Email or password is incorrect.' };
  }

  const user = userFromSession(data.session);
  return user ? { ok: true, user } : { ok: false, message: 'Unable to start a session.' };
}

export async function signOut() {
  const client = getSupabaseClient();
  if (client) {
    await client.auth.signOut();
  }
}

export function subscribeToAuth(callback: (user: AuthUser | null) => void) {
  const client = getSupabaseClient();
  if (!client) {
    return () => undefined;
  }

  const {
    data: { subscription },
  } = client.auth.onAuthStateChange((_event, session) => callback(userFromSession(session)));

  return () => subscription.unsubscribe();
}
