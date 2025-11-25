"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function WhatsAppButton() {
  const phoneNumber = "+250XXXXXXXXX"; // Replace with actual WhatsApp number
  const message = encodeURIComponent(
    "Hello! I'm interested in learning more about Baho Coffee."
  );
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, "")}?text=${message}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="ml-2 hidden sm:inline-block font-medium">
        Chat with us
      </span>
    </motion.a>
  );
}

