import { Metadata } from "next";
import Link from "next/link";
import { Shield, Lock, Eye, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Baho Coffee",
  description: "Baho Coffee's privacy policy. Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-20 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 md:p-12">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-8 h-8 text-primary-600" />
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Privacy Policy</h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>

          {/* Introduction */}
          <section className="mb-8">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              At Baho Coffee Company ("we," "our," or "us"), we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <FileText className="w-6 h-6 text-primary-600" />
              <span>1. Information We Collect</span>
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <div>
                <h3 className="font-semibold mb-2">1.1 Personal Information</h3>
                <p className="mb-2">We may collect the following personal information:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Name and contact information (email address, phone number, mailing address)</li>
                  <li>Company name and business information (for export inquiries)</li>
                  <li>Payment information (processed securely through third-party payment processors)</li>
                  <li>Shipping and delivery information</li>
                  <li>Communication preferences</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">1.2 Automatically Collected Information</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>IP address and browser type</li>
                  <li>Device information and operating system</li>
                  <li>Website usage data and analytics</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <Eye className="w-6 h-6 text-primary-600" />
              <span>2. How We Use Your Information</span>
            </h2>
            <p className="mb-3 text-gray-700 dark:text-gray-300">We use the collected information for the following purposes:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>To process and fulfill your orders and quotation requests</li>
              <li>To communicate with you about your inquiries, orders, and our services</li>
              <li>To send you marketing communications (with your consent)</li>
              <li>To improve our website, products, and services</li>
              <li>To comply with legal obligations and protect our rights</li>
              <li>To prevent fraud and ensure security</li>
              <li>To analyze website usage and trends</li>
            </ul>
          </section>

          {/* Data Protection */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <Lock className="w-6 h-6 text-primary-600" />
              <span>3. Data Protection and Security</span>
            </h2>
            <p className="mb-3 text-gray-700 dark:text-gray-300">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              We use industry-standard encryption technologies and secure payment processors to protect sensitive information, including payment details.
            </p>
          </section>

          {/* Data Sharing */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. Data Sharing and Disclosure</h2>
            <p className="mb-3 text-gray-700 dark:text-gray-300">We do not sell your personal information. We may share your information only in the following circumstances:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>With service providers who assist us in operating our website and conducting business (e.g., payment processors, email services, shipping companies)</li>
              <li>When required by law or to comply with legal processes</li>
              <li>To protect our rights, property, or safety, or that of our customers</li>
              <li>In connection with a business transfer or merger (with notice to you)</li>
            </ul>
          </section>

          {/* Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. Cookies and Tracking Technologies</h2>
            <p className="mb-3 text-gray-700 dark:text-gray-300">
              We use cookies and similar tracking technologies to enhance your experience on our website. You can control cookies through your browser settings, but disabling cookies may limit certain website functionality.
            </p>
          </section>

          {/* Your Rights */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. Your Rights</h2>
            <p className="mb-3 text-gray-700 dark:text-gray-300">You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>Access and receive a copy of your personal information</li>
              <li>Correct inaccurate or incomplete information</li>
              <li>Request deletion of your personal information</li>
              <li>Object to or restrict processing of your information</li>
              <li>Withdraw consent at any time (where applicable)</li>
              <li>Lodge a complaint with relevant data protection authorities</li>
            </ul>
          </section>

          {/* Data Retention */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. Data Retention</h2>
            <p className="text-gray-700 dark:text-gray-300">
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
            </p>
          </section>

          {/* International Transfers */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">8. International Data Transfers</h2>
            <p className="text-gray-700 dark:text-gray-300">
              As a coffee export company, your information may be transferred to and processed in countries outside of Rwanda. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.
            </p>
          </section>

          {/* Children's Privacy */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">9. Children's Privacy</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
            </p>
          </section>

          {/* Changes to Policy */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">10. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 dark:text-gray-300">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically.
            </p>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">11. Contact Us</h2>
            <p className="mb-3 text-gray-700 dark:text-gray-300">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
              <p className="font-semibold text-gray-900 dark:text-white mb-2">Baho Coffee Company</p>
              <p className="text-gray-700 dark:text-gray-300 mb-1">Kimihurura, Rugando, Kigali, Rwanda</p>
              <p className="text-gray-700 dark:text-gray-300 mb-1">Email: <a href="mailto:bahocoffee@gmail.com" className="text-primary-600 hover:underline">bahocoffee@gmail.com</a></p>
              <p className="text-gray-700 dark:text-gray-300">Phone: <a href="tel:+250788302976" className="text-primary-600 hover:underline">+250 788 302 976</a></p>
            </div>
          </section>

          {/* Back Link */}
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <Link
              href="/"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

