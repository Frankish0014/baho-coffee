# Email Deliverability Guide - Avoiding Spam Folder

## Current Issue
Your emails are going to spam because they're being sent from `onboarding@resend.dev`, which is Resend's test email address. Email providers flag test domains as suspicious.

## Solution: Verify Your Domain in Resend

### Step 1: Verify Your Domain
1. Go to [Resend Dashboard](https://resend.com/domains)
2. Click "Add Domain"
3. Enter your domain (e.g., `bahocoffee.com`)
4. Follow the DNS setup instructions to add:
   - SPF record
   - DKIM record
   - DMARC record (optional but recommended)

### Step 2: Update Environment Variable
Once your domain is verified, update your `.env.local`:

```env
RESEND_FROM_EMAIL=noreply@bahocoffee.com
# or
RESEND_FROM_EMAIL=export@bahocoffee.com
```

### Step 3: Restart Server
After updating the environment variable, restart your development server.

## Quick Fix (Temporary)
If you can't verify a domain right now, the email improvements I've made will help:
- ✅ Added plain text version
- ✅ Added reply-to address
- ✅ Improved link formatting
- ✅ Better email structure

But **verifying your domain is the best solution** to avoid spam.

## Why Emails Go to Spam

1. **Unverified Sender**: `onboarding@resend.dev` is a test domain
2. **No SPF/DKIM**: Missing email authentication records
3. **Low Sender Reputation**: Test domains have poor reputation
4. **Content Triggers**: Certain words/phrases trigger spam filters

## Best Practices

✅ **DO:**
- Verify your domain in Resend
- Use a professional email address (noreply@yourdomain.com)
- Include plain text version
- Keep email content professional
- Use proper email headers

❌ **DON'T:**
- Use test email addresses in production
- Send from unverified domains
- Use spam trigger words (FREE, URGENT, etc.)
- Send HTML-only emails
- Use suspicious links

## Testing Email Deliverability

After verifying your domain:
1. Send a test email
2. Check if it lands in inbox (not spam)
3. Check email headers for SPF/DKIM pass
4. Monitor bounce rates in Resend dashboard

## Need Help?

- Resend Domain Setup: https://resend.com/docs/dashboard/domains/introduction
- Email Authentication: https://resend.com/docs/dashboard/domains/verify-a-domain

