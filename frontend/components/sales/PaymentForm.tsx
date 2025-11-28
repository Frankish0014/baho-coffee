"use client";

import { useState, FormEvent } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { CreditCard, CheckCircle2, ArrowLeft, X } from "lucide-react";

interface PaymentFormProps {
  amount: number;
  checkoutData: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    zipCode: string;
    paymentMethod: string;
  };
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    total: number;
  }>;
  onBack: () => void;
  onSuccess: (orderId: string, total: number) => void;
  onError: (error: string) => void;
  onPaymentMethodChange?: (method: string) => void;
}

export default function PaymentForm({
  amount,
  checkoutData,
  items,
  onBack,
  onSuccess,
  onError,
  onPaymentMethodChange,
}: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState(checkoutData.paymentMethod);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (paymentMethod === "bank") {
      // For bank transfer, just show confirmation
      onSuccess("", amount);
      return;
    }

    if (!stripe || !elements) {
      setError("Stripe is not loaded. Please wait a moment and try again.");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const totalCartValue = amount;

      // Prepare payment items
      const paymentItems = items.map((item) => ({
        productId: item.productId,
        productName: item.productName,
        quantity: item.quantity,
        price: item.price,
        total: item.total,
      }));

      // Create payment intent 
      const response = await fetch("/api/payments/create-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName: checkoutData.name,
          customerEmail: checkoutData.email,
          customerPhone: checkoutData.phone,
          shippingAddress: checkoutData.address,
          shippingCity: checkoutData.city,
          shippingCountry: checkoutData.country,
          shippingZip: checkoutData.zipCode,
          paymentMethod: paymentMethod,
          items: paymentItems,
          amount: totalCartValue,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to process payment");
      }

      // Get card element
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error("Card element not found");
      }

      // Confirm payment with Stripe
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: checkoutData.name,
              email: checkoutData.email,
              phone: checkoutData.phone,
              address: {
                line1: checkoutData.address,
                city: checkoutData.city,
                country: checkoutData.country,
                postal_code: checkoutData.zipCode,
              },
            },
          },
        }
      );

      if (confirmError) {
        throw new Error(confirmError.message || "Payment failed");
      }

      if (paymentIntent?.status === "succeeded") {
        // Confirm payment with backend
        const confirmResponse = await fetch("/api/payments/confirm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId: data.orderId,
          }),
        });

        if (!confirmResponse.ok) {
          throw new Error("Failed to confirm payment");
        }

        onSuccess(data.orderId, totalCartValue);
      }
    } catch (err: any) {
      const errorMessage = err.message || "Payment failed. Please try again.";
      setError(errorMessage);
      onError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#111827",
        fontFamily: "Inter, system-ui, sans-serif",
        "::placeholder": {
          color: "#9ca3af",
        },
      },
      invalid: {
        color: "#ef4444",
        iconColor: "#ef4444",
      },
      complete: {
        color: "#10b981",
        iconColor: "#10b981",
      },
    },
    hidePostalCode: false,
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Payment</h2>
        <button
          onClick={onBack}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Payment Method
          </h3>
          <div className="space-y-3">
            <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
              paymentMethod === "card" 
                ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20" 
                : "border-gray-300 dark:border-gray-700 hover:border-primary-500"
            }`}>
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === "card"}
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
                  onPaymentMethodChange?.(e.target.value);
                }}
                className="mr-3"
              />
              <CreditCard className="w-5 h-5 mr-2" />
              <span className="font-medium text-gray-900 dark:text-white">Credit/Debit Card</span>
            </label>
            <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
              paymentMethod === "bank" 
                ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20" 
                : "border-gray-300 dark:border-gray-700 hover:border-primary-500"
            }`}>
              <input
                type="radio"
                name="paymentMethod"
                value="bank"
                checked={paymentMethod === "bank"}
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
                  onPaymentMethodChange?.(e.target.value);
                }}
                className="mr-3"
              />
              <span className="font-medium text-gray-900 dark:text-white">Bank Transfer</span>
            </label>
          </div>
        </div>

        {paymentMethod === "card" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Card Details *
              </label>
              <div className="p-4 border-2 border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus-within:border-primary-500 dark:focus-within:border-primary-500 transition-colors">
                <CardElement 
                  options={cardElementOptions}
                  className="stripe-card-element"
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              🔒 Your payment information is secure. Payments are processed securely through Stripe.
            </p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold text-gray-900 dark:text-white">Total Amount:</span>
            <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              ${amount.toFixed(2)}
            </span>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onBack}
              disabled={isProcessing}
              className="flex-1 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-lg font-semibold transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <button
              type="submit"
              disabled={!stripe || isProcessing}
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Complete Payment
                  <CheckCircle2 className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

