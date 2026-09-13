import { getReadiness, runtimeConfig } from '../backend/src/config';
import { sendJson } from '../backend/src/http';
import type { VercelRequest, VercelResponse } from '../backend/src/vercel';

export default function handler(_request: VercelRequest, response: VercelResponse) {
  sendJson(response, 200, {
    ok: true,
    app: 'sgconnectsphere',
    env: runtimeConfig.appEnv,
    readiness: getReadiness(),
  });
}
