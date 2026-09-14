import type { RegistrationRepository } from './repository';

export type RegistrationService = {
  repository: RegistrationRepository;
};

export function createRegistrationService(repository: RegistrationRepository): RegistrationService {
  return { repository };
}
