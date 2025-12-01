import { Metadata } from "next";
import Link from "next/link";
import { Award, CheckCircle, Leaf, Users, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Certifications & Standards | Baho Coffee",
  description: "Learn about Baho Coffee's certifications, quality standards, and commitment to sustainable and ethical coffee production.",
};

export default function CertificationsPage() {
  const certifications = [
    {
      title: "Specialty Coffee Association (SCA) Standards",
      description: "All our coffees meet and exceed SCA specialty coffee standards, scoring 80+ points in cupping evaluations.",
      icon: Award,
    },
    {
      title: "Fair Trade Practices",
      description: "We are committed to fair trade principles, ensuring farmers receive fair compensation for their high-quality coffee.",
      icon: Users,
    },
    {
      title: "Organic & Sustainable Farming",
      description: "Many of our washing stations practice organic and sustainable farming methods, protecting the environment and soil health.",
      icon: Leaf,
    },
    {
      title: "Traceability & Transparency",
      description: "Every batch of coffee is traceable to its origin, washing station, and farmer groups, ensuring complete transparency.",
      icon: CheckCircle,
    },
    {
      title: "Rwanda Revenue Authority Compliance",
      description: "All exports comply with RRA regulations and international trade standards, with proper documentation and certification.",
      icon: Globe,
    },
  ];

  const qualityStandards = [
    "SCA Cupping Score: 80+ points (Specialty Grade)",
    "Moisture Content: 10-12% (Optimal)",
    "Density: High altitude grown (1500-2200m)",
    "Defect Count: Zero primary defects",
    "Screen Size: Consistent grading (15-18)",
    "Flavor Profile: Clean, complex, and distinctive",
  ];

  return (
    <div className="pt-20 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 md:p-12">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Award className="w-8 h-8 text-primary-600" />
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Certifications & Standards</h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Our commitment to quality, sustainability, and ethical practices
            </p>
          </div>

          {/* Introduction */}
          <section className="mb-8">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              At Baho Coffee Company, we are committed to producing and exporting the highest quality specialty coffee while maintaining the highest standards of sustainability, ethical practices, and transparency. Our certifications and standards reflect our dedication to excellence and our responsibility to farmers, communities, and the environment.
            </p>
          </section>

          {/* Certifications Grid */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Our Certifications & Commitments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certifications.map((cert, index) => {
                const Icon = cert.icon;
                return (
                  <div
                    key={index}
                    className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <Icon className="w-8 h-8 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {cert.title}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                          {cert.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Quality Standards */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Quality Standards</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              All our coffees meet strict quality standards to ensure consistency and excellence:
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {qualityStandards.map((standard, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{standard}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Processing Standards */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Processing Standards</h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <div>
                <h3 className="font-semibold mb-2">Washed Process</h3>
                <p className="mb-2">Our washed coffees undergo meticulous processing:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Cherry selection and sorting</li>
                  <li>Pulping within 12 hours of harvest</li>
                  <li>Fermentation in clean water (12-48 hours)</li>
                  <li>Washing and grading</li>
                  <li>Drying on raised beds (10-15 days)</li>
                  <li>Hulling and final sorting</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Natural Process</h3>
                <p className="mb-2">Natural processed coffees follow strict protocols:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Selective cherry picking</li>
                  <li>Careful drying on raised beds</li>
                  <li>Regular turning for even drying</li>
                  <li>Protection from rain and moisture</li>
                  <li>Optimal moisture content monitoring</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Honey Process</h3>
                <p className="mb-2">Honey processed coffees combine precision and care:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Partial pulping with mucilage retention</li>
                  <li>Controlled drying process</li>
                  <li>Regular monitoring and turning</li>
                  <li>Consistent quality control</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Documentation */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Documentation & Certificates</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              With every export, we provide comprehensive documentation:
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Certificate of Origin</strong> - Official documentation of coffee origin</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Quality Analysis Report</strong> - Detailed cupping notes and quality metrics</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Traceability Documentation</strong> - Complete chain of custody from farm to export</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Export Permits</strong> - All required RRA export documentation</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Shipping Documents</strong> - Bill of Lading, packing lists, and customs documentation</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Sustainability */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <Leaf className="w-6 h-6 text-primary-600" />
              <span>Sustainability & Environmental Commitment</span>
            </h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              <p>
                We are committed to sustainable coffee production that protects the environment and supports long-term agricultural viability:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Water conservation and wastewater management at washing stations</li>
                <li>Organic waste composting and recycling</li>
                <li>Shade-grown coffee practices where applicable</li>
                <li>Soil conservation and erosion prevention</li>
                <li>Biodiversity protection in coffee-growing regions</li>
                <li>Reduced use of chemical inputs</li>
                <li>Renewable energy where possible</li>
              </ul>
            </div>
          </section>

          {/* Social Responsibility */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <Users className="w-6 h-6 text-primary-600" />
              <span>Social Responsibility</span>
            </h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              <p>Our commitment extends to the communities we work with:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Fair pricing for farmers and cooperatives</li>
                <li>Support for women in coffee programs</li>
                <li>Community development initiatives</li>
                <li>Education and training programs</li>
                <li>Healthcare support for farming communities</li>
                <li>Transparent and ethical business practices</li>
              </ul>
            </div>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Request Certificates</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              For specific certification documents or additional information about our standards, please contact us:
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

