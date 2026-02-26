# Rohail Zuberi Portfolio

Personal portfolio website built with Astro and Tailwind, based on the Aria template.

## Tech Stack

- Astro
- Tailwind CSS
- TypeScript
- Biome

## Local Development

```bash
npm install
npm run dev
```

Site runs at `http://localhost:4321` by default.

Create `.env` from `.env.example` before testing the contact form:

```bash
cp .env.example .env
```

Then set:

- `RESEND_API_KEY` - API key from Resend
- `CONTACT_TO_EMAIL` - your inbox address
- `CONTACT_FROM_EMAIL` - sender identity (must be valid in your Resend account)

## Build and Preview

```bash
npm run build
npm run preview
```

## Project Structure

```text
src/
  components/      Reusable UI blocks (header, footer, cards, etc.)
  collections/     Site data (menu, projects, experiences)
  content/         Blog content (optional)
  layouts/         Page layouts
  pages/           Route files
public/
  assets/images/   Site images and logos
  Rohail_Zuberi_Resume.pdf
```

## What to Edit Most

- `src/pages/index.astro` - Homepage content and hero section
- `src/pages/about.astro` - About section and contact copy
- `src/collections/projects.json` - Project list (homepage top 3, full list on `/projects`)
- `src/collections/experiences.json` - Experience timeline
- `src/collections/menu.json` - Header nav items (including resume download)
- `src/components/footer.astro` - Footer identity and social links
- `src/components/logo.astro` - Header logo (light/dark versions)
- `src/components/home/contact-form.astro` - Contact form UI and submit behavior
- `src/pages/api/contact.ts` - Backend contact email endpoint

## Resume Download Setup

Store your resume in:

- `public/Rohail_Zuberi_Resume.pdf`

The `Resume` nav item is configured in `src/collections/menu.json` and downloads this file directly.

## Deploying to Vercel

### Option 1: Vercel Dashboard (recommended)

1. Push this repo to GitHub.
2. Import the repository in Vercel.
3. Framework preset: `Astro`.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Deploy.

### Option 2: Vercel CLI

```bash
npm i -g vercel
vercel
```

For production:

```bash
vercel --prod
```

## Credits

This portfolio is based on the **Astro Aria** template:

- Astro Aria: https://github.com/ccbikai/astro-aria
- Original Aria design inspiration: https://github.com/static-templates/aria
- Astro: https://astro.build

## License and Attribution

This repository includes an Apache 2.0 license (`LICENSE`) inherited from the template foundation.
Keep the license file in the project when redistributing the code.
