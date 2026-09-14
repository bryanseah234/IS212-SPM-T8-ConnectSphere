import pg from 'pg';
import { requireEnv, runtimeConfig } from '../config.js';

const { Pool } = pg;

let pool: pg.Pool | null = null;

export function getDatabasePool() {
  pool ??= new Pool({
    connectionString: requireEnv(runtimeConfig.databaseUrl, 'DATABASE_URL'),
  });

  return pool;
}
