import { sessionToken, tokenDigest } from '../accessControl/sessions';
import { Pool } from 'pg';
import { requireEnv } from '../../config';
import type { VercelRequest, VercelResponse } from '../../vercel';
import type { AuthenticatedUser } from '../accessControl/types';
import { sendJson } from '../../http';
import { AccessError, type Query } from './service';

let pool: Pool | undefined;
export function databasePool() {
  pool ??= new Pool({ connectionString: requireEnv(process.env.DATABASE_POOLER_URL || process.env.DATABASE_URL, 'DATABASE_URL'), max: 3 });
  return pool;
}
export const query: Query = (sql, values) => databasePool().query(sql, values);

export async function currentUser(request: VercelRequest): Promise<AuthenticatedUser> {
  const token = sessionToken(request);
  if (!token || !/^[a-f0-9]{64}$/.test(token)) throw new AccessError(401, 'Sign in to continue.');
  const result = await query(`SELECT u.id, u.email, u.role, u.client_org_id AS "clientOrgId", u.is_active AS "isActive",
    u.failed_login_count AS "failedLoginCount", u.locked_until AS "lockedUntil"
    FROM auth_sessions s JOIN users u ON u.id = s.user_id
    WHERE s.token_hash = $1 AND s.expires_at > now()`, [tokenDigest(token)]);
  if (!result.rows[0]) throw new AccessError(401, 'Your session has expired. Please sign in again.');
  return result.rows[0] as AuthenticatedUser;
}

export async function respond(response: VercelResponse, work: () => Promise<Record<string, unknown>>) {
  response.setHeader('Cache-Control', 'private, no-store');
  response.setHeader('Vary', 'Cookie');
  try { sendJson(response, 200, await work()); }
  catch (error) {
    sendJson(response, error instanceof AccessError ? error.status : 503,
      { error: error instanceof AccessError ? error.message : 'Service unavailable. Please try again.' });
  }
}
