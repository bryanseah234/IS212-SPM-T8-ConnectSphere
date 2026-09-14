import { runtimeConfig, requireEnv } from '../../backend/src/config';
import { requireMethod } from '../../backend/src/http';
import { currentUser, query, respond } from '../../backend/src/modules/eventVisibility/runtime';
import { AccessError } from '../../backend/src/modules/eventVisibility/service';
import { publishEvent } from '../../backend/src/modules/attendeeVisibility/service';
import type { VercelRequest, VercelResponse } from '../../backend/src/vercel';

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (!requireMethod(request, response, 'POST')) return;
  await respond(response, async () => {
    if (request.headers.origin !== requireEnv(runtimeConfig.appUrl, 'APP_URL')) throw new AccessError(403, 'Access denied.');
    const user = await currentUser(request);
    const body = request.body as { eventId?: unknown } | undefined;
    if (typeof body?.eventId !== 'string') throw new AccessError(400, 'An event identifier is required.');
    await publishEvent(query, user, body.eventId);
    return { published: true };
  });
}
