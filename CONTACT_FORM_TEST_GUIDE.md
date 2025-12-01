# Contact Form Email Test Guide

## Quick Test Steps

### Step 1: Check if Email is Configured

The contact form needs a Resend API key to send emails. Let's check if it's set up:

1. **Check if `.env.local` exists** in your project root
2. **Check if it contains `RESEND_API_KEY`**

### Step 2: Set Up Resend (If Not Already Done)

If you don't have Resend set up yet:

1. **Sign up for Resend** (Free):
   - Go to: https://resend.com
   - Sign up with your email
   - It's free for up to 3,000 emails/month

2. **Get Your API Key**:
   - After signing up, go to **API Keys** in the dashboard
   - Click **"Create API Key"**
   - Give it a name (e.g., "Baho Coffee Website")
   - Copy the key (starts with `re_`)

3. **Create `.env.local` file** in your project root:
   ```env
   RESEND_API_KEY=re_your_actual_api_key_here
   RESEND_FROM_EMAIL=onboarding@resend.dev
   ADMIN_EMAIL=your-email@example.com
   ```

4. **Restart your dev server**:
   ```bash
   # Stop the server (Ctrl+C)
   # Then restart:
   npm run dev
   ```

### Step 3: Test the Contact Form

1. **Open your website**:
   - Go to: http://localhost:3000/contact
   - Or navigate to Contact page from the menu

2. **Fill out the form**:
   - Name: Your name
   - Email: **Use your real email address** (where you want to receive the confirmation)
   - Subject: Test message
   - Message: This is a test message to verify email functionality

3. **Submit the form**

4. **Check the response**:
   - You should see: "Message sent successfully! Check your email inbox (not spam) for confirmation."
   - If you see a different message, check the terminal for errors

5. **Check your email**:
   - Check your inbox (the email you entered in the form)
   - **Check spam/junk folder** - emails from `onboarding@resend.dev` might go there initially
   - You should receive a confirmation email from "Baho Coffee"

### What the Email Will Look Like

You'll receive an email with:
- Subject: "Thank you for contacting Baho Coffee"
- A nice HTML email with:
  - Baho Coffee branding
  - Thank you message
  - Your message content
  - Contact information

### Troubleshooting

**❌ "Email service is not configured"**
- Solution: Add `RESEND_API_KEY` to `.env.local` and restart server

**❌ "Your message has been received and saved! We'll contact you soon."**
- This means email is not configured
- Solution: Set up Resend API key (see Step 2)

**❌ Email not received**
- Check spam/junk folder
- Verify the email address you entered is correct
- Check terminal for error messages
- Verify your Resend API key is correct

**❌ Server errors in terminal**
- Check that `.env.local` is in the project root (not in a subfolder)
- Make sure you restarted the server after adding the API key
- Verify the API key format is correct (starts with `re_`)

### Testing Checklist

- [ ] `.env.local` file exists
- [ ] `RESEND_API_KEY` is set in `.env.local`
- [ ] Dev server restarted after adding API key
- [ ] Form submitted successfully
- [ ] Success message displayed
- [ ] Email received in inbox (or spam folder)

### Next Steps After Testing

Once you confirm emails are working:

1. **For Production**:
   - Verify your domain in Resend
   - Update `RESEND_FROM_EMAIL` to use your verified domain
   - Add environment variables to your hosting platform (Vercel, etc.)

2. **Improve Email Deliverability**:
   - Set up SPF/DKIM records for your domain
   - Use a verified sender email
   - This prevents emails from going to spam

---

**Ready to test?** Follow the steps above and let me know if you receive the email! 📧

