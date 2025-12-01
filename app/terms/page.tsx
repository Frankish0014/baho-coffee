import { Metadata } from "next";
import Link from "next/link";
import { Scale, FileCheck, AlertCircle, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | Baho Coffee",
  description: "Terms of service and conditions for using Baho Coffee's website and services.",
};

export default function TermsOfServicePage() {
  return (
    <div className="pt-20 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 md:p-12">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Scale className="w-8 h-8 text-primary-600" />
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Terms of Service</h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>

          {/* Introduction */}
          <section className="mb-8">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Welcome to Baho Coffee Company ("we," "our," or "us"). These Terms of Service ("Terms") govern your access to and use of our website, services, and products. By accessing or using our services, you agree to be bound by these Terms.
            </p>
          </section>

          {/* Acceptance */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <CheckCircle className="w-6 h-6 text-primary-600" />
              <span>1. Acceptance of Terms</span>
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              By accessing this website or using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, please do not use our services.
            </p>
          </section>

          {/* Services */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. Our Services</h2>
            <p className="mb-3 text-gray-700 dark:text-gray-300">Baho Coffee Company provides:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>Specialty coffee export services</li>
              <li>Online information about our products and washing stations</li>
              <li>Quotation request services for international buyers</li>
              <li>Contact and communication services</li>
              <li>Digital sales platform (where applicable)</li>
            </ul>
          </section>

          {/* Use of Website */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. Use of Website</h2>
            <p className="mb-3 text-gray-700 dark:text-gray-300">You agree to use our website only for lawful purposes and in accordance with these Terms. You agree not to:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>Use the website in any way that violates applicable laws or regulations</li>
              <li>Attempt to gain unauthorized access to any part of the website</li>
              <li>Transmit any viruses, malware, or harmful code</li>
              <li>Use automated systems to access the website without permission</li>
              <li>Reproduce, duplicate, or copy any content without authorization</li>
              <li>Interfere with or disrupt the website or servers</li>
            </ul>
          </section>

          {/* Orders and Quotations */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <FileCheck className="w-6 h-6 text-primary-600" />
              <span>4. Orders and Quotation Requests</span>
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <div>
                <h3 className="font-semibold mb-2">4.1 Quotation Requests</h3>
                <p className="mb-2">When you submit a quotation request:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>All information provided must be accurate and complete</li>
                  <li>Quotations are subject to availability and market conditions</li>
                  <li>Prices are valid for the period specified in the quotation</li>
                  <li>We reserve the right to decline any quotation request</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">4.2 Orders</h3>
                <p className="mb-2">For orders placed through our platform:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>All orders are subject to acceptance and availability</li>
                  <li>We reserve the right to cancel orders at our discretion</li>
                  <li>Payment terms will be specified at the time of order</li>
                  <li>Shipping and delivery terms are subject to agreement</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Pricing and Payment */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. Pricing and Payment</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>All prices are in USD unless otherwise specified</li>
              <li>Prices are subject to change without notice</li>
              <li>Payment must be made according to agreed terms</li>
              <li>We accept payment through secure payment processors</li>
              <li>Bank transfer options are available for bulk orders</li>
              <li>All payments are processed securely</li>
            </ul>
          </section>

          {/* Shipping and Delivery */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. Shipping and Delivery</h2>
            <p className="mb-3 text-gray-700 dark:text-gray-300">
              Shipping terms, delivery times, and costs will be specified in your quotation or order confirmation. Standard terms include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>FOB (Free On Board) Kigali, Rwanda (standard)</li>
              <li>Alternative Incoterms available upon request</li>
              <li>Delivery times depend on order size and destination</li>
              <li>Risk transfers according to agreed Incoterms</li>
              <li>All exports comply with Rwanda Revenue Authority regulations</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. Intellectual Property</h2>
            <p className="mb-3 text-gray-700 dark:text-gray-300">
              All content on this website, including text, graphics, logos, images, and software, is the property of Baho Coffee Company or its licensors and is protected by copyright and other intellectual property laws.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              You may not reproduce, distribute, modify, or create derivative works from any content without our express written permission.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <AlertCircle className="w-6 h-6 text-primary-600" />
              <span>8. Limitation of Liability</span>
            </h2>
            <p className="mb-3 text-gray-700 dark:text-gray-300">
              To the maximum extent permitted by law, Baho Coffee Company shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Our total liability for any claims arising from your use of our services shall not exceed the amount you paid to us in the twelve (12) months preceding the claim.
            </p>
          </section>

          {/* Force Majeure */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">9. Force Majeure</h2>
            <p className="text-gray-700 dark:text-gray-300">
              We shall not be liable for any failure or delay in performance due to circumstances beyond our reasonable control, including but not limited to natural disasters, war, terrorism, government actions, pandemics, or market disruptions.
            </p>
          </section>

          {/* Governing Law */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">10. Governing Law</h2>
            <p className="text-gray-700 dark:text-gray-300">
              These Terms shall be governed by and construed in accordance with the laws of Rwanda. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of Rwanda.
            </p>
          </section>

          {/* Changes to Terms */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">11. Changes to Terms</h2>
            <p className="text-gray-700 dark:text-gray-300">
              We reserve the right to modify these Terms at any time. We will notify you of any material changes by posting the updated Terms on this page and updating the "Last updated" date. Your continued use of our services after such changes constitutes acceptance of the modified Terms.
            </p>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">12. Contact Us</h2>
            <p className="mb-3 text-gray-700 dark:text-gray-300">
              If you have any questions about these Terms of Service, please contact us:
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

