import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { PageTransition } from '../../components/PageTransition/PageTransition';
import { api } from '../../services/api';
import { ContactPayload } from '../../data/projects';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactPayload>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.name.trim()) {
      errs.name = 'Please enter your name';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      errs.phone = 'Please enter your mobile number';
    }

    if (!formData.message.trim()) {
      errs.message = 'Please enter your message';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await api.sendContact(formData);
      setSubmitSuccess(response.message || 'Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
      setErrors({});
    } catch (err: any) {
      setErrorMessage(err.message || 'Unable to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    const phone = '919847012345';
    const text = encodeURIComponent(
      `Hello TechPlus Architecture,\n\nName: ${formData.name || 'Client'}\nEmail: ${formData.email || ''}\nMessage: ${formData.message || 'I would like to inquire about architectural services.'}`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  return (
    <PageTransition>
      <section className="pt-36 sm:pt-44 pb-28 px-6 sm:px-10 lg:px-16 bg-white min-h-[90vh]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Information */}
            <div className="lg:col-span-5 space-y-6 pt-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-black leading-tight">
                TECHPLUS<br />ARCHITECTURE
              </h1>

              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                We'd love to hear from you. Whether you have a question about our services, pricing, or anything else, our team is ready to answer all your questions.
              </p>

              <div className="space-y-4 pt-4 text-sm text-black">
                <div>
                  <h3 className="font-bold text-black">Locations</h3>
                  <p className="text-neutral-600">Kochi, Thrissur, Bangalore</p>
                </div>

                <div>
                  <h3 className="font-bold text-black">Email</h3>
                  <a
                    href="mailto:hello@techplus.com"
                    className="text-neutral-600 hover:text-black transition-colors"
                  >
                    hello@techplus.com
                  </a>
                </div>

                <div>
                  <h3 className="font-bold text-black">Phone</h3>
                  <a
                    href="tel:+919847012345"
                    className="text-neutral-600 hover:text-black transition-colors"
                  >
                    +91 98470 12345
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Clean Form */}
            <div className="lg:col-span-7">
              <AnimatePresence>
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mb-6 p-4 rounded-md bg-neutral-900 text-white flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <span>{submitSuccess}</span>
                    </div>
                    <button
                      onClick={() => setSubmitSuccess(null)}
                      className="text-xs text-neutral-300 hover:text-white underline ml-4"
                    >
                      Dismiss
                    </button>
                  </motion.div>
                )}

                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mb-6 p-4 rounded-md bg-red-50 text-red-700 border border-red-200 text-sm"
                  >
                    {errorMessage}
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-black mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className={`w-full px-3.5 py-2.5 rounded-sm border ${
                      errors.name ? 'border-red-500' : 'border-neutral-300'
                    } text-black text-sm focus:outline-none focus:border-black bg-white transition-colors`}
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-black mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className={`w-full px-3.5 py-2.5 rounded-sm border ${
                      errors.email ? 'border-red-500' : 'border-neutral-300'
                    } text-black text-sm focus:outline-none focus:border-black bg-white transition-colors`}
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-sm font-medium text-black mb-1.5">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className={`w-full px-3.5 py-2.5 rounded-sm border ${
                      errors.phone ? 'border-red-500' : 'border-neutral-300'
                    } text-black text-sm focus:outline-none focus:border-black bg-white transition-colors`}
                  />
                  {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-black mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your project..."
                    className={`w-full px-3.5 py-2.5 rounded-sm border ${
                      errors.message ? 'border-red-500' : 'border-neutral-300'
                    } text-black text-sm focus:outline-none focus:border-black bg-white transition-colors resize-y`}
                  />
                  {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
                </div>

                {/* Buttons Row: Send Message & WhatsApp */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-md bg-[#224436] hover:bg-[#1b362b] text-white text-sm font-medium transition-colors shadow-sm disabled:opacity-60"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppClick}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm font-medium transition-colors shadow-sm"
                  >
                    {/* WhatsApp Icon */}
                    <svg
                      className="w-4 h-4 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                    <span>WhatsApp</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};
