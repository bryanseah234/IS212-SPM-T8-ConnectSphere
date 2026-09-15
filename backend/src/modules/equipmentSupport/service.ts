import type { EquipmentSupportRepository } from './repository.js';

export type EquipmentSupportService = {
  repository: EquipmentSupportRepository;
};

export function createEquipmentSupportService(
  repository: EquipmentSupportRepository,
): EquipmentSupportService {
  return { repository };
}
