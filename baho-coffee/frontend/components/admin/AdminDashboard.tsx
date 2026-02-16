"use client";

import { useState, useEffect } from "react";
import { Coffee, MapPin, FileText, Image, Settings, Mail, Search, Calendar, User, MessageSquare, Building2, Phone, Globe, Receipt, CreditCard, CheckCircle, XCircle, Clock, AlertCircle, Users, BarChart3, Database, Server, Bell, Shield, Activity, TrendingUp, DollarSign, MessageCircle, FileText as FileTextIcon, Zap, Info } from "lucide-react";
import InventoryManagement from "./InventoryManagement";

const menuItems = [
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "messages", label: "Contact Messages", icon: Mail },
  { id: "quotations", label: "Quotation Requests", icon: Receipt },
  { id: "newsletter", label: "Newsletter Subscribers", icon: Users },
  { id: "products", label: "Products", icon: Coffee },
  { id: "stations", label: "Washing Stations", icon: MapPin },
  { id: "blog", label: "Blog Posts", icon: FileText },
  { id: "media", label: "Media", icon: Image },
  { id: "settings", label: "Settings", icon: Settings },
];

interface ContactSubmission {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface QuotationRequest {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  company: string;
  country: string;
  phone: string;
  productInterest: string[];
  quantity: string;
  message: string;
}

interface Payment {
  id: string;
  orderId: string;
  timestamp?: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  shippingAddress: string;
  shippingCity: string;
  shippingCountry: string;
  shippingZip?: string;
  paymentMethod: string;
  paymentStatus: "pending" | "processing" | "succeeded" | "failed" | "canceled";
  amount: number;
  currency: string;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    total: number;
  }>;
}

