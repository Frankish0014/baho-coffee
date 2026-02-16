"use client";

import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import { PageAnimation, PageHeader } from "@/components/ui/PageAnimation";

export default function ContactPageClient() {
  return (
    <div className="pt-20 pb-20 bg-white dark:bg-gray-900 transition-colors duration-300 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          title="Contact Us"
          description="Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <PageAnimation direction="right" delay={0.2}>
            <ContactForm />
          </PageAnimation>
          <PageAnimation direction="left" delay={0.3}>
            <ContactInfo />
          </PageAnimation>
        </div>
      </div>
    </div>
  );
}

