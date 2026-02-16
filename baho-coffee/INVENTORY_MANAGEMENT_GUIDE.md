# Inventory Management Guide

## ✅ How Inventory Updates Work

### 1. **Automatic Inventory Reduction After Purchase**

When a customer completes a purchase, inventory is automatically reduced:

- **Card Payments**: Inventory is reduced in two places (for redundancy):
  1. When payment is confirmed via `/api/payments/confirm` (client-side confirmation)
  2. When Stripe webhook confirms payment via `/api/payments/webhook` (server-side confirmation)

- **Bank Transfers**: Inventory is reduced when admin manually updates payment status to "succeeded"

**What gets reduced:**
- The exact quantity purchased for each product
- Only happens when payment status is "succeeded"
- Prevents overselling

### 2. **Manual Inventory Management (Admin)**

You can manage inventory in the Admin Dashboard:

**Access:** Go to `/admin` → Click "Products" section

**Features:**
- ✅ View all products and current inventory levels
- ✅ **Add Stock**: Increment inventory when you receive more coffee
- ✅ **Set Quantity**: Set inventory to a specific amount
- ✅ **Create New Product**: Add new products to inventory
- ✅ Real-time updates after changes

## 📋 How to Use

### Adding Stock When You Get More Coffee

1. Go to Admin Dashboard (`/admin`)
2. Click "Products" in the menu
3. Find the product you want to update
4. Click **"Add Stock"** button
5. Enter the amount of kg you received (e.g., 500)
6. Click **"Confirm Add"**
7. The inventory will be updated immediately

**Example:**
- Current: 1000 kg
- You receive: 500 kg more
- Click "Add Stock" → Enter 500 → New total: 1500 kg

### Setting Inventory to a Specific Amount

1. Go to Admin Dashboard → Products
2. Find the product
3. Click **"Set Quantity"** button
4. Enter the exact amount you want (e.g., 2000)
5. Click **"Set Quantity"**
6. Inventory will be set to exactly that amount

**Example:**
- Current: 1500 kg
- You want to set it to: 2000 kg
- Click "Set Quantity" → Enter 2000 → New total: 2000 kg

### Creating a New Product

1. Go to Admin Dashboard → Products
2. In the "Add New Product" section:
   - Enter Product ID (e.g., `new-product-washed`)
   - Enter Product Name (e.g., `New Product Washed`)
   - Enter Initial Quantity (e.g., `1000`)
3. Click **"Create Product"**

## 🔄 Real-Time Updates

- **Sales Page**: Automatically refreshes inventory after successful purchases
- **Admin Dashboard**: Shows current inventory levels in real-time
- **After Adding Stock**: Inventory updates immediately and is visible on sales page

## 📊 Inventory Status Colors

- 🟢 **Green**: > 1000 kg (Good stock)
- 🟡 **Yellow**: 500-1000 kg (Moderate stock)
- 🔴 **Red**: < 500 kg (Low stock)

## ⚠️ Important Notes

1. **Inventory Reduction is Automatic**: You don't need to manually reduce inventory after sales
2. **Double Reduction Protection**: The system prevents double-reduction if both webhook and confirm are called
3. **Inventory Validation**: The system checks available quantity before allowing purchases
4. **Real-Time Sync**: Sales page fetches latest inventory on load and after purchases

## 🐛 Troubleshooting

### Inventory not updating after purchase?
- Check server logs for inventory reduction messages
- Verify payment status is "succeeded"
- Check database connection

### Can't add inventory?
- Make sure you're logged into admin
- Check that product ID matches exactly
- Verify database is connected

### Inventory shows 0 but you have stock?
- Use "Set Quantity" to set the correct amount
- Or use "Add Stock" to add the current amount

## 📝 API Endpoints

- `GET /api/inventory` - Get all inventory
- `POST /api/inventory` - Set inventory to specific amount
- `POST /api/inventory/add` - Add quantity to existing inventory

