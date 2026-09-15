import { requireMethod } from '../../backend/src/http.js';
import { currentUser, databasePool, respondWithResult } from '../../backend/src/modules/eventVisibility/runtime.js';
import { retireVenue } from '../../backend/src/modules/venueBooking/catalogue.js';
import type { VercelRequest, VercelResponse } from '../../backend/src/vercel.js';

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (!requireMethod(request, response, 'POST')) return;
  await respondWithResult(response, async () => {
    const user = await currentUser(request);
    const body = request.body as Record<string, unknown> | undefined;
    if (!body || typeof body.id !== 'string' || !body.id) {
      return { status: 400, body: { error: 'validation_failed', errors: { id: ['A venue id is required.'] } } };
    }
    return retireVenue(databasePool(), user, body.id);
  });
}
