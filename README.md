# Baho Coffee Web

A modern, full-featured website for Baho Coffee - Rwanda's premier specialty coffee exporter.

## Features

- 🏠 Modern Home Page with hero section, story, products, and testimonials
- ☕ Interactive Product Pages with 360° views and sample requests
- 🗺️ Washing Stations Directory with interactive maps
- 📝 Blog & News Section with CMS integration
- 💼 Export & Sales Portal for international buyers
- 👥 About Us with company history and team
- 📸 Media & Downloads Gallery
- 📞 Contact Page with WhatsApp integration
- 🛒 E-commerce Ready (Future)
- 🔐 Admin Dashboard for content management

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Maps**: Leaflet.js / React Leaflet
- **Forms**: React Hook Form + Zod
- **SEO**: Next SEO

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/              # Next.js App Router pages
├── components/       # React components
├── lib/             # Utilities and helpers
├── types/           # TypeScript type definitions
├── public/          # Static assets
└── styles/          # Global styles
```

## Environment Variables

Create a `.env.local` file with:

```env
# Required for email functionality
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=onboarding@resend.dev

# Optional - for Postgres (get from Vercel Dashboard → Storage → Postgres)
POSTGRES_URL=postgres://...
POSTGRES_PRISMA_URL=postgres://...
POSTGRES_URL_NON_POOLING=postgres://...

# Optional - for maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here

# Optional - for Instagram feed
NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN=your_token_here
```

**Note**: 
- If `POSTGRES_URL` is set → Uses Postgres database (same as production)
- If `POSTGRES_URL` is NOT set → Uses file system (`data/*.json` files)

See `SETUP_COMPLETE.md` for detailed setup instructions.

## License

© 2024 Baho Coffee. All rights reserved.

