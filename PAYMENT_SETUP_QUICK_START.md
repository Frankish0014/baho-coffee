# Payment Integration - Quick Start Guide

## ✅ What's Been Set Up

Your payment system is now fully integrated! Here's what's working:

1. **Stripe Payment Processing** - Secure card payments
2. **Database Storage** - All payments saved to PostgreSQL
3. **Email Confirmations** - Automatic emails to customers and admin
4. **Payment Form** - Secure Stripe Elements integration

## 🚀 Quick Setup Steps

### 1. Get Stripe API Keys

1. Sign up at https://stripe.com
2. Go to **Developers** → **API keys**
3. Copy your **Test** keys:
   - Publishable key: `pk_test_...`
   - Secret key: `sk_test_...`

### 2. Get Resend API Key (for emails)

1. Sign up at https://resend.com
2. Go to **API Keys**
3. Create a new API key: `re_...`

### 3. Set Environment Variables

Add these to your `.env.local` file:

```env
# Stripe
STRIPE_SECRET_KEY=sk_test_your_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Resend (for emails)
RESEND_API_KEY=re_your_key_here
RESEND_FROM_EMAIL=Baho Coffee <noreply@bahocoffee.com>
ADMIN_EMAIL=bahocoffee@gmail.com

# Database (already set up)
POSTGRES_URL=your_postgres_url
```

### 4. Initialize Database

Visit this URL once after deployment:
```
https://your-app.vercel.app/api/admin/init-db
```

Or run locally:
```bash
curl -X POST http://localhost:3000/api/admin/init-db
```

### 5. Set Up Stripe Webhook (for production)

1. In Stripe Dashboard → **Webhooks**
2. Add endpoint: `https://your-app.vercel.app/api/payments/webhook`
3. Select events:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
4. Copy the **Signing secret** → Add to `STRIPE_WEBHOOK_SECRET`

## 🧪 Testing

### Test Card Numbers (Stripe Test Mode)

- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **3D Secure**: `4000 0025 0000 3155`

Use any:
- Future expiry date (e.g., `12/34`)
- Any 3-digit CVV (e.g., `123`)
- Any name

### Test Flow

1. Go to `/sales` page
2. Add products to cart
3. Click "Proceed to Checkout"
4. Fill in shipping details
5. Enter test card number
6. Complete payment
7. Check email for confirmation

## 📧 Email Configuration

Emails are sent automatically when:
- ✅ Payment succeeds (customer + admin)
- ❌ Payment fails (customer notification)

Make sure `RESEND_API_KEY` and `RESEND_FROM_EMAIL` are set correctly.

## 🔒 Security

- ✅ Card details never touch your server
- ✅ Payments processed securely by Stripe
- ✅ Webhook signatures verified
- ✅ HTTPS required in production

## 📊 Viewing Payments

All payments are stored in your database `payments` table with:
- Order ID
- Customer information
- Payment status
- Amount and items
- Stripe Payment Intent ID

## 🆘 Troubleshooting

### Payment Not Processing
- Check browser console for errors
- Verify Stripe keys are correct
- Ensure webhook secret is set

### Emails Not Sending
- Check Resend API key
- Verify `RESEND_FROM_EMAIL` format
- Check Resend dashboard for logs

### Build Errors
- Make sure all environment variables are set
- Run `npm install` to ensure dependencies are installed

## 📚 Full Documentation

See `STRIPE_PAYMENT_SETUP.md` for detailed setup instructions.

## ✨ You're All Set!

Once you add your Stripe and Resend API keys, your payment system will be fully functional!

