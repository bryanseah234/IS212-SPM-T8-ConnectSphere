import type { Pool, PoolClient } from 'pg';
import { getDatabasePool } from './client.js';

export const notificationDatabase = getDatabasePool;

export async function inTransaction<T>(
  database: Pool,
  work: (client: PoolClient) => Promise<T>,
): Promise<T> {
  const client = await database.connect();
  try {
    await client.query('BEGIN');
    const value = await work(client);
    await client.query('COMMIT');
    return value;
  } catch (error) {
    await client.query('ROLLBACK').catch(() => undefined);
    throw error;
  } finally {
    client.release();
  }
}
