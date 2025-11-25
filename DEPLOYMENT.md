# Deployment Guide for Baho Coffee Web

## Prerequisites

1. Node.js 18+ installed
2. Git repository set up
3. Vercel account (recommended) or other hosting provider

## Local Development Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   - Copy `.env.example` to `.env.local`
   - Fill in your API keys and configuration

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   - Navigate to `http://localhost:3000`

## Deployment to Vercel (Recommended)

1. **Push your code to GitHub/GitLab/Bitbucket**

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Vercel will auto-detect Next.js

3. **Configure Environment Variables:**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add all variables from `.env.example`

4. **Deploy:**
   - Vercel will automatically deploy on every push to main branch
   - Or click "Deploy" button

## Deployment to Other Platforms

### Netlify

1. Build command: `npm run build`
2. Publish directory: `.next`
3. Add environment variables in Netlify dashboard

### AWS/DigitalOcean

1. Build the project: `npm run build`
2. Start the server: `npm start`
3. Use PM2 or similar process manager
4. Set up reverse proxy (Nginx)

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test contact forms
- [ ] Check mobile responsiveness
- [ ] Verify SEO metadata
- [ ] Test dark mode toggle
- [ ] Verify WhatsApp button works
- [ ] Check Google Maps integration
- [ ] Test Instagram feed (if implemented)
- [ ] Verify sitemap.xml is accessible
- [ ] Check robots.txt

## Performance Optimization

1. **Image Optimization:**
   - Use Next.js Image component
   - Compress images before uploading
   - Use WebP format when possible

2. **Code Splitting:**
   - Already handled by Next.js automatically

3. **CDN:**
   - Vercel provides global CDN automatically
   - For other hosts, use Cloudflare or similar

## Monitoring

- Set up error tracking (Sentry recommended)
- Monitor Core Web Vitals
- Set up Google Analytics
- Monitor form submissions

## Updates

To update the site:
1. Make changes locally
2. Test thoroughly
3. Push to repository
4. Vercel will auto-deploy (or trigger manual deployment)

