# Setup Guide for Baho Coffee Web

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Up Environment Variables**
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` with your actual values.

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Open Browser**
   Navigate to `http://localhost:3000`

## Required Environment Variables

### Essential
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` - For washing station maps (optional if using OpenStreetMap)

### Optional
- `NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN` - For Instagram feed integration
- `DATABASE_URL` - If using a database
- `SMTP_*` - For contact form emails

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── products/          # Product pages
│   ├── washing-stations/  # Washing station pages
│   ├── blog/              # Blog pages
│   ├── export/            # Export portal
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── media/             # Media gallery
│   └── admin/             # Admin dashboard
├── components/            # React components
│   ├── home/              # Home page components
│   ├── products/          # Product components
│   ├── washing-stations/  # Washing station components
│   ├── blog/              # Blog components
│   ├── export/            # Export components
│   ├── layout/            # Layout components (Nav, Footer)
│   └── ui/                # Reusable UI components
├── lib/                   # Utilities and helpers
├── types/                 # TypeScript type definitions
└── public/                # Static assets (images, PDFs, etc.)
```

## Adding Content

### Products
1. Edit `components/products/ProductsGrid.tsx` or connect to CMS
2. Add product images to `public/products/`
3. Create PDF profiles in `public/pdfs/`

### Washing Stations
1. Edit `components/washing-stations/WashingStationsList.tsx`
2. Update coordinates in station data
3. Add station photos to `public/stations/`

### Blog Posts
1. Edit `components/blog/BlogPostsList.tsx` or connect to CMS
2. Add blog images to `public/blog/`
3. Create individual blog post pages in `app/blog/[slug]/`

## Customization

### Colors
Edit `tailwind.config.ts` to customize the color scheme:
- `primary` - Main brand color
- `coffee` - Coffee-themed colors

### Fonts
Fonts are loaded from Google Fonts in `app/layout.tsx`:
- Inter (sans-serif)
- Playfair Display (serif)

### Images
Place all images in the `public/` folder:
- Hero images: `public/hero-*.jpg`
- Product images: `public/product-*.jpg`
- Blog images: `public/blog-*.jpg`

## Next Steps

1. **Connect to CMS** (Sanity, Strapi, or Contentful)
2. **Set up Database** (PostgreSQL, MongoDB, or MySQL)
3. **Configure Email Service** for contact forms
4. **Add Real Images** to replace placeholders
5. **Set up Analytics** (Google Analytics, etc.)
6. **Configure SEO** (update metadata, add Google Search Console)

## Troubleshooting

### Maps Not Loading
- Ensure Leaflet CSS is imported (handled automatically)
- Check browser console for errors
- Verify coordinates are valid

### Dark Mode Not Working
- Check `ThemeProvider` is wrapping the app
- Verify localStorage is enabled in browser

### Build Errors
- Run `npm install` to ensure all dependencies are installed
- Check TypeScript errors with `npm run build`
- Verify all environment variables are set

## Support

For issues or questions, check the README.md or create an issue in the repository.