interface NewsletterSubscriber {
  id: string;
  email: string;
  timestamp?: string;
  status?: "active" | "unsubscribed";
}

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("payments"); // Default to payments
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [quotations, setQuotations] = useState<QuotationRequest[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const [settingsTab, setSettingsTab] = useState<"analytics" | "site" | "system">("analytics");
  const [analytics, setAnalytics] = useState<any>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);

  useEffect(() => {
    if (activeSection === "messages") {
      fetchSubmissions();
    } else if (activeSection === "quotations") {
      fetchQuotations();
    } else if (activeSection === "payments") {
      fetchPayments();
    } else if (activeSection === "newsletter") {
      fetchSubscribers();
    } else if (activeSection === "settings") {
      fetchAnalytics();
    }
  }, [activeSection]);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/contact/submissions");
      const data = await response.json();
      setSubmissions(data.submissions || []);
    } catch (error) {
      console.error("Error fetching submissions:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchQuotations = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/export/quotation/requests");
      const data = await response.json();
      setQuotations(data.requests || []);
    } catch (error) {
      console.error("Error fetching quotations:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/payments/list");
      const data = await response.json();
      
      if (!response.ok) {
        const errorMsg = data.error || "Failed to fetch payments";
        // Provide more context for common errors
        if (response.status === 401 || errorMsg.includes("Unauthorized") || errorMsg.includes("credentials")) {
          throw new Error(`${errorMsg}\n\nPlease check:\n1. Your DATABASE_URL or POSTGRES_URL environment variable is set correctly\n2. Database credentials are valid\n3. Database server is accessible`);
        } else if (response.status === 503 || errorMsg.includes("connection")) {
          throw new Error(`${errorMsg}\n\nPlease check:\n1. Database server is running\n2. Network connection is available\n3. Firewall settings allow database connections`);
        } else if (response.status === 404 || errorMsg.includes("table") || errorMsg.includes("relation")) {
          throw new Error(`${errorMsg}\n\nTry initializing the database by visiting: /api/admin/init-db`);
        }
        throw new Error(errorMsg);
      }
      
      setPayments(data.payments || []);
    } catch (error: any) {
      console.error("Error fetching payments:", error);
      alert(`Error loading payments: ${error.message || "Unknown error"}. Please check your database connection.`);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/newsletter/subscribers");
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch subscribers");
      }
      
      setSubscribers(data.subscribers || []);
    } catch (error: any) {
      console.error("Error fetching subscribers:", error);
      alert(`Error loading subscribers: ${error.message || "Unknown error"}. Please check your database connection.`);
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    try {
      setAnalyticsLoading(true);
      
      // Fetch all data in parallel
      const [paymentsRes, subscribersRes, messagesRes, quotationsRes] = await Promise.all([
        fetch("/api/payments/list").catch(() => ({ ok: false, json: async () => ({ payments: [] }) })),
        fetch("/api/newsletter/subscribers").catch(() => ({ ok: false, json: async () => ({ subscribers: [] }) })),
        fetch("/api/contact/submissions").catch(() => ({ ok: false, json: async () => ({ submissions: [] }) })),
        fetch("/api/export/quotation/requests").catch(() => ({ ok: false, json: async () => ({ requests: [] }) })),
      ]);

      const paymentsData = await paymentsRes.json();
      const subscribersData = await subscribersRes.json();
      const messagesData = await messagesRes.json();
      const quotationsData = await quotationsRes.json();

      const payments = paymentsData.payments || [];
      const subscribers = subscribersData.subscribers || [];
      const messages = messagesData.submissions || [];
      const quotations = quotationsData.requests || [];

      // Calculate statistics
      const totalRevenue = payments
        .filter((p: Payment) => p.paymentStatus === "succeeded")
        .reduce((sum: number, p: Payment) => sum + (p.amount || 0), 0);

      const pendingPayments = payments.filter((p: Payment) => p.paymentStatus === "pending").length;
      const succeededPayments = payments.filter((p: Payment) => p.paymentStatus === "succeeded").length;
      const activeSubscribers = subscribers.filter((s: NewsletterSubscriber) => s.status === "active").length;

      // Recent activity (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const recentPayments = payments.filter((p: Payment) => 
        p.timestamp && new Date(p.timestamp) >= sevenDaysAgo
      ).length;

      const recentSubscribers = subscribers.filter((s: NewsletterSubscriber) => 
        s.timestamp && new Date(s.timestamp) >= sevenDaysAgo
      ).length;

      const recentMessages = messages.filter((m: ContactSubmission) => 
        m.timestamp && new Date(m.timestamp) >= sevenDaysAgo
      ).length;

      setAnalytics({
        payments: {
          total: payments.length,
          succeeded: succeededPayments,
          pending: pendingPayments,
          failed: payments.filter((p: Payment) => p.paymentStatus === "failed").length,
          revenue: totalRevenue,
          recent: recentPayments,
        },
        subscribers: {
          total: subscribers.length,
          active: activeSubscribers,
          unsubscribed: subscribers.filter((s: NewsletterSubscriber) => s.status === "unsubscribed").length,
          recent: recentSubscribers,
        },
        messages: {
          total: messages.length,
          recent: recentMessages,
        },
        quotations: {
          total: quotations.length,
          recent: quotations.filter((q: QuotationRequest) => 
            q.timestamp && new Date(q.timestamp) >= sevenDaysAgo
          ).length,
        },
      });
    } catch (error: any) {
      console.error("Error fetching analytics:", error);
    } finally {
      setAnalyticsLoading(false);
    }
  };

  const createTestPayment = async () => {
    if (!confirm("Create a test payment with 'pending' status? This will help you test the payment status update feature.")) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/payments/create-test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName: "Test Customer",
          customerEmail: "test@example.com",
          amount: 150,
          productId: "bugoyi-washed",
          productName: "Bugoyi Washed",
          quantity: 15,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create test payment");
      }

      alert(`Test payment created successfully!\nOrder ID: ${data.payment.orderId}\nStatus: ${data.payment.status}\n\nYou can now update its status to "succeeded" to test inventory reduction.`);
      
      // Refresh payments list
      await fetchPayments();
    } catch (error: any) {
      console.error("Error creating test payment:", error);
      alert(`Error creating test payment: ${error.message || "Unknown error"}\n\nMake sure your database is configured correctly.`);
    } finally {
      setLoading(false);
    }
  };

  const updatePaymentStatus = async (orderId: string, newStatus: string) => {
    const payment = payments.find(p => p.orderId === orderId);
    const currentStatus = payment?.paymentStatus || "unknown";
    
    let confirmMessage = `Update payment status from "${currentStatus}" to "${newStatus}"?`;
    
    if (newStatus === "succeeded") {
      confirmMessage += "\n\n⚠️ This will:\n• Reduce inventory for all items in this order\n• Send a confirmation email to the customer\n• Mark the payment as completed";
    } else if (currentStatus === "succeeded" && newStatus !== "succeeded") {
      confirmMessage += "\n\n⚠️ Warning: This payment was already marked as succeeded. Changing it may cause inventory inconsistencies.";
    }
    
    if (!confirm(confirmMessage)) {
      return;
    }

    try {
      setUpdatingStatus(orderId);
      const response = await fetch("/api/payments/update-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          status: newStatus,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update payment status");
      }

      const successMessage = data.message || "Payment status updated successfully!";
      
      // If status was updated to "succeeded", notify user to check inventory
      if (newStatus === "succeeded") {
        alert(`${successMessage}\n\n✅ Inventory has been reduced for all items in this order.\n\nPlease refresh the Inventory tab to see the updated quantities.`);
        // Dispatch a custom event to refresh inventory if the component is listening
        window.dispatchEvent(new CustomEvent("refreshInventory"));
      } else {
        alert(successMessage);
      }
      
      // Refresh payments list
      await fetchPayments();
    } catch (error: any) {
      console.error("Error updating payment status:", error);
      alert(`Error: ${error.message || "Failed to update payment status"}`);
    } finally {
      setUpdatingStatus(null);
    }
  };

  const filteredSubmissions = submissions.filter(
    (submission) =>
      submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredQuotations = quotations.filter(
    (quotation) =>
      quotation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quotation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quotation.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quotation.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || payment.paymentStatus === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const filteredSubscribers = subscribers.filter((subscriber) =>
    subscriber.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "succeeded":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case "processing":
        return <AlertCircle className="w-5 h-5 text-blue-600" />;
      case "failed":
      case "canceled":
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-semibold";
    switch (status) {
      case "succeeded":
        return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`;
      case "pending":
        return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200`;
      case "processing":
        return `${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200`;
      case "failed":
        return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200`;
      case "canceled":
        return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200`;
    }
  };

  const formatDate = (timestamp: string) => {
    if (!timestamp) return "Date not available";
    
    const date = new Date(timestamp);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      // Try to extract date from payment ID if it contains a timestamp
      const timestampMatch = timestamp.match(/\d{13}/); // Match 13-digit timestamp
      if (timestampMatch) {
        const extractedDate = new Date(parseInt(timestampMatch[0]));
        if (!isNaN(extractedDate.getTime())) {
          return extractedDate.toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });
        }
      }
      return "Invalid Date";
    }
    
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Debug: Log menu items to ensure they're all there
  console.log("Menu items:", menuItems.map(item => item.label));

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`p-6 rounded-lg border-2 transition-all ${
                activeSection === item.id
                  ? "border-primary-600 bg-primary-50 dark:bg-primary-900"
                  : "border-gray-200 dark:border-gray-800 hover:border-primary-300"
              }`}
            >
              <Icon className="w-8 h-8 mb-2 text-primary-600" />
              <h3 className="font-semibold">{item.label}</h3>
            </button>
          );
        })}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        {activeSection === "payments" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold">Payment Management</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Manage all payments and update their status. When you set a payment to "Succeeded", inventory will be automatically reduced and a confirmation email will be sent to the customer.
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={createTestPayment}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm whitespace-nowrap"
                  disabled={loading}
                >
                  Create Test Payment
                </button>
                <button
                  onClick={fetchPayments}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm whitespace-nowrap"
                  disabled={loading}
                >
                  Refresh List
                </button>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">Loading payments...</p>
              </div>
            ) : payments.length === 0 ? (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                  No Payments Found
                </h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-4">
                  There are no payments in the database yet. You can:
                </p>
                <ul className="list-disc list-inside text-sm text-yellow-700 dark:text-yellow-300 mb-4 space-y-1">
                  <li>Create a test payment using the button below</li>
                  <li>Make a purchase through the sales page at <code className="bg-yellow-100 dark:bg-yellow-900 px-1 rounded">/sales</code></li>
                  <li>Check that your database is properly configured</li>
                </ul>
                <button
                  onClick={createTestPayment}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium"
                  disabled={loading}
                >
                  Create Test Payment
                </button>
              </div>
            ) : (
              <>
                <div className="mb-6 space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by order ID, customer name, or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter by status:</label>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-sm"
                    >
                      <option value="all">All Statuses</option>
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="succeeded">Succeeded</option>
                      <option value="failed">Failed</option>
                      <option value="canceled">Canceled</option>
                    </select>
                  </div>
                </div>

                {filteredPayments.length === 0 ? (
                  <div className="text-center py-12">
                    <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      {searchTerm || statusFilter !== "all" ? "No payments found matching your filters." : "No payments yet."}
                    </p>
                    {!searchTerm && statusFilter === "all" && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                          Create a test payment to see how payment status updates work, or make a purchase through the sales page.
                        </p>
                        <button
                          onClick={createTestPayment}
                          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                          disabled={loading}
                        >
                          Create Test Payment
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Showing {filteredPayments.length} of {payments.length} payment(s)
                    </div>
                    {filteredPayments.map((payment) => (
                      <div
                        key={payment.id}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <CreditCard className="w-5 h-5 text-primary-600" />
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Order: {payment.orderId}
                              </h3>
                              <div className={`flex items-center gap-2 ${getStatusBadge(payment.paymentStatus)}`}>
                                {getStatusIcon(payment.paymentStatus)}
                                <span className="capitalize">{payment.paymentStatus}</span>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400 ml-8 mt-2">
                              <div className="flex items-center space-x-1">
                                <User className="w-4 h-4 flex-shrink-0" />
                                <span>{payment.customerName}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Mail className="w-4 h-4 flex-shrink-0" />
                                <a
                                  href={`mailto:${payment.customerEmail}`}
                                  className="hover:text-primary-600 hover:underline break-all"
                                >
                                  {payment.customerEmail}
                                </a>
                              </div>
                              {payment.customerPhone && (
                                <div className="flex items-center space-x-1">
                                  <Phone className="w-4 h-4 flex-shrink-0" />
                                  <span>{payment.customerPhone}</span>
                                </div>
                              )}
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4 flex-shrink-0" />
                                <span className="whitespace-nowrap">
                                  {payment.timestamp ? formatDate(payment.timestamp) : "Date not available"}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                              ${payment.amount.toFixed(2)} {payment.currency}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 capitalize mt-1">
                              {payment.paymentMethod}
                            </div>
                          </div>
                        </div>
                        
                        <div className="mb-4 space-y-2 text-sm">
                          <div>
                            <span className="font-semibold text-gray-900 dark:text-white">Shipping: </span>
                            <span className="text-gray-700 dark:text-gray-300">
                              {payment.shippingAddress}, {payment.shippingCity}, {payment.shippingCountry}
                            </span>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900 dark:text-white">Items: </span>
                            <span className="text-gray-700 dark:text-gray-300">
                              {payment.items.map((item) => `${item.productName} (${item.quantity} kg)`).join(", ")}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Update Status:</span>
                          <select
                            value={payment.paymentStatus}
                            onChange={(e) => {
                              const newStatus = e.target.value;
                              if (newStatus !== payment.paymentStatus) {
                                updatePaymentStatus(payment.orderId, newStatus);
                              }
                            }}
                            disabled={updatingStatus === payment.orderId}
                            className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-sm disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-primary-500"
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="succeeded">Succeeded ✓ (Reduces Inventory & Sends Email)</option>
                            <option value="failed">Failed</option>
                            <option value="canceled">Canceled</option>
                          </select>
                          {updatingStatus === payment.orderId && (
                            <span className="text-sm text-gray-500 flex items-center gap-1">
                              <Clock className="w-4 h-4 animate-spin" />
                              Updating...
                            </span>
                          )}
                          {payment.paymentStatus === "succeeded" && (
                            <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                              <CheckCircle className="w-4 h-4" />
                              Inventory reduced
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {activeSection === "messages" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Contact Messages</h2>
              <button
                onClick={fetchSubmissions}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm"
              >
                Refresh
              </button>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">Loading messages...</p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by name, email, subject, or message..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
                    />
                  </div>
                </div>

                {filteredSubmissions.length === 0 ? (
                  <div className="text-center py-12">
                    <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                      {searchTerm ? "No messages found matching your search." : "No contact messages yet."}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Showing {filteredSubmissions.length} of {submissions.length} message(s)
                    </div>
                    {filteredSubmissions.map((submission) => (
                      <div
                        key={submission.id}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <User className="w-5 h-5 text-primary-600" />
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {submission.name}
                              </h3>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 text-sm text-gray-600 dark:text-gray-400 ml-8">
                              <div className="flex items-center space-x-1">
                                <Mail className="w-4 h-4 flex-shrink-0" />
                                <a
                                  href={`mailto:${submission.email}`}
                                  className="hover:text-primary-600 hover:underline break-all"
                                >
                                  {submission.email}
                                </a>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4 flex-shrink-0" />
                                <span className="whitespace-nowrap">{formatDate(submission.timestamp)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mb-3">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                            Subject: {submission.subject}
                          </h4>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                          <div className="flex items-start space-x-2">
                            <MessageSquare className="w-5 h-5 text-primary-600 mt-0.5" />
                            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                              {submission.message}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {activeSection === "quotations" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Quotation Requests</h2>
              <button
                onClick={fetchQuotations}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm"
              >
                Refresh
              </button>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">Loading quotation requests...</p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by name, email, company, or country..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
                    />
                  </div>
                </div>

                {filteredQuotations.length === 0 ? (
                  <div className="text-center py-12">
                    <Receipt className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                      {searchTerm ? "No quotation requests found matching your search." : "No quotation requests yet."}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Showing {filteredQuotations.length} of {quotations.length} request(s)
                    </div>
                    {filteredQuotations.map((quotation) => {
                      const productNames: { [key: string]: string } = {
                        "1": "Bugoyi Washed",
                        "2": "Humure Washed",
                        "3": "Matyazo Natural",
                        "4": "Kinazi Washed",
                      };
                      const selectedProducts = quotation.productInterest.map((id: string) => productNames[id] || `Product ${id}`).join(", ");

                      return (
                        <div
                          key={quotation.id}
                          className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <User className="w-5 h-5 text-primary-600" />
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                  {quotation.name}
                                </h3>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400 ml-8 mt-2">
                                <div className="flex items-center space-x-1">
                                  <Mail className="w-4 h-4 flex-shrink-0" />
                                  <a
                                    href={`mailto:${quotation.email}`}
                                    className="hover:text-primary-600 hover:underline break-all"
                                  >
                                    {quotation.email}
                                  </a>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Phone className="w-4 h-4 flex-shrink-0" />
                                  <span className="break-all">{quotation.phone}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Building2 className="w-4 h-4 flex-shrink-0" />
                                  <span className="break-words">{quotation.company}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Globe className="w-4 h-4 flex-shrink-0" />
                                  <span className="break-words">{quotation.country}</span>
                                </div>
                                <div className="flex items-center space-x-1 md:col-span-2">
                                  <Calendar className="w-4 h-4 flex-shrink-0" />
                                  <span className="whitespace-nowrap">{formatDate(quotation.timestamp)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mb-3 space-y-2">
                            <div>
                              <span className="font-semibold text-gray-900 dark:text-white">Quantity: </span>
                              <span className="text-gray-700 dark:text-gray-300">{quotation.quantity} kg</span>
                            </div>
                            <div>
                              <span className="font-semibold text-gray-900 dark:text-white">Products of Interest: </span>
                              <span className="text-gray-700 dark:text-gray-300">{selectedProducts}</span>
                            </div>
                          </div>
                          {quotation.message && (
                            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mt-3">
                              <div className="flex items-start space-x-2">
                                <MessageSquare className="w-5 h-5 text-primary-600 mt-0.5" />
                                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                  {quotation.message}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {activeSection === "newsletter" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Newsletter Subscribers</h2>
              <button
                onClick={fetchSubscribers}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm"
              >
                Refresh
              </button>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">Loading subscribers...</p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
                    />
                  </div>
                </div>

                {filteredSubscribers.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                      {searchTerm ? "No subscribers found matching your search." : "No newsletter subscribers yet."}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Showing {filteredSubscribers.length} of {subscribers.length} subscriber(s)
                      {subscribers.filter(s => s.status === "active").length > 0 && (
                        <span className="ml-2 text-green-600 dark:text-green-400">
                          ({subscribers.filter(s => s.status === "active").length} active)
                        </span>
                      )}
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-50 dark:bg-gray-900">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Email
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Status
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Subscribed On
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredSubscribers.map((subscriber) => (
                              <tr key={subscriber.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <Mail className="w-4 h-4 text-gray-400 mr-2" />
                                    <a
                                      href={`mailto:${subscriber.email}`}
                                      className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
                                    >
                                      {subscriber.email}
                                    </a>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span
                                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                      subscriber.status === "active"
                                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                        : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                                    }`}
                                  >
                                    {subscriber.status === "active" ? "Active" : "Unsubscribed"}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                                  {subscriber.timestamp ? formatDate(subscriber.timestamp) : "N/A"}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                      <div>
                        <button
                          onClick={() => {
                            const emails = filteredSubscribers
                              .filter(s => s.status === "active")
                              .map(s => s.email)
                              .join("\n");
                            navigator.clipboard.writeText(emails);
                            alert("Active subscriber emails copied to clipboard!");
                          }}
                          className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                        >
                          Copy Active Emails
                        </button>
                      </div>
                      <div>
                        <button
                          onClick={() => {
                            const allEmails = filteredSubscribers.map(s => s.email).join("\n");
                            navigator.clipboard.writeText(allEmails);
                            alert("All subscriber emails copied to clipboard!");
                          }}
                          className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                        >
                          Copy All Emails
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {activeSection === "products" && (
          <InventoryManagement />
        )}

        {activeSection === "stations" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Manage Washing Stations
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Update washing station information, add photos, and manage farmer
              profiles.
            </p>
            <button className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
              Add New Station
            </button>
          </div>
        )}

        {activeSection === "blog" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Manage Blog Posts</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Create and edit blog posts. Manage categories and tags.
            </p>
            <button className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
              Create New Post
            </button>
          </div>
        )}

        {activeSection === "media" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Manage Media</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Upload and organize photos, videos, and downloadable files.
            </p>
            <button className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
              Upload Media
            </button>
          </div>
        )}

        {activeSection === "settings" && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Settings & Analytics</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Configure site settings, view analytics, and manage system information.
              </p>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setSettingsTab("analytics")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    settingsTab === "analytics"
                      ? "border-primary-500 text-primary-600 dark:text-primary-400"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Analytics
                  </div>
                </button>
                <button
                  onClick={() => setSettingsTab("site")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    settingsTab === "site"
                      ? "border-primary-500 text-primary-600 dark:text-primary-400"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Site Configuration
                  </div>
                </button>
                <button
                  onClick={() => setSettingsTab("system")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    settingsTab === "system"
                      ? "border-primary-500 text-primary-600 dark:text-primary-400"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4" />
                    System Info
                  </div>
                </button>
              </nav>
            </div>

            {/* Analytics Tab */}
            {settingsTab === "analytics" && (
              <div>
                {analyticsLoading ? (
                  <div className="text-center py-12">
                    <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4 animate-pulse" />
                    <p className="text-gray-600 dark:text-gray-400">Loading analytics...</p>
                  </div>
                ) : analytics ? (
                  <div className="space-y-6">
                    {/* Overview Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                              ${analytics.payments.revenue.toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                              {analytics.payments.succeeded} successful payments
                            </p>
                          </div>
                          <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
                            <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
                          </div>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Total Payments</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                              {analytics.payments.total}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                              {analytics.payments.pending} pending
                            </p>
                          </div>
                          <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                            <CreditCard className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                          </div>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Newsletter Subscribers</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                              {analytics.subscribers.active}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                              {analytics.subscribers.total} total
                            </p>
                          </div>
                          <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
                            <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                          </div>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Contact Messages</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                              {analytics.messages.total}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                              {analytics.messages.recent} this week
                            </p>
                          </div>
                          <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-lg">
                            <MessageCircle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Detailed Statistics */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Payments Breakdown */}
                      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                          <CreditCard className="w-5 h-5" />
                          Payment Statistics
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Total Payments</span>
                            <span className="font-semibold text-gray-900 dark:text-white">{analytics.payments.total}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Succeeded</span>
                            <span className="font-semibold text-green-600 dark:text-green-400">{analytics.payments.succeeded}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Pending</span>
                            <span className="font-semibold text-yellow-600 dark:text-yellow-400">{analytics.payments.pending}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Failed</span>
                            <span className="font-semibold text-red-600 dark:text-red-400">{analytics.payments.failed}</span>
                          </div>
                          <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                            <span className="text-gray-600 dark:text-gray-400">Recent (7 days)</span>
                            <span className="font-semibold text-primary-600 dark:text-primary-400">{analytics.payments.recent}</span>
                          </div>
                        </div>
                      </div>

                      {/* Engagement Statistics */}
                      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                          <TrendingUp className="w-5 h-5" />
                          Engagement Statistics
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Newsletter Subscribers</span>
                            <span className="font-semibold text-gray-900 dark:text-white">{analytics.subscribers.active} active</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600 dark:text-gray-400">New Subscribers (7 days)</span>
                            <span className="font-semibold text-primary-600 dark:text-primary-400">{analytics.subscribers.recent}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Contact Messages</span>
                            <span className="font-semibold text-gray-900 dark:text-white">{analytics.messages.total}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Messages (7 days)</span>
                            <span className="font-semibold text-primary-600 dark:text-primary-400">{analytics.messages.recent}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Quotation Requests</span>
                            <span className="font-semibold text-gray-900 dark:text-white">{analytics.quotations.total}</span>
                          </div>
                          <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                            <span className="text-gray-600 dark:text-gray-400">Quotations (7 days)</span>
                            <span className="font-semibold text-primary-600 dark:text-primary-400">{analytics.quotations.recent}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={fetchAnalytics}
                        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm flex items-center gap-2"
                      >
                        <Activity className="w-4 h-4" />
                        Refresh Analytics
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 mb-4">No analytics data available</p>
                    <button
                      onClick={fetchAnalytics}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm"
                    >
                      Load Analytics
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Site Configuration Tab */}
            {settingsTab === "site" && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    General Settings
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Site Name
                      </label>
                      <input
                        type="text"
                        defaultValue="Baho Coffee"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                        placeholder="Baho Coffee"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Site URL
                      </label>
                      <input
                        type="url"
                        defaultValue="https://bahocoffee.com"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                        placeholder="https://bahocoffee.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        defaultValue="bahocoffee@gmail.com"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                        placeholder="contact@bahocoffee.com"
                      />
                    </div>
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Email Configuration
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Service Provider
                      </label>
                      <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                        <option>Resend</option>
                        <option disabled>SendGrid (Coming Soon)</option>
                        <option disabled>Mailgun (Coming Soon)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        From Email Address
                      </label>
                      <input
                        type="email"
                        defaultValue="noreply@bahocoffee.com"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                        placeholder="noreply@bahocoffee.com"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="email-enabled"
                        defaultChecked
                        className="w-4 h-4 text-primary-600 rounded"
                      />
                      <label htmlFor="email-enabled" className="text-sm text-gray-700 dark:text-gray-300">
                        Enable email notifications
                      </label>
                    </div>
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                        Save Email Settings
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Security Settings
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">API Authentication</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Require authentication for admin API endpoints</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Rate Limiting</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Limit API requests per IP address</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                        Save Security Settings
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* System Information Tab */}
            {settingsTab === "system" && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    Database Status
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Database Connection</span>
                      <span className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">Connected</span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Database Type</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">PostgreSQL</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Tables Initialized</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">Yes</span>
                    </div>
                    <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={() => {
                          if (confirm("This will reinitialize all database tables. Continue?")) {
                            fetch("/api/admin/init-db").then(() => alert("Database initialized successfully!"));
                          }
                        }}
                        className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 text-sm"
                      >
                        Reinitialize Database
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Environment Status
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Email Service (Resend)</span>
                      <span className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">Check server logs</span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Database URL</span>
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">
                        Configured
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Environment</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        Production
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Info className="w-5 h-5" />
                    System Information
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Framework</span>
                      <span className="font-medium text-gray-900 dark:text-white">Next.js 15</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Runtime</span>
                      <span className="font-medium text-gray-900 dark:text-white">Node.js</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Deployment</span>
                      <span className="font-medium text-gray-900 dark:text-white">Vercel</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

