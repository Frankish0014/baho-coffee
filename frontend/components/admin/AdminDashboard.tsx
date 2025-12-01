"use client";

import { useState, useEffect } from "react";
import { Coffee, MapPin, FileText, Image, Settings, Mail, Search, Calendar, User, MessageSquare, Building2, Phone, Globe, Receipt } from "lucide-react";

const menuItems = [
  { id: "messages", label: "Contact Messages", icon: Mail },
  { id: "quotations", label: "Quotation Requests", icon: Receipt },
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

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("quotations"); // Default to quotations
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [quotations, setQuotations] = useState<QuotationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (activeSection === "messages") {
      fetchSubmissions();
    } else if (activeSection === "quotations") {
      fetchQuotations();
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

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
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

        {activeSection === "products" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Manage Products</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Add, edit, or remove coffee products. Upload images, set pricing,
              and manage availability.
            </p>
            <button className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
              Add New Product
            </button>
          </div>
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
            <h2 className="text-2xl font-semibold mb-4">Settings</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Configure site settings, manage users, and view analytics.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

