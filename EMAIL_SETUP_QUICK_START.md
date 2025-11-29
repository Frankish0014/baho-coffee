# Email Setup Quick Start Guide

## Problem
You're seeing the error: "Email service is not configured. Please contact the administrator."

This means the `RESEND_API_KEY` environment variable is not set.

## Quick Fix

### Step 1: Get a Resend API Key

1. Go to https://resend.com and sign up (it's free)
2. After signing up, go to **API Keys** in the dashboard
3. Click **Create API Key**
4. Copy the API key (starts with `re_`)

### Step 2: Add to Your Environment Variables

1. Create a file named `.env.local` in the root of your project (if it doesn't exist)
2. Add the following line:

```env
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=onboarding@resend.dev
ADMIN_EMAIL=your-email@example.com
```

**Important Notes:**
- For testing, you can use `onboarding@resend.dev` as the `RESEND_FROM_EMAIL`
- For production, you'll need to verify your own domain in Resend
- Replace `your-email@example.com` with your actual admin email

### Step 3: Restart Your Development Server

After adding the environment variables:

1. Stop your current server (Ctrl+C)
2. Run `npm run dev` again

The form will now work and send emails!

## What Happens Now?

✅ **With Email Configured:**
- Form submissions are saved to the database
- User receives a confirmation email
- Admin receives a notification email
- Success message shows: "Message sent successfully! Check your email inbox (not spam) for confirmation."

⚠️ **Without Email Configured (Current State):**
- Form submissions are still saved to the database
- Success message shows: "Your message has been received and saved! We'll contact you soon."
- No emails are sent

## Production Setup

For production, you should:

1. **Verify your domain in Resend:**
   - Go to Resend Dashboard → Domains
   - Add your domain (e.g., `bahocoffee.com`)
   - Add the DNS records they provide (SPF, DKIM)
   - Wait for verification

2. **Update environment variables:**
   ```env
   RESEND_FROM_EMAIL=noreply@bahocoffee.com
   ```

3. **Set up in Vercel (if deploying):**
   - Go to your Vercel project settings
   - Add environment variables in the "Environment Variables" section
   - Add: `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `ADMIN_EMAIL`

## Testing

After setup, test the form:
1. Go to the Roaster Portal → Connect tab
2. Fill out the form
3. Submit it
4. Check your email inbox (and spam folder initially)

## Troubleshooting

**Emails going to spam?**
- Verify your domain in Resend
- Set up SPF/DKIM records
- Use a verified sender email
- Avoid spam trigger words in subject/content

**Still not working?**
- Check that `.env.local` is in the project root
- Make sure you restarted the dev server after adding variables
- Check the terminal for error messages
- Verify your API key is correct in Resend dashboard

