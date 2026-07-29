# Academic Tracker

A React + Vite + Tailwind CSS + React Router project scaffold. No features
have been built yet — this is the base structure ready for development.

## Stack

- [React](https://react.dev/) 18
- [Vite](https://vite.dev/) 5
- [Tailwind CSS](https://tailwindcss.com/) 3
- [React Router](https://reactrouter.com/) 6

## Getting started

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:5173`.

## Available scripts

- `npm run dev` — start the local dev server
- `npm run build` — build for production (outputs to `dist/`)
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint

## Project structure

```
src/
  components/     shared UI components (Layout, etc.)
  pages/          route-level page components
  App.jsx         route definitions
  main.jsx        app entry point, router provider
  index.css       Tailwind directives + global styles
```

## Deploying to Vercel

This project is preconfigured for Vercel:

1. Push the repo to GitHub (or another Git provider).
2. Import the project in the [Vercel dashboard](https://vercel.com/new).
3. Vercel auto-detects the Vite framework preset:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Deploy.

`vercel.json` includes a rewrite rule so client-side routes (via React
Router) resolve correctly on page refresh/direct link.
