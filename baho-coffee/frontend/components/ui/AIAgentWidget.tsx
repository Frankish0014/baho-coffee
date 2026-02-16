"use client";

import { useState, useRef, useEffect } from "react";
import { X, Minimize2, Maximize2, Send, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const QUICK_QUESTIONS = [
  "What products do you have?",
  "Tell me about your washing stations",
  "How can I place an order?",
  "Do you ship internationally?",
];

export default function AIAgentWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm Baho Coffee's assistant. I can help you learn about our Rwandan specialty coffee, answer questions about our products, washing stations, or help you with orders. How can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickQuestions, setShowQuickQuestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const toggleWidget = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
      // Reset quick questions when reopening (if only initial message exists)
      if (messages.length === 1) {
        setShowQuickQuestions(true);
      }
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const getAIResponse = async (userMessage: string): Promise<string> => {
    try {
      // Try to use real AI API first
      const conversationHistory = messages
        .filter((msg) => msg.role !== "assistant" || msg.id !== "1") // Exclude initial greeting
        .map((msg) => ({
          role: msg.role,
          content: msg.content,
        }));

      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: conversationHistory,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (!data.fallback && data.response) {
          return data.response;
        }
        // If fallback, continue to rule-based responses
      }
    } catch (error) {
      console.error("Error calling AI API:", error);
      // Fall through to rule-based responses
    }

    // Fallback: Rule-based responses for common questions
    const lowerMessage = userMessage.toLowerCase();

    // Product questions
    if (lowerMessage.includes("product") || lowerMessage.includes("coffee") || lowerMessage.includes("variety")) {
      return "We offer a variety of specialty coffees from Rwanda, including washed, natural, and honey processed coffees. Our products come from washing stations like Humure, Fugi, Gitoki, and more. Each coffee has unique flavor notes and profiles. Would you like to know about a specific product or processing method?";
    }

    // Washing station questions
    if (lowerMessage.includes("washing station") || lowerMessage.includes("station") || lowerMessage.includes("farm")) {
      return "We work with several washing stations across Rwanda, including Humure CWS, Fugi CWS, Gitoki CWS, and many others. Each station is located in different regions of Rwanda and produces unique coffee profiles. Would you like information about a specific washing station?";
    }

    // Order/Purchase questions
    if (lowerMessage.includes("order") || lowerMessage.includes("buy") || lowerMessage.includes("purchase") || lowerMessage.includes("price")) {
      return "You can place orders through our Digital Sales portal. We offer various packaging options (250g, 500g, 1kg) and accept both card payments and bank transfers. Would you like me to direct you to our sales page, or do you have questions about pricing?";
    }

    // Sample questions
    if (lowerMessage.includes("sample") || lowerMessage.includes("try")) {
      return "Yes! You can request samples of our coffees. Visit any product page and click the 'Request a Sample' button. Fill out the form with your details, and we'll get back to you soon.";
    }

    // Contact questions
    if (lowerMessage.includes("contact") || lowerMessage.includes("email") || lowerMessage.includes("phone") || lowerMessage.includes("reach")) {
      return "You can contact us through our contact page, via email at info@bahocoffee.com, or through WhatsApp. Our team is here to help with any inquiries about our coffee, partnerships, or orders.";
    }

    // Location/Origin questions
    if (lowerMessage.includes("rwanda") || lowerMessage.includes("where") || lowerMessage.includes("origin") || lowerMessage.includes("location")) {
      return "All our coffee is sourced from Rwanda, known for producing exceptional specialty coffee. Our washing stations are located across different regions of Rwanda, each with unique terroir that influences the coffee's flavor profile. Rwanda's high altitude, volcanic soil, and ideal climate create perfect conditions for growing specialty coffee.";
    }

    // Export/Business questions
    if (lowerMessage.includes("export") || lowerMessage.includes("business") || lowerMessage.includes("wholesale") || lowerMessage.includes("roaster") || lowerMessage.includes("partnership")) {
      return "We welcome partnerships with roasters and businesses worldwide. For export inquiries and quotations, please visit our Export Portal where you can submit a quotation request. We'll respond with detailed information about our available coffees, pricing, and export terms.";
    }

    // Sustainability questions
    if (lowerMessage.includes("sustainable") || lowerMessage.includes("environment") || lowerMessage.includes("organic") || lowerMessage.includes("certification")) {
      return "We are committed to sustainable and ethical coffee production. We work closely with smallholder farmers and washing stations that follow sustainable practices. Many of our coffees come from certified farms. You can learn more about our sustainability efforts on our About page.";
    }

    // Shipping questions
    if (lowerMessage.includes("shipping") || lowerMessage.includes("delivery") || lowerMessage.includes("ship")) {
      return "We ship our coffee worldwide. Shipping options and rates depend on your location and order size. When you proceed to checkout, you'll see available shipping options. For large orders or special requirements, please contact us directly.";
    }

    // Greeting responses
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey") || lowerMessage.includes("good morning") || lowerMessage.includes("good afternoon")) {
      return "Hello! Welcome to Baho Coffee. I'm here to help you learn about our Rwandan specialty coffee. What would you like to know?";
    }

    // Thank you responses
    if (lowerMessage.includes("thank") || lowerMessage.includes("thanks")) {
      return "You're welcome! Is there anything else I can help you with?";
    }

    // Default response
    return "Thank you for your question! I'm here to help with information about our coffee products, washing stations, orders, and more. Could you provide a bit more detail, or would you like me to direct you to a specific section of our website?";
  };

  const sendMessage = async (messageToSend: string) => {
    if (!messageToSend || isLoading) return;

    setInput("");
    setShowQuickQuestions(false); // Hide quick questions after first message
    
    // Add user message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageToSend,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      // Get AI response (includes API call or rule-based)
      const response = await getAIResponse(messageToSend);

      // Add assistant response
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I apologize, but I'm having trouble processing your request right now. Please try again, or contact us directly at info@bahocoffee.com for assistance.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (input.trim()) {
      await sendMessage(input.trim());
    }
  };

  const handleQuickQuestion = (question: string) => {
    sendMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={toggleWidget}
        className={`fixed bottom-24 left-6 z-50 bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group ${
          isOpen ? "hidden" : ""
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open Ask Baho Coffee"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="relative w-6 h-6">
          <Image
            src="/hero/logo.avif"
            alt="Baho Coffee Logo"
            fill
            className="object-contain brightness-0 invert"
          />
        </div>
        <span className="ml-2 hidden sm:inline-block font-medium">
          Ask Baho
        </span>
      </motion.button>

      {/* AI Agent Widget Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className={`fixed bottom-24 left-6 z-50 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col ${
              isMinimized
                ? "w-80 h-16"
                : "w-[90vw] sm:w-[500px] h-[70vh] sm:h-[600px] max-w-[500px]"
            }`}
          >
            {/* Header */}
            <div className="bg-primary-600 text-white p-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center space-x-2">
                <div className="relative w-5 h-5">
                  <Image
                    src="/hero/logo.avif"
                    alt="Baho Coffee Logo"
                    fill
                    className="object-contain brightness-0 invert"
                  />
                </div>
                <h3 className="font-semibold text-sm sm:text-base">
                  Ask Baho Coffee
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleMinimize}
                  className="p-1.5 hover:bg-primary-700 rounded-lg transition-colors"
                  aria-label={isMinimized ? "Maximize" : "Minimize"}
                >
                  {isMinimized ? (
                    <Maximize2 className="w-4 h-4" />
                  ) : (
                    <Minimize2 className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={toggleWidget}
                  className="p-1.5 hover:bg-primary-700 rounded-lg transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            {!isMinimized && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex-1 flex flex-col overflow-hidden"
              >
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                          message.role === "user"
                            ? "bg-primary-600 text-white"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-2">
                        <Loader2 className="w-5 h-5 animate-spin text-primary-600" />
                      </div>
                    </div>
                  )}
                  
                  {/* Quick Questions - Show only when no user messages yet (except initial greeting) */}
                  {showQuickQuestions && messages.length === 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-2"
                    >
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-2">
                        Quick questions:
                      </p>
                      <div className="flex flex-col gap-2">
                        {QUICK_QUESTIONS.map((question, index) => (
                          <motion.button
                            key={index}
                            onClick={() => handleQuickQuestion(question)}
                            disabled={isLoading}
                            className="text-left px-4 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 rounded-xl text-sm transition-colors border border-gray-200 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {question}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex-shrink-0">
                  <div className="flex items-center space-x-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything about our coffee..."
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                      disabled={isLoading}
                    />
                    <button
                      onClick={handleSend}
                      disabled={!input.trim() || isLoading}
                      className="bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
                      aria-label="Send message"
                    >
                      {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                    Ask about our products, washing stations, orders, or anything else!
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
