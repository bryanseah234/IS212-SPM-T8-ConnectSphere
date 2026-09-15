import { createClient } from '@supabase/supabase-js';
import { requireEnv, runtimeConfig } from '../config.js';
import { getDatabasePool } from '../database/client.js';

export type AuthenticatedAppUser = {
  id: string;
  email: string;
  role: string;
  clientOrgId: string | null;
};

let supabaseClient: ReturnType<typeof createClient> | null = null;

function getSupabaseAuthClient() {
  supabaseClient ??= createClient(
    requireEnv(runtimeConfig.supabaseUrl, 'SUPABASE_URL'),
    requireEnv(runtimeConfig.supabaseAnonKey, 'SUPABASE_ANON_KEY'),
  );

  return supabaseClient;
}

export function getBearerToken(authorizationHeader?: string | string[]) {
  const header = Array.isArray(authorizationHeader) ? authorizationHeader[0] : authorizationHeader;
  return header?.startsWith('Bearer ') ? header.slice('Bearer '.length).trim() : undefined;
}

export async function getAuthenticatedAppUser(token: string): Promise<AuthenticatedAppUser | null> {
  const { data, error } = await getSupabaseAuthClient().auth.getUser(token);
  if (error || !data.user.email) {
    return null;
  }

  const result = await getDatabasePool().query<{
    id: string;
    email: string;
    role: string;
    client_org_id: string | null;
  }>(
    `
      SELECT id, email, role::text, client_org_id
      FROM users
      WHERE lower(email) = lower($1)
        AND is_active = true
      LIMIT 1
    `,
    [data.user.email],
  );

  const user = result.rows[0];
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    role: user.role,
    clientOrgId: user.client_org_id,
  };
}
