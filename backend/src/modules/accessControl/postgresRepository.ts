import type { Pool } from 'pg';
import type { AccountRepository, PublicAccount } from './registration';

export function createAccountRepository(database: Pick<Pool, 'query'>): AccountRepository {
  return {
    async createAttendee(input) {
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
