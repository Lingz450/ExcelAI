"use client";

import { Mail, MessageSquare, Send } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      // TODO: Send to API
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Message sent! We'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Get in Touch
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Have questions? We'd love to hear from you.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <Mail className="h-8 w-8 text-excel-green mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Email Us</h3>
            <p className="text-gray-600 dark:text-gray-400">support@excelai.com</p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <MessageSquare className="h-8 w-8 text-excel-green mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Live Chat</h3>
            <p className="text-gray-600 dark:text-gray-400">Available Mon-Fri, 9AM-5PM EST</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-excel-green outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-excel-green outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Subject
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-excel-green outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Message
              </label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-excel-green outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full px-6 py-3 bg-excel-green hover:bg-excel-darkgreen disabled:bg-gray-300 text-white rounded-lg font-semibold transition-all flex items-center justify-center space-x-2"
            >
              {sending ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}


