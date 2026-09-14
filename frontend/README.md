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

The current UI is a high-fi Batch 5 prototype shell that visualises the breadth
of planned ConnectSphere screens across desktop and mobile companion layouts.
It uses static mock data from the product/design docs so the team can review
screen coverage before implementing real workflow logic.

Keep server-only credentials out of frontend code. Browser-safe values should use
the public names documented in `.env.template`.
