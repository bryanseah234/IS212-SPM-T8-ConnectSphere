import { refusePlanning } from '../../backend/src/modules/attendeeVisibility/service';
import { requireMethod } from '../../backend/src/http';
import { currentUser, query, respond } from '../../backend/src/modules/eventVisibility/runtime';
import { getEvent, listEvents, listNotifications, requireOrganiser } from '../../backend/src/modules/eventVisibility/service';
import type { VercelRequest, VercelResponse } from '../../backend/src/vercel';

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (!requireMethod(request, response, 'GET')) return;
  await respond(response, async () => {
    const user = await currentUser(request);
    const params = new URL(request.url || '/', 'http://localhost').searchParams;
    const id = params.get('id');
    if (user.role === 'attendee') await refusePlanning(query, user, id || '');
    requireOrganiser(user);
    if (id) return { event: await getEvent(query, user, id.slice(0, 240)) };
    return { events: await listEvents(query, user, params.get('q') || ''),
      notifications: await listNotifications(query, user), organisationId: user.clientOrgId };
  });
}
