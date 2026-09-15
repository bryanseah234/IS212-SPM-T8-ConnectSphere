import { requireMethod } from '../../backend/src/http.js';
import { currentUser, databasePool, respondWithResult } from '../../backend/src/modules/eventVisibility/runtime.js';
import { createVenue } from '../../backend/src/modules/venueBooking/catalogue.js';
import type { VercelRequest, VercelResponse } from '../../backend/src/vercel.js';

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (!requireMethod(request, response, 'POST')) return;
  await respondWithResult(response, async () => {
    const user = await currentUser(request);
    return createVenue(databasePool(), user, request.body);
  });
}
