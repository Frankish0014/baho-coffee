import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactInfo() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <MapPin className="w-6 h-6 text-primary-600 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">Address</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Kimihurura, Rugando,  Kigali, Rwanda
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <Phone className="w-6 h-6 text-primary-600 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">Phone</h3>
              <p className="text-gray-600 dark:text-gray-400">
                <a href="tel:+250788302976" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  +250 788 302 976
                </a>
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <Mail className="w-6 h-6 text-primary-600 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">Email</h3>
              <p className="text-gray-600 dark:text-gray-400">
                <a href="mailto:bahocoffee@gmail.com" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  bahocoffee@gmail.com
                </a>
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <Clock className="w-6 h-6 text-primary-600 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">Business Hours</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Monday - Friday: 8:00 AM - 5:00 PM
                <br />
                Saturday: 8:00 AM - 1:00 PM
                <br />
                Sunday: Not in office, But flexibly available.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <h3 className="font-semibold mb-2">For Export Inquiries</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          International buyers and importers, please visit our{" "}
          <a
            href="/export"
            className="text-primary-600 hover:underline"
          >
            Export Portal
          </a>{" "}
          or contact us directly.
        </p>
      </div>
    </div>
  );
}

