import type { ChangeManagementRepository } from './repository.js';

export type ChangeManagementService = {
  repository: ChangeManagementRepository;
};

export function createChangeManagementService(
  repository: ChangeManagementRepository,
): ChangeManagementService {
  return { repository };
}
