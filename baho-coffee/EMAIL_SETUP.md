# Email Setup & Troubleshooting Guide

## Current Setup

Your Resend API key is configured in `.env.local`. The contact form should automatically send confirmation emails.

## If Emails Are Not Being Received

### 1. Restart Your Development Server

After setting up environment variables, you **must restart** your Next.js development server:

```bash
# Stop the server (Ctrl+C) and restart:
npm run dev
```

### 2. Check Your Resend API Key

1. Go to [Resend Dashboard](https://resend.com/api-keys)
2. Verify your API key is active
3. Check that it starts with `re_`

### 3. Check Server Logs

When you submit the contact form, check your terminal/console for:
- `Attempting to send email:` - Shows the from/to addresses
- `Email sent successfully:` - Confirms the email was sent
- Any error messages

### 4. Verify the "From" Email

**For Testing:**
- The default `onboarding@resend.dev` should work immediately
- No domain verification needed

**For Production:**
- You need to verify your domain in Resend
- Or use a verified email address
- Add to `.env.local`: `RESEND_FROM_EMAIL=your-verified-email@yourdomain.com`

### 5. Check Email Spam Folder

Sometimes confirmation emails end up in spam. Check:
- Spam/Junk folder
- Promotions tab (Gmail)
- All Mail folder

### 6. Test with a Different Email

Try sending to a different email address to rule out recipient-side issues.

## Common Error Messages

### "Email service is not configured"
- **Fix:** Make sure `RESEND_API_KEY` is set in `.env.local`
- Restart the dev server after adding it

### "The sender email needs to be verified"
- **Fix:** Use `onboarding@resend.dev` for testing, or verify your domain in Resend

### "Failed to send email via Resend"
- **Fix:** Check your Resend API key is valid and has credits
- Check Resend dashboard for account status

## Testing the Email Function

1. Go to `http://localhost:3000/contact`
2. Fill out the form
3. Submit
4. Check:
   - Success message appears
   - Your email inbox (and spam folder)
   - Server console for logs
   - Admin panel at `/admin` to see if submission was saved

## Viewing All Submissions

All contact form submissions are saved to `data/contact-submissions.json` and can be viewed in the admin panel:

1. Go to `http://localhost:3000/admin`
2. Click "Contact Messages"
3. View all submissions with search functionality

## Need Help?

Check the server console logs when submitting the form - they will show detailed error information.

