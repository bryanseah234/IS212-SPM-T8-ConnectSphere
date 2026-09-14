import type { VenueBookingRepository } from './repository';

export type VenueBookingService = {
  repository: VenueBookingRepository;
};

export function createVenueBookingService(repository: VenueBookingRepository): VenueBookingService {
  return { repository };
}
