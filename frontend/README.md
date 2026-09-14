# Frontend

React + Vite browser application scaffold for the ConnectSphere operations UI.

## Commands

Run from the repository root:

```text
npm install
npm run dev
npm run typecheck --workspace frontend
npm run build --workspace frontend
```

The current UI is the SG ConnectSphere Release 1 application shell. It opens on
the first working request-to-submit slice, with the full screen map retained as
reference coverage across desktop and mobile companion layouts.

Use the `Request flow` switch to review the organiser create-request path:
validate mandatory fields, save draft, and submit with a mock status timeline.
Use `Screen map` only when checking planned role coverage against the source
documents and Figma plan.

## Routes and auth

- `/` is the public landing page.
- `/login` is the sign-in screen.
- `/app` redirects to the default organiser workspace.
- `/app/:role` opens a role dashboard shell, for example `/app/venue`.

Supabase Auth is used when `VITE_SUPABASE_URL` and
`VITE_SUPABASE_ANON_KEY` are configured. `PUBLIC_SUPABASE_URL` and
`PUBLIC_SUPABASE_ANON_KEY` are also accepted for deployment dashboards that use
the shared project naming convention. If neither pair exists, the frontend runs
in local demo mode with `organiser_a@clienta.com` and password
`connectsphere-demo`.

Keep server-only credentials out of frontend code. Browser-safe values should use
the public names documented in `.env.template`.
