import type { UserRole } from '../shared/roles';

export type AuthenticatedUser = {
  id: string;
  email: string;
  role: UserRole;
  clientOrgId?: string;
  isActive: boolean;
  failedLoginCount: number;
  lockedUntil?: Date;
};

export type AuthorizationDecision =
  | { allowed: true }
  | {
      allowed: false;
      reason:
        | 'inactive_user'
        | 'locked_user'
        | 'missing_role'
        | 'wrong_client_organisation'
        | 'unauthenticated';
    };

export type LoginFailureState = {
  failedLoginCount: number;
  locked: boolean;
  requiresPasswordReset: boolean;
};
