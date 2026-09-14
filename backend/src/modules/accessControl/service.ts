import type { AuthenticatedUser, AuthorizationDecision, LoginFailureState } from './types.js';
import type { UserRole } from '../shared/roles.js';

export const LOCKOUT_FAILURE_THRESHOLD = 5;

export function isLocked(user: Pick<AuthenticatedUser, 'failedLoginCount' | 'lockedUntil'>, now = new Date()) {
  return (
    user.failedLoginCount >= LOCKOUT_FAILURE_THRESHOLD ||
    Boolean(user.lockedUntil && user.lockedUntil.getTime() > now.getTime())
  );
}

export function recordFailedLogin(
  user: Pick<AuthenticatedUser, 'failedLoginCount'>,
): LoginFailureState {
  const failedLoginCount = user.failedLoginCount + 1;
  const locked = failedLoginCount >= LOCKOUT_FAILURE_THRESHOLD;

  return {
    failedLoginCount,
    locked,
    requiresPasswordReset: locked,
  };
}

export function canActAsRole(
  user: AuthenticatedUser | undefined,
  allowedRoles: readonly UserRole[],
  now = new Date(),
): AuthorizationDecision {
  if (!user) {
    return { allowed: false, reason: 'unauthenticated' };
  }

  if (!user.isActive) {
    return { allowed: false, reason: 'inactive_user' };
  }

  if (isLocked(user, now)) {
    return { allowed: false, reason: 'locked_user' };
  }

  if (!allowedRoles.includes(user.role)) {
    return { allowed: false, reason: 'missing_role' };
  }

  return { allowed: true };
}

export function canAccessClientOrganisation(
  user: AuthenticatedUser | undefined,
  targetClientOrgId: string | undefined,
  now = new Date(),
): AuthorizationDecision {
  if (!user) {
    return { allowed: false, reason: 'unauthenticated' };
  }

  const activeDecision = canActAsRole(
    user,
    ['event_organiser', 'event_coordinator', 'venue_staff', 'technical_support_staff', 'attendee'],
    now,
  );
  if (!activeDecision.allowed) {
    return activeDecision;
  }

  if (!targetClientOrgId) {
    return { allowed: true };
  }

  if (user.role !== 'event_organiser') {
    return { allowed: true };
  }

  return user.clientOrgId === targetClientOrgId
    ? { allowed: true }
    : { allowed: false, reason: 'wrong_client_organisation' };
}

export function scopeClientOrganisationFilter(user: AuthenticatedUser) {
  return user.role === 'event_organiser' ? { clientOrgId: user.clientOrgId } : {};
}
