# Analytics & Tracking Setup Guide

## Overview

This guide explains how to set up analytics and tracking for the Baho Coffee website. The implementation includes:

- ✅ Google Analytics integration
- ✅ Cookie consent banner (GDPR compliant)
- ✅ Automatic page view tracking
- ✅ Event tracking capabilities
- ✅ Privacy-first approach (only tracks with consent)

## Components Created

### 1. `GoogleAnalytics.tsx`
- Handles Google Analytics script loading
- Tracks page views automatically
- Provides helper functions for event tracking

### 2. `CookieConsent.tsx`
- GDPR-compliant cookie consent banner
- Allows users to customize cookie preferences
- Stores preferences in localStorage
- Only loads analytics if user consents

### 3. `AnalyticsProvider.tsx`
- Wraps analytics functionality
- Checks cookie consent before tracking
- Automatically tracks page views on route changes

## Setup Instructions

### Step 1: Get Google Analytics ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new property or use an existing one
3. Get your **Measurement ID** (format: `G-XXXXXXXXXX`)

### Step 2: Add Environment Variable

Add to your `.env.local` file:

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Replace `G-XXXXXXXXXX` with your actual Google Analytics Measurement ID.

### Step 3: Deploy

The components are already integrated in `app/layout.tsx`. After adding the environment variable:

1. Restart your dev server: `npm run dev`
2. The cookie consent banner will appear
3. Analytics will only load if user accepts cookies

## How It Works

### Cookie Consent Flow

1. **First Visit**: User sees cookie consent banner
2. **User Choice**: 
   - Accept All → All cookies enabled
   - Reject All → Only necessary cookies
   - Customize → User chooses preferences
3. **Storage**: Preferences saved in `localStorage`
4. **Analytics**: Only loads if user consented to analytics cookies

### What Gets Tracked

**With Analytics Cookies Enabled:**
- Page views (automatic)
- Page paths
- User interactions (via event tracking)
- Device information (via Google Analytics)
- Browser type (via Google Analytics)
- IP address (anonymized by Google Analytics)

**Without Analytics Cookies:**
- No tracking occurs
- Website functions normally
- Only necessary cookies (session, preferences)

## Using Event Tracking

You can track custom events in your components:

```typescript
import { trackEvent } from "@/components/analytics/GoogleAnalytics";

// Track a button click
trackEvent("click", "button", "Contact Form Submit");

// Track a form submission
trackEvent("submit", "form", "Quotation Request", 1);

// Track a download
trackEvent("download", "file", "Coffee Profile PDF");
```

## Privacy Compliance

✅ **GDPR Compliant**
- Cookie consent required before tracking
- Users can opt-out at any time
- Clear information about what's tracked
- Link to Privacy Policy

✅ **Data Collection**
- IP addresses are anonymized by Google Analytics
- No personal information collected without consent
- All tracking respects user preferences

## Testing

### Test Cookie Consent

1. Clear browser localStorage
2. Visit the website
3. Cookie banner should appear
4. Test all three options:
   - Accept All
   - Reject All
   - Customize

### Test Analytics

1. Accept analytics cookies
2. Open browser DevTools → Network tab
3. Navigate between pages
4. Look for requests to `google-analytics.com` or `googletagmanager.com`
5. Check Google Analytics dashboard (may take 24-48 hours for data)

### Verify No Tracking Without Consent

1. Reject analytics cookies
2. Check Network tab
3. No requests to Google Analytics should be made

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_GA_ID` | Google Analytics Measurement ID | Optional (analytics won't work without it) |

## Troubleshooting

### Analytics Not Working

1. **Check Environment Variable**
   - Verify `NEXT_PUBLIC_GA_ID` is set in `.env.local`
   - Restart dev server after adding

2. **Check Cookie Consent**
   - Analytics only loads if user accepted
   - Check localStorage: `cookie-consent` should have `analytics: true`

3. **Check Browser Console**
   - Look for errors
   - Verify Google Analytics script loaded

### Cookie Banner Not Showing

1. **Clear localStorage**
   ```javascript
   localStorage.removeItem('cookie-consent');
   ```

2. **Check Component**
   - Verify `CookieConsent` is in `app/layout.tsx`
   - Check browser console for errors

### Events Not Tracking

1. **Verify Consent**
   - User must have accepted analytics cookies
   - Check `localStorage.getItem('cookie-consent')`

2. **Check Function Import**
   - Make sure you're importing `trackEvent` correctly
   - Function only works client-side

## Customization

### Change Cookie Banner Style

Edit: `frontend/components/analytics/CookieConsent.tsx`

### Add More Cookie Categories

1. Update `preferences` state in `CookieConsent.tsx`
2. Add new toggle in settings UI
3. Update consent logic

### Use Different Analytics

Replace `GoogleAnalytics.tsx` with your preferred analytics provider:
- Plausible Analytics
- Fathom Analytics
- Custom solution

## Production Checklist

- [ ] Add `NEXT_PUBLIC_GA_ID` to production environment variables
- [ ] Test cookie consent on production
- [ ] Verify analytics tracking in Google Analytics dashboard
- [ ] Update Privacy Policy if needed
- [ ] Test on multiple browsers
- [ ] Verify GDPR compliance

## Support

For issues or questions:
- Check browser console for errors
- Verify environment variables
- Test in incognito mode (fresh state)
- Check Google Analytics documentation

---

**Note**: Analytics will only work if:
1. `NEXT_PUBLIC_GA_ID` is set
2. User accepts analytics cookies
3. Website is deployed (or running locally)

