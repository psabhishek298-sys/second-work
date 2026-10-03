import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, MessageSquare, ArrowRight, MapPin, CheckCircle2 } from 'lucide-react';
import { PageTransition } from '../../components/PageTransition/PageTransition';
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
      const { createEnquiryDB } = await import('../../services/adminService');
      const success = await createEnquiryDB(formData);
      if (success) {
        setSubmitSuccess('Thank you! Your inquiry has been submitted successfully.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
        });
        setErrors({});
      } else {
        throw new Error('Could not submit inquiry');
      }
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
      <div className="bg-[#F5F4F0] text-[#141412] min-h-screen relative overflow-hidden font-sans selection:bg-black selection:text-white">
        
        {/* Background Architectural Villa Image */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <img
            src="/photos/portimg.png"
            alt="TechPlus Architecture Hero"
            className="absolute right-0 top-0 h-full w-full object-cover object-right-top opacity-90"
          />
          {/* Left blend gradient */}
          <div className="absolute inset-y-0 left-0 w-full lg:w-[50%] bg-gradient-to-r from-[#F5F4F0] via-[#F5F4F0]/95 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#F5F4F0] to-transparent" />
        </div>

        {/* Main Content Section */}
        <section className="relative z-10 pt-32 sm:pt-40 pb-20 px-6 sm:px-10 lg:px-16 min-h-[90vh] flex items-center">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Heading & Contact Info */}
            <div className="lg:col-span-6 space-y-8">
              <div className="flex items-center gap-3">
                <div className="h-[1px] w-12 bg-[#141412]/30" />
              </div>

              <div>
                <h1 className="font-display tracking-tight text-black text-5xl sm:text-7xl lg:text-8xl font-light leading-[0.98]">
                  <span className="font-city">Let's build</span><br />
                  <span className="font-city">build</span><br />
                  <span className="text-[#8A8980] font-light  font-city block">meaningful.</span>
                </h1>
              </div>

              <p className="text-base sm:text-lg text-[#6E6E65] font-light max-w-md leading-relaxed">
                We'd love to hear from you. Whether you have a question about our services, a project in mind, or anything else, our team is ready to help.
              </p>

              {/* Quick Contact Info */}
              <div className="space-y-5 pt-4 text-sm">
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-black/5 flex items-center justify-center text-[#141412] mt-0.5 flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#141412] text-sm">Location</h3>
                    <p className="text-[#6E6E65] text-xs sm:text-sm font-light">Munduparamba, Malappuram, Keralam 676509</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-black/5 flex items-center justify-center text-[#141412] mt-0.5 flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#141412] text-sm">Email</h3>
                    <a
                      href="mailto:hello@techplus.com"
                      className="text-[#6E6E65] hover:text-black transition-colors text-xs sm:text-sm font-light"
                    >
                      hello@techplus.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-black/5 flex items-center justify-center text-[#141412] mt-0.5 flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#141412] text-sm">Phone</h3>
                    <a
                      href="tel:+919847012345"
                      className="text-[#6E6E65] hover:text-black transition-colors text-xs sm:text-sm font-light"
                    >
                      +91 98470 12345
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Floating Form Card */}
            <div className="lg:col-span-6">
              <div className="bg-[#F5F4F0]/85 backdrop-blur-xl border border-white/80 p-8 sm:p-10 rounded-3xl shadow-2xl space-y-6">
                
                {/* Form Card Header */}
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-xs tracking-widest text-[#73736C] uppercase font-medium">
                    SEND US A MESSAGE
                  </span>
                  <div className="h-[1px] w-12 bg-[#141412]/30" />
                </div>

                <AnimatePresence>
                  {submitSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-4 rounded-xl bg-black text-white flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>{submitSuccess}</span>
                      </div>
                      <button
                        onClick={() => setSubmitSuccess(null)}
                        className="text-[10px] text-neutral-300 hover:text-white underline ml-2"
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
                      className="p-4 rounded-xl bg-red-50 text-red-700 border border-red-200 text-xs"
                    >
                      {errorMessage}
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono tracking-wider uppercase text-[#141412] font-semibold">
                      Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8980]" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                          errors.name ? 'border-red-500' : 'border-black/10'
                        } text-black text-sm focus:outline-none focus:border-black bg-white/70 transition-all placeholder:text-[#9E9D95]`}
                      />
                    </div>
                    {errors.name && <p className="text-[11px] text-red-600 font-mono">{errors.name}</p>}
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono tracking-wider uppercase text-[#141412] font-semibold">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8980]" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                          errors.email ? 'border-red-500' : 'border-black/10'
                        } text-black text-sm focus:outline-none focus:border-black bg-white/70 transition-all placeholder:text-[#9E9D95]`}
                      />
                    </div>
                    {errors.email && <p className="text-[11px] text-red-600 font-mono">{errors.email}</p>}
                  </div>

                  {/* Mobile Number Input */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono tracking-wider uppercase text-[#141412] font-semibold">
                      Mobile Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8980]" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                          errors.phone ? 'border-red-500' : 'border-black/10'
                        } text-black text-sm focus:outline-none focus:border-black bg-white/70 transition-all placeholder:text-[#9E9D95]`}
                      />
                    </div>
                    {errors.phone && <p className="text-[11px] text-red-600 font-mono">{errors.phone}</p>}
                  </div>

                  {/* Message Input */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono tracking-wider uppercase text-[#141412] font-semibold">
                      Message
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-[#8A8980]" />
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your project..."
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                          errors.message ? 'border-red-500' : 'border-black/10'
                        } text-black text-sm focus:outline-none focus:border-black bg-white/70 transition-all resize-none placeholder:text-[#9E9D95]`}
                      />
                    </div>
                    {errors.message && <p className="text-[11px] text-red-600 font-mono">{errors.message}</p>}
                  </div>

                  {/* Buttons Row */}
                  <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-xl bg-[#141412] hover:bg-black text-white text-xs font-mono tracking-widest uppercase font-semibold transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={handleWhatsAppClick}
                      className="w-full py-3.5 px-6 rounded-xl bg-white/90 border border-black/15 hover:bg-white text-black text-xs font-mono tracking-widest uppercase font-semibold transition-all shadow-sm flex items-center justify-center gap-2"
                    >
                      {/* WhatsApp Icon */}
                      <svg className="w-4 h-4 fill-current text-[#25D366]" viewBox="0 0 24 24">
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

        {/* Google Maps Section */}
        <section className="relative z-10 pb-24 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
          <div className="bg-white/80 backdrop-blur-md border border-black/10 rounded-3xl p-4 sm:p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2">
              <div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-black flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-black" />
                  <span>Visit Our Studio</span>
                </h2>
                <p className="text-xs sm:text-sm text-[#6E6E65] mt-0.5">
                  Techno + Associates, Munduparamba, Malappuram, Keralam 676509
                </p>
              </div>
              <a
                href="https://www.google.com/maps/place/Techno+%2B+Associates/@11.0505832,76.0931171,909m/data=!3m1!1e3!4m14!1m7!3m6!1s0x3ba63522ec3ef783:0x6eb96efac027126b!2sTechno+%2B+Associates!8m2!3d11.0505832!4d76.0931171!16s%2Fg%2F11k4lrhrmd!3m5!1s0x3ba63522ec3ef783:0x6eb96efac027126b!8m2!3d11.0505832!4d76.0931171!16s%2Fg%2F11k4lrhrmd?hl=en&entry=ttu&g_ep=EgoyMDI2MDkzMC4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#141412] hover:bg-black text-white text-xs font-mono tracking-wider uppercase font-semibold px-5 py-2.5 rounded-xl transition-all shadow-sm shrink-0"
              >
                <span>Open in Google Maps</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Embedded Google Map iframe */}
            <div className="w-full h-[380px] sm:h-[450px] rounded-2xl overflow-hidden border border-black/10 relative shadow-inner bg-neutral-100">
              <iframe
                title="Techno + Associates Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.146243888364!2d76.09054217590855!3d11.050583189115048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba63522ec3ef783%3A0x6eb96efac027126b!2sTechno%20%2B%20Associates!5e0!3m2!1sen!2sin!4v1712000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>

      </div>
    </PageTransition>
  );
};
