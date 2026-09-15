import { requireMethod } from '../../backend/src/http.js';
import { currentUser, query, respond } from '../../backend/src/modules/eventVisibility/runtime.js';
import { getVenue, searchVenues } from '../../backend/src/modules/venueBooking/catalogue.js';
import type { VercelRequest, VercelResponse } from '../../backend/src/vercel.js';

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (!requireMethod(request, response, 'GET')) return;
  await respond(response, async () => {
    const user = await currentUser(request);
    const params = new URL(request.url || '/', 'http://localhost').searchParams;
    const id = params.get('id');
    if (id) return { venue: await getVenue(query, user, id.slice(0, 240)) };
    return { venues: await searchVenues(query, user, params.get('q') || '') };
  });
}
