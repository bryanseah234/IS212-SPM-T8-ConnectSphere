import type { ChangeManagementRepository } from './repository';

export type ChangeManagementService = {
  repository: ChangeManagementRepository;
};

export function createChangeManagementService(
  repository: ChangeManagementRepository,
): ChangeManagementService {
  return { repository };
}
