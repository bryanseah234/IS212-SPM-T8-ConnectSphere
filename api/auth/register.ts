import { Pool } from 'pg';
import { requireMethod, sendJson } from '../../backend/src/http';
import type { VercelRequest, VercelResponse } from '../../backend/src/vercel';
import { registerAccount, type AccountRepository } from '../../backend/src/modules/accessControl/registration';
import { createAccountRepository } from '../../backend/src/modules/accessControl/postgresRepository';

let pool: Pool | undefined;
const repository: AccountRepository = {
  async createAttendee(input) {
    if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not configured');
    pool ??= new Pool({ connectionString: process.env.DATABASE_URL, max: 4 });
    return createAccountRepository(pool).createAttendee(input);
  },
};

export function createRegistrationHandler(accounts: AccountRepository) {
  return async (request: VercelRequest, response: VercelResponse) => {
    response.setHeader('cache-control', 'no-store');
    if (!requireMethod(request, response, 'POST')) return;
    try {
      const result = await registerAccount(request.body, accounts);
      sendJson(response, result.status, result.body);
    } catch {
      sendJson(response, 500, { error: 'registration_failed', errors: {
        form: ['Unable to create your account. Please try again later.'],
      } });
    }
  };
}

export default createRegistrationHandler(repository);
