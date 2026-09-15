import type { VenueBookingRepository } from './repository.js';

export type VenueBookingService = {
  repository: VenueBookingRepository;
};

export function createVenueBookingService(repository: VenueBookingRepository): VenueBookingService {
  return { repository };
}
