import { getReadiness, runtimeConfig } from '../backend/src/config.js';
import { sendJson } from '../backend/src/http.js';
import type { VercelRequest, VercelResponse } from '../backend/src/vercel.js';

export default function handler(_request: VercelRequest, response: VercelResponse) {
  sendJson(response, 200, {
    ok: true,
    app: 'sgconnectsphere',
    env: runtimeConfig.appEnv,
    readiness: getReadiness(),
  });
}
