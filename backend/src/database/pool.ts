import { Pool, type PoolClient } from 'pg';

let pool: Pool | undefined;

export function notificationDatabase(): Pool {
  const connectionString = process.env.DATABASE_URL?.trim();
  if (!connectionString) throw new Error('database_not_configured');
  pool ??= new Pool({
    connectionString, max: 2, connectionTimeoutMillis: 3000,
    idleTimeoutMillis: 10000, statement_timeout: 5000,
    query_timeout: 6000, application_name: 'connectsphere-notifications',
  });
  return pool;
}

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
