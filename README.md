# Portfolio Website

A modern portfolio built with React 19, TypeScript, Vite, Tailwind CSS, and Firebase Firestore. Projects are loaded in real time from Firestore, so you can update content in the Firebase Console without redeploying the site.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite 7 |
| Styling | Tailwind CSS v4, custom design tokens |
| Data | Firebase Firestore (real-time `onSnapshot`) |
| UI | Swiper, Lucide React, React Typed |
| Hosting | Netlify |

## Features

- **Live project data** — Firestore listener updates the carousel when you edit documents
- **Scroll-snap sections** — Home, Projects, Contact with fixed section navigation
- **Responsive layout** — Mobile-first cards, carousel, and nav offsets
- **Accessible UI** — Skip link, semantic landmarks, focus styles, reduced-motion support
- **Animated background** — Canvas caustic effect with static fallback for `prefers-reduced-motion`
- **Profile hero** — Subtle 3D tilt and ambient glow on the profile image

## Project Structure

```
src/
├── components/
│   ├── AboutMe.tsx           # Hero / intro
│   ├── MyProjects.tsx        # Projects section
│   ├── ContactMe.tsx         # Contact section
│   ├── ProfileImage.tsx      # Profile photo with tilt effect
│   ├── ProjectsCarousel.tsx  # Swiper carousel
│   ├── SectionNav.tsx        # Section navigation
│   ├── SectionCard.tsx       # Shared card surface
│   └── Card/Card.tsx         # Project card
├── config/
│   └── profileImage.ts       # Profile image paths & fallbacks
├── hooks/
│   ├── useProjects.ts        # Firestore projects hook
│   └── usePrefersReducedMotion.ts
├── lib/
│   └── firebase.ts             # Firebase client init
├── App.tsx
└── main.tsx
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- A Firebase project with Firestore enabled

### Installation

```bash
git clone https://github.com/ItsAssem/Portifolio.git
cd Portifolio
npm install
```

### Environment variables

Copy the example file and add your Firebase web app config:

```bash
cp .env.example .env.local
```

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

Get these from **Firebase Console → Project settings → Your apps → Web app**.

Add the same variables in **Netlify → Site settings → Environment variables** for production.

### Firestore setup

1. Create a Firestore database in your Firebase project
2. Deploy security rules from this repo:

   ```bash
   npx firebase deploy --only firestore:rules
   ```

   (Requires `firebase login` and access to the project in `.firebaserc`.)

3. Create a `projects` collection. Each document should have:

   | Field | Type | Notes |
   |---|---|---|
   | `title` | string | Project name |
   | `description` | string | Full description |
   | `tags` | array | e.g. `["React", "TypeScript"]` |
   | `link` | string | Demo/repo URL, or `""` |
   | `order_index` | number | Lower values appear first |
   | `created_at` | string | Optional ISO timestamp |
   | `updated_at` | string | Optional ISO timestamp |

### Run locally

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Managing Projects (no redeploy)

1. Open **Firebase Console → Firestore → `projects`**
2. Add, edit, or delete documents
3. Changes appear on the live site within seconds

Writes from the public website are blocked by `firestore.rules` (`allow write: if false`). Only the Firebase Console (or future authenticated admin) can modify data.

## Profile Image

Place your photo in `public/` (e.g. `public/asem-pfp.png`). The app tries several paths and falls back to `public/asem-pfp.svg` if the primary file is missing.

Optional override:

```env
VITE_PROFILE_IMAGE_URL=/your-image.png
```

## Design System

| Token | Value |
|---|---|
| Brand primary | `#00df9a` |
| Brand secondary | `#14df9e` |
| Surface | `green-900/40` with backdrop blur |
| Fonts | Inter (body), IBM Plex Mono (accent) |

## Security Notes

### Safe to commit publicly

| File | Contents |
|---|---|
| `.firebaserc` | Firebase **project ID alias** only — not a credential |
| `firebase.json` | Points to `firestore.rules` |
| `firestore.rules` | Public security rules (intended to be version-controlled) |

Firebase client API keys in `VITE_FIREBASE_*` are designed for browser use. Restrict them in **Google Cloud Console → APIs & Services → Credentials** to your domains (e.g. `localhost`, `*.netlify.app`, your custom domain).

### Never commit

- `.env.local` / any file with real API keys
- `serviceAccountKey.json` (Firebase Admin private keys)

## Deployment (Netlify)

The repo includes `netlify.toml` with SPA redirects. After connecting the repo:

1. Set all `VITE_FIREBASE_*` environment variables
2. Deploy — build command: `npm run build`, publish directory: `dist`

Code deploys are only needed for frontend changes. Project content updates happen entirely in Firestore.

## License

Private portfolio project — all rights reserved.
