import { requireMethod } from '../../backend/src/http.js';
import { currentUser, query, respond } from '../../backend/src/modules/eventVisibility/runtime.js';
import { refusePlanning } from '../../backend/src/modules/attendeeVisibility/service.js';
import type { VercelRequest, VercelResponse } from '../../backend/src/vercel.js';

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (!requireMethod(request, response, 'GET')) return;
  await respond(response, async () => {
    const user = await currentUser(request);
    const id = new URL(request.url || '/', 'http://localhost').searchParams.get('id') || '';
    await refusePlanning(query, user, id);
    return {};
  });
}
