import { useAppContext } from "../context/AppContext";
import { Mail, Phone, MapPin, Send, Linkedin } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";

export function Contact() {
  const { t } = useAppContext();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent! (Mock)");
    setFormData({ name: '', email: '', message: '' });
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
      title: "WhatsApp",
      value: "+62 896 4415 9951",
      link: "https://wa.me/6289644159951",
      color: "purple"
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      value: "Rommy Sulistio",
      link: "https://www.linkedin.com/in/rommy-sulistio-3a6676289",
      color: "sky"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Jawa Barat, Indonesia",
      link: null,
      color: "emerald"
    }
  ];

  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center py-10 px-4">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse delay-700"></div>
      </div>

      <div className="max-w-5xl w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            {t('contact')}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed">
            {t('contact_text')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Cards */}
          <div className="lg:col-span-5 space-y-4">
            {contactInfo.map((info, i) => {
              const Icon = info.icon;
              const CardContent = (
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="group flex items-center gap-6 p-6 rounded-3xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/20 dark:border-slate-800/50 shadow-xl shadow-slate-200/20 dark:shadow-none transition-all cursor-pointer"
                >
                  <div className={`p-4 rounded-2xl bg-${info.color}-500/10 text-${info.color}-500 group-hover:bg-${info.color}-500 group-hover:text-white transition-all duration-300 shadow-sm`}>
                    <Icon size={28} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">{info.title}</h3>
                    <p className="text-lg font-bold text-slate-900 dark:text-white truncate max-w-[200px] sm:max-w-full">{info.value}</p>
                  </div>
                </motion.div>
              );

              return info.link ? (
                <a key={i} href={info.link} target={info.link.startsWith('http') ? "_blank" : undefined} rel="noopener noreferrer">
                  {CardContent}
                </a>
              ) : (
                <div key={i}>{CardContent}</div>
              );
            })}
          </div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-7 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl rounded-[40px] p-8 lg:p-12 border border-white/40 dark:border-slate-800/50 shadow-2xl relative overflow-hidden"
          >
            {/* Subtle light effect inside the form */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl"></div>

            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-1">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-1">How can I help?</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-6 py-4 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none placeholder:text-slate-400"
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full flex justify-center items-center gap-3 py-5 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-blue-500/25 group"
              >
                <span>Send Message</span>
                <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}