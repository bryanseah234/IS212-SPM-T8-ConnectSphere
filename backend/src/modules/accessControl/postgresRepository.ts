import type { Pool } from 'pg';
import type { AccountInsert, AccountRepository, PublicAccount } from './registration.js';

export function createAccountRepository(database: Pick<Pool, 'query'>): AccountRepository {
  return {
    async createAttendee(input: AccountInsert) {
      const result = await database.query<PublicAccount>(`
        INSERT INTO users (full_name, email, password_hash, contact_number, role)
        VALUES ($1, $2, $3, $4, 'attendee')
        ON CONFLICT (lower(btrim(email))) DO NOTHING
        RETURNING id, email, role
      `, [input.full_name, input.email.trim().toLowerCase(), input.password_hash, input.contact_number]);
      return result.rows[0] ?? null;
    },
  };
}
