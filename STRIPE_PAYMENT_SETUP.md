# Stripe Payment Integration Setup Guide

This guide will help you set up Stripe payment processing for the Baho Coffee website.

## Prerequisites

1. A Stripe account (sign up at https://stripe.com)
2. A Resend account for email confirmations (sign up at https://resend.com)
3. Vercel Postgres database configured

## Step 1: Set Up Stripe

### 1.1 Create a Stripe Account

1. Go to https://stripe.com and sign up for an account
2. Complete the account verification process
3. Navigate to the Dashboard

### 1.2 Get Your API Keys

1. In the Stripe Dashboard, go to **Developers** → **API keys**
2. You'll see two keys:
   - **Publishable key** (starts with `pk_test_` or `pk_live_`)
   - **Secret key** (starts with `sk_test_` or `sk_live_`)

3. For testing, use the **Test mode** keys (they start with `test_`)
4. For production, use the **Live mode** keys (they start with `live_`)

### 1.3 Set Up Webhook Endpoint

1. In Stripe Dashboard, go to **Developers** → **Webhooks**
2. Click **Add endpoint**
3. Enter your webhook URL:
   - **Development**: `https://your-app.vercel.app/api/payments/webhook`
   - **Production**: `https://your-production-domain.com/api/payments/webhook`
4. Select events to listen for:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy the **Signing secret** (starts with `whsec_`)

## Step 2: Set Up Resend for Email Confirmations

### 2.1 Create a Resend Account

1. Go to https://resend.com and sign up
2. Verify your email address
3. Go to **API Keys** in the dashboard

### 2.2 Get Your API Key

1. Click **Create API Key**
2. Give it a name (e.g., "Baho Coffee Production")
3. Copy the API key (starts with `re_`)

### 2.3 Verify Your Domain (Optional but Recommended)

1. Go to **Domains** in Resend dashboard
2. Add your domain (e.g., `bahocoffee.com`)
3. Follow the DNS verification steps
4. Once verified, you can use emails like `noreply@bahocoffee.com`

## Step 3: Configure Environment Variables

### 3.1 Local Development (.env.local)

Create or update `.env.local` in your project root:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_test_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_test_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Resend Email Configuration
RESEND_API_KEY=re_your_resend_api_key_here
RESEND_FROM_EMAIL=Baho Coffee <noreply@bahocoffee.com>
ADMIN_EMAIL=bahocoffee@gmail.com

# Database (already configured)
POSTGRES_URL=your_postgres_url_here
```

### 3.2 Vercel Production

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add all the environment variables from Step 3.1
4. For production, use **Live mode** Stripe keys:
   - `STRIPE_SECRET_KEY=sk_live_...`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...`
5. Make sure to set the environment to **Production** for live keys

## Step 4: Initialize Database Tables

### 4.1 Initialize Payments Table

1. Make sure your database is initialized:
   ```bash
   # This will create the payments table
   curl -X POST https://your-app.vercel.app/api/admin/init-db
   ```

   Or visit: `https://your-app.vercel.app/api/admin/init-db` in your browser

2. The payments table will be created automatically with the following structure:
   - Order tracking
   - Customer information
   - Payment status
   - Stripe payment intent IDs
   - Order items

## Step 5: Test the Payment Flow

### 5.1 Test Mode

1. Use Stripe test card numbers:
   - **Success**: `4242 4242 4242 4242`
   - **Decline**: `4000 0000 0000 0002`
   - **3D Secure**: `4000 0025 0000 3155`

2. Use any future expiry date (e.g., `12/34`)
3. Use any 3-digit CVV (e.g., `123`)

### 5.2 Test the Complete Flow

1. Go to `/sales` page
2. Add products to cart
3. Proceed to checkout
4. Fill in shipping information
5. Enter test card details
6. Complete payment
7. Check your email for confirmation

## Step 6: Monitor Payments

### 6.1 Stripe Dashboard

- View all payments in **Payments** section
- See payment status, amounts, and customer details
- Handle refunds if needed

### 6.2 Your Database

- All payments are stored in the `payments` table
- Query payments by order ID, customer email, or status
- Track order history and analytics

## Step 7: Go Live

### 7.1 Switch to Live Mode

1. In Stripe Dashboard, toggle to **Live mode**
2. Get your live API keys
3. Update environment variables in Vercel:
   - `STRIPE_SECRET_KEY=sk_live_...`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...`
4. Update webhook endpoint to use production URL
5. Redeploy your application

### 7.2 Verify Webhook

1. In Stripe Dashboard → Webhooks
2. Test the webhook endpoint
3. Verify that payment confirmations are being sent

## Troubleshooting

### Payment Not Processing

1. Check browser console for errors
2. Verify Stripe keys are correct
3. Check that webhook secret is set correctly
4. Verify database connection

### Emails Not Sending

1. Check Resend API key is correct
2. Verify `RESEND_FROM_EMAIL` is set
3. Check Resend dashboard for email logs
4. Verify domain is verified (if using custom domain)

### Webhook Not Working

1. Use Stripe CLI for local testing:
   ```bash
   stripe listen --forward-to localhost:3000/api/payments/webhook
   ```
2. Check webhook signature in Stripe Dashboard
3. Verify webhook URL is accessible
4. Check server logs for webhook errors

## Security Best Practices

1. **Never commit API keys to Git**
   - Use `.env.local` for local development
   - Use Vercel environment variables for production

2. **Use HTTPS in production**
   - Vercel automatically provides HTTPS
   - Never process payments over HTTP

3. **Validate webhook signatures**
   - Always verify webhook signatures
   - Use the webhook secret from Stripe

4. **Monitor for suspicious activity**
   - Check Stripe Dashboard regularly
   - Set up alerts for failed payments
   - Review payment logs

## Support

- **Stripe Documentation**: https://stripe.com/docs
- **Resend Documentation**: https://resend.com/docs
- **Stripe Support**: support@stripe.com

## Next Steps

1. Set up payment analytics
2. Implement refund functionality
3. Add order tracking
4. Set up automated email notifications
5. Create admin dashboard for order management

