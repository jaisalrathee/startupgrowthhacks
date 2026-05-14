# Startup Growth Hacks

The deepest indexed library of **464 hand-illustrated growth hacks** for startups. Inbox-style browser, deep-dive playbook per hack, leaderboard, dashboard, paywall — all in Next.js 16 with Prisma + SQLite.

→ [startupgrowthhacks.com](https://startupgrowthhacks.com)

## Stack

- **Next.js 16** (App Router, server actions, parallel routes)
- **Prisma 6** + **SQLite** (volume-mounted in production)
- **bcrypt + JWT** session auth
- **Tailwind 4** + custom design tokens

## Run locally

```bash
npm install
npx prisma migrate dev
npm run db:seed      # seeds 464 tactics + deep-dive content + sample comments
npm run dev
```

→ http://localhost:3000

## Deploy (Railway)

Configured for Railway with a Nixpacks build. The `scripts/start.mjs` start command:

1. Runs `prisma migrate deploy` against the mounted DB
2. Detects empty DB and seeds it
3. Launches `next start`

**Required env vars**

| Var | Example |
|---|---|
| `DATABASE_URL` | `file:/data/prod.db` (mount a Railway volume at `/data`) |
| `AUTH_SECRET` | 32+ random chars |

## Routes

| Path | What |
|---|---|
| `/` | Hero + inbox (loads first hack on right) |
| `/hacks/[slug]` | Individual hack (one of 464) — full deep-dive |
| `/leaderboard` | Top 50 by community vote |
| `/dashboard` | Saved hacks + activity (auth required) |
| `/signin` / `/signup` | bcrypt + JWT cookie session |
| `/unlock` | £49 one-time paywall |
| `/sitemap.xml` `/robots.txt` `/llms.txt` | SEO + GEO foundation |
