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

The current UI is a scaffold shell that visualises release 1 roles, queue states,
and provider boundaries. It is not a complete implementation of the product
backlog yet.

Keep server-only credentials out of frontend code. Browser-safe values should use
the public names documented in `.env.template`.
