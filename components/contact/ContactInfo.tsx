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
                Kigali, Rwanda
                <br />
                (Office address to be added)
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <Phone className="w-6 h-6 text-primary-600 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">Phone</h3>
              <p className="text-gray-600 dark:text-gray-400">
                +250 XXX XXX XXX
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <Mail className="w-6 h-6 text-primary-600 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">Email</h3>
              <p className="text-gray-600 dark:text-gray-400">
                info@bahocoffee.com
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <Clock className="w-6 h-6 text-primary-600 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">Business Hours</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Monday - Friday: 9:00 AM - 5:00 PM
                <br />
                Saturday: 9:00 AM - 1:00 PM
                <br />
                Sunday: Closed
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

