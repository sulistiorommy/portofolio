import { useAppContext } from "../context/AppContext";
import { Mail, Phone, MapPin, Send, Linkedin } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";

export function Contact() {
  const { t } = useAppContext();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'success' | 'error' | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const formId = import.meta.env.VITE_FORMSPREE_ID;

    if (!formId || formId === 'your_form_id_here') {
      alert("Error: Formspree ID is not configured in .env file.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "sulistiorommy@gmail.com",
      link: "mailto:sulistiorommy@gmail.com",
      color: "blue"
    },
    {
      icon: Phone,
      title: t('contact_whatsapp'),
      value: "+62 896 4415 9951",
      link: "https://wa.me/6289644159951",
      color: "purple"
    },
    {
      icon: Linkedin,
      title: t('contact_linkedin'),
      value: "Rommy Sulistio",
      link: "https://www.linkedin.com/in/rommy-sulistio-3a6676289",
      color: "sky"
    },
    {
      icon: MapPin,
      title: t('contact_location'),
      value: "Jawa Barat, Indonesia",
      link: null,
      color: "emerald"
    }
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start pt-10 pb-20 px-4 overflow-hidden">
      {/* Optimized Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-left mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
            {t('contact')}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl leading-relaxed">
            {t('contact_text')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            {contactInfo.map((info, i) => {
              const Icon = info.icon;

              const colorClasses: Record<string, string> = {
                blue: "bg-blue-500/10 text-blue-500 group-hover:bg-blue-500",
                purple: "bg-purple-500/10 text-purple-500 group-hover:bg-purple-500",
                sky: "bg-sky-500/10 text-sky-500 group-hover:bg-sky-500",
                emerald: "bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500",
              };

              const CardContent = (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  className="group flex items-center gap-6 p-6 rounded-[28px] bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/20 dark:border-slate-800/50 shadow-xl transition-all cursor-pointer will-change-transform"
                >
                  <div className={`p-4 rounded-2xl transition-all duration-300 group-hover:text-white ${colorClasses[info.color]}`}>
                    <Icon size={28} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-1">{info.title}</h3>
                    <p className="text-lg font-bold text-slate-900 dark:text-white break-words lg:truncate transition-colors">{info.value}</p>
                  </div>
                </motion.div>
              );

              return info.link ? (
                <a key={i} href={info.link} target={info.link.startsWith('http') ? "_blank" : undefined} rel="noopener noreferrer" className="block">
                  {CardContent}
                </a>
              ) : (
                <div key={i}>{CardContent}</div>
              );
            })}
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-7 bg-white/40 dark:bg-slate-900/50 backdrop-blur-md rounded-[40px] p-8 md:p-10 border border-white/20 dark:border-slate-800/40 shadow-2xl relative"
          >
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-20"
              >
                <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mb-6">
                  <span className="text-4xl font-bold">✓</span>
                </div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">{t('contact_success_title')}</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-sm">
                  {t('contact_success_text')}
                </p>
                <button
                  onClick={() => setStatus(null)}
                  className="px-8 py-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  {t('contact_send_another')}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 ml-2">{t('contact_name_label')}</label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/30 text-slate-900 dark:text-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                      placeholder={t('contact_name_placeholder')}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 ml-2">{t('contact_email_label')}</label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/30 text-slate-900 dark:text-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                      placeholder={t('contact_email_placeholder')}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 ml-2">{t('contact_message_label')}</label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/30 text-slate-900 dark:text-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all resize-none placeholder:text-slate-400"
                    placeholder={t('contact_message_placeholder')}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center items-center gap-3 py-5 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl font-black transition-all shadow-xl shadow-blue-500/20 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>{t('contact_sending_button')}</span>
                    </div>
                  ) : (
                    <>
                      <span>{t('contact_send_button')}</span>
                      <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </motion.button>

                {status === 'error' && (
                  <p className="text-center text-red-500 text-sm font-bold">
                    {t('contact_error_text')}
                  </p>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}