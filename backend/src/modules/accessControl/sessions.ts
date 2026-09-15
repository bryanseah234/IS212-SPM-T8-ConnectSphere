import { createHash, randomBytes } from 'node:crypto';
import type { Pool } from 'pg';
import type { VercelRequest } from '../../vercel.js';
import { AccessError } from '../eventVisibility/service.js';
import { verifyPassword } from './passwords.js';

export const tokenDigest = (token: string) => createHash('sha256').update(token).digest('hex');
export function sessionToken(request: VercelRequest) {
  const cookie = request.headers.cookie;
  return typeof cookie === 'string' ? cookie.split(';').map(v => v.trim()).find(v => v.startsWith('cs_access='))?.slice(10) : undefined;
}

export async function login(pool: Pool, email: string, password: string) {
  const db = await pool.connect();
  try {
    await db.query('BEGIN');
    // Serialize failures and successful logins for the same account.
    const result = await db.query(`SELECT * FROM users WHERE lower(email) = lower($1) FOR UPDATE`, [email.trim()]);
    const user = result.rows[0];
    const matches = await verifyPassword(password, user?.password_hash || '');
    if (!user || !matches || !user.is_active || user.failed_login_count >= 5 || (user.locked_until && user.locked_until > new Date())) {
      if (user && !matches) await db.query('UPDATE users SET failed_login_count = LEAST(failed_login_count + 1, 5) WHERE id = $1', [user.id]);
      await db.query('COMMIT');
      throw new AccessError(401, 'Unable to sign in. Check your credentials or contact your administrator.');
    }
    await db.query('UPDATE users SET failed_login_count = 0 WHERE id = $1', [user.id]);
    const token = randomBytes(32).toString('hex');
    await db.query(`INSERT INTO auth_sessions (token_hash, user_id, expires_at) VALUES ($1, $2, now() + interval '1 hour')`, [tokenDigest(token), user.id]);
    await db.query('COMMIT');
    return token;
  } catch (error) {
    await db.query('ROLLBACK');
    throw error;
  } finally { db.release(); }
}
