# Test Contact Form - Quick Steps

## ✅ Your Email is Already Configured!

Your `.env.local` has:
- ✅ `RESEND_API_KEY` - Set
- ✅ `RESEND_FROM_EMAIL` - Set to `noreply@bahocoffee.com`
- ✅ `ADMIN_EMAIL` - Set to `bahocoffee@gmail.com`

## 🧪 How to Test

### Step 1: Make Sure Dev Server is Running

```bash
npm run dev
```

Your site should be at: http://localhost:3000

### Step 2: Go to Contact Page

1. Navigate to: **http://localhost:3000/contact**
2. Or click "Contact" in the navigation menu

### Step 3: Fill Out the Form

Fill in the form with:
- **Name**: Your name
- **Email**: **Your real email address** (where you want to receive the confirmation)
- **Subject**: Test message
- **Message**: "This is a test to verify email functionality works correctly."

### Step 4: Submit and Check

1. Click "Send Message"
2. You should see: **"Message sent successfully! Check your email inbox (not spam) for confirmation."**
3. Check your email inbox (the one you entered in the form)
4. **Check spam/junk folder** - especially if using `noreply@bahocoffee.com`

## ⚠️ If Email Fails

If you get an error about domain verification, you have two options:

### Option 1: Use Test Email (Quick Fix)

Temporarily change `.env.local`:
```env
RESEND_FROM_EMAIL=onboarding@resend.dev
```

Then restart your dev server and test again.

### Option 2: Verify Your Domain in Resend

1. Go to https://resend.com/dashboard
2. Navigate to **Domains**
3. Add `bahocoffee.com`
4. Add the DNS records (SPF, DKIM) they provide
5. Wait for verification (usually a few minutes)

## 📧 What You'll Receive

You'll get a beautiful HTML email with:
- Subject: "Thank you for contacting Baho Coffee"
- Professional branding
- Your message content
- Contact information

## 🔍 Check Terminal for Debug Info

When you submit the form, check your terminal for:
- ✅ "Email sent successfully!" - Good!
- ❌ Any error messages - Will tell you what's wrong

## ✅ Success Indicators

- Form shows success message
- Terminal shows "✅ Email sent successfully!"
- Email arrives in your inbox (check spam too!)

---

**Ready?** Go to http://localhost:3000/contact and test it! 🚀

