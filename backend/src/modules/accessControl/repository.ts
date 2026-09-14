import type { AuthenticatedUser } from './types.js';

export type AccessControlRepository = {
  findUserByEmail(email: string): Promise<AuthenticatedUser | null>;
  findUserById(userId: string): Promise<AuthenticatedUser | null>;
  recordFailedLogin(userId: string, failedLoginCount: number, locked: boolean): Promise<void>;
  clearFailedLogins(userId: string): Promise<void>;
};
