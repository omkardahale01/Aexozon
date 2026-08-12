import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin, Linkedin, Github, Twitter, CheckCircle, AlertCircle, Loader2, MessageCircle, Clock, Shield, Sparkles, ChevronDown } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { GridBackground } from '../components/ui/GridBackground';
import { TiltCard } from '../components/ui/TiltCard';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] as any }
  })
};

const countryCodes = [
  { code: '+91', country: 'IN', label: 'India' },
  { code: '+1', country: 'US', label: 'United States' },
  { code: '+44', country: 'GB', label: 'United Kingdom' },
  { code: '+61', country: 'AU', label: 'Australia' },
  { code: '+49', country: 'DE', label: 'Germany' },
  { code: '+33', country: 'FR', label: 'France' },
  { code: '+81', country: 'JP', label: 'Japan' },
  { code: '+86', country: 'CN', label: 'China' },
  { code: '+971', country: 'AE', label: 'UAE' },
  { code: '+966', country: 'SA', label: 'Saudi Arabia' },
  { code: '+65', country: 'SG', label: 'Singapore' },
  { code: '+60', country: 'MY', label: 'Malaysia' },
  { code: '+55', country: 'BR', label: 'Brazil' },
  { code: '+27', country: 'ZA', label: 'South Africa' },
  { code: '+234', country: 'NG', label: 'Nigeria' },
  { code: '+254', country: 'KE', label: 'Kenya' },
  { code: '+7', country: 'RU', label: 'Russia' },
  { code: '+82', country: 'KR', label: 'South Korea' },
  { code: '+39', country: 'IT', label: 'Italy' },
  { code: '+34', country: 'ES', label: 'Spain' },
  { code: '+31', country: 'NL', label: 'Netherlands' },
  { code: '+46', country: 'SE', label: 'Sweden' },
  { code: '+41', country: 'CH', label: 'Switzerland' },
  { code: '+48', country: 'PL', label: 'Poland' },
  { code: '+90', country: 'TR', label: 'Turkey' },
  { code: '+62', country: 'ID', label: 'Indonesia' },
  { code: '+63', country: 'PH', label: 'Philippines' },
  { code: '+92', country: 'PK', label: 'Pakistan' },
  { code: '+880', country: 'BD', label: 'Bangladesh' },
  { code: '+94', country: 'LK', label: 'Sri Lanka' },
  { code: '+977', country: 'NP', label: 'Nepal' },
];

const Contact = () => {
  const { portfolio } = usePortfolio();
  const [formData, setFormData] = useState({
    name: '', email: '', countryCode: '+91', phone: '', service: '', otherService: '', message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const validatePhone = (phone: string) => {
    const re = /^[0-9]{6,15}$/;
    return re.test(phone.replace(/[\s-]/g, ''));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'email') {
      if (value && !validateEmail(value)) {
        setEmailError('Please enter a valid email address');
      } else {
        setEmailError('');
      }
    }
    if (name === 'phone') {
      if (value && !validatePhone(value)) {
        setPhoneError('Please enter a valid phone number (digits only)');
      } else {
        setPhoneError('');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    if (!validatePhone(formData.phone)) {
      setPhoneError('Please enter a valid phone number');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    const selectedService = formData.service === 'Other' ? formData.otherService : formData.service;
    const fullPhone = `${formData.countryCode} ${formData.phone}`;

    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: fullPhone,
          service: selectedService,
          message: formData.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', countryCode: '+91', phone: '', service: '', otherService: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full px-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-white text-sm placeholder:text-white/40 focus:border-premium-platinum/50 focus:outline-none transition-colors";

  return (
    <div className="min-h-screen bg-premium-black pt-28 pb-20 relative overflow-hidden">
      <GridBackground />
      <div className="glow-orb glow-orb-purple w-[500px] h-[500px] -top-40 -left-40" />
      <div className="glow-orb glow-orb-blue w-[400px] h-[400px] bottom-0 -right-40" />

      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 relative z-10">

        {/* Header */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="text-center mb-14">
          <div className="badge mx-auto mb-5">
            <Sparkles className="w-3.5 h-3.5" /> Get in Touch
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4">
            Let's Build Something <span className="gradient-text">Amazing</span>
          </h1>
          <p className="text-white/80 text-sm max-w-lg mx-auto leading-relaxed">
            Have a project idea or need a quote? We'd love to hear from you.
            Share your requirements and our team will get back to you promptly.
          </p>
        </motion.div>

        {/* BENTO CONTACT GRID */}
        <div className="grid lg:grid-cols-5 gap-4">

          {/* Left: Info Cards (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <motion.a
              href="mailto:omkardahaleofficial@gmail.com"
              variants={fadeUp} initial="hidden" animate="visible" custom={1}
              className="flex items-center gap-4 p-5 bento-card cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-premium-silver/20 to-premium-platinum/20 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-premium-platinum" />
              </div>
              <div>
                <p className="text-white/70 text-xs uppercase tracking-wider font-medium mb-0.5">Email Us</p>
                <p className="text-white font-medium text-sm break-all">omkardahaleofficial@gmail.com</p>
              </div>
            </motion.a>

            <motion.a
              href="tel:+917030727201"
              variants={fadeUp} initial="hidden" animate="visible" custom={2}
              className="flex items-center gap-4 p-5 bento-card cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-premium-silver/20 to-premium-platinum/20 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-premium-silver" />
              </div>
              <div>
                <p className="text-white/70 text-xs uppercase tracking-wider font-medium mb-0.5">Call Us</p>
                <p className="text-white font-medium text-sm">+91 7030727201</p>
              </div>
            </motion.a>

            <motion.div
              variants={fadeUp} initial="hidden" animate="visible" custom={3}
              className="flex items-center gap-4 p-5 bento-card"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-premium-steel/20 to-premium-platinum/20 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-premium-steel" />
              </div>
              <div>
                <p className="text-white/70 text-xs uppercase tracking-wider font-medium mb-0.5">Location</p>
                <p className="text-white font-medium text-sm">{portfolio.location}</p>
              </div>
            </motion.div>

            {/* WhatsApp CTA */}
            <motion.a
              href="https://wa.me/917030727201?text=Hello%20AEXOZON%2C%20I%20visited%20your%20website%20and%20would%20like%20to%20discuss%20a%20project%20with%20you."
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeUp} initial="hidden" animate="visible" custom={4}
              className="block p-5 bento-card bg-gradient-to-br from-green-500/5 to-emerald-500/5 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Chat on WhatsApp</p>
                  <p className="text-white/70 text-xs">Fastest way to reach us</p>
                </div>
              </div>
            </motion.a>

            {/* Social Links */}
            <motion.div
              variants={fadeUp} initial="hidden" animate="visible" custom={5}
              className="bento-card p-5"
            >
              <p className="text-white/70 text-xs uppercase tracking-wider font-medium mb-4">Find Us Online</p>
              <div className="flex gap-3">
                {[
                  { href: portfolio.social.linkedin, icon: Linkedin, label: 'LinkedIn', color: 'text-premium-platinum' },
                  { href: portfolio.social.github, icon: Github, label: 'GitHub', color: 'text-white/90' },
                  { href: portfolio.social.twitter, icon: Twitter, label: 'Twitter', color: 'text-sky-400' },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-11 h-11 rounded-xl border border-white/8 bg-white/[0.03] flex items-center justify-center ${s.color} hover:bg-white/[0.06] transition-colors`}
                    aria-label={s.label}
                  >
                    <s.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Contact Form (3 cols) */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="visible" custom={2}
            className="lg:col-span-3 h-full"
          >
            <TiltCard className="h-full">
            <div className="bento-card p-7 md:p-9 h-full">
              <h2 className="text-xl font-bold text-white mb-1">Share Your Requirements</h2>
              <p className="text-white/70 text-xs mb-7">
                Tell us what you need and we'll get back to you with a tailored proposal.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5" id="contact-form">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/90 text-xs font-medium mb-2" htmlFor="contact-name">
                      Your Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text" name="name" id="contact-name"
                      value={formData.name} onChange={handleChange}
                      placeholder="Enter your name"
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-white/90 text-xs font-medium mb-2" htmlFor="contact-email">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email" name="email" id="contact-email"
                      value={formData.email} onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
                      className={`${inputClass} ${emailError ? 'border-red-400/50' : ''}`}
                    />
                    {emailError && <p className="text-red-400 text-xs mt-1">{emailError}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/90 text-xs font-medium mb-2" htmlFor="contact-phone">
                      Phone Number <span className="text-red-400">*</span>
                    </label>
                    <div className="flex gap-2">
                      <select
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleChange}
                        className="w-[110px] px-2 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-white text-sm focus:border-premium-platinum/50 focus:outline-none transition-colors appearance-none cursor-pointer"
                      >
                        {countryCodes.map((c) => (
                          <option key={c.code} value={c.code} className="bg-premium-charcoal">
                            {c.code} {c.country}
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel" name="phone" id="contact-phone"
                        value={formData.phone} onChange={handleChange}
                        placeholder="Phone number"
                        required
                        className={`flex-1 ${inputClass} ${phoneError ? 'border-red-400/50' : ''}`}
                      />
                    </div>
                    {phoneError && <p className="text-red-400 text-xs mt-1">{phoneError}</p>}
                  </div>
                  <div>
                    <label className="block text-white/90 text-xs font-medium mb-2" htmlFor="contact-service">
                      Service Required <span className="text-red-400">*</span>
                    </label>
                    <select
                      name="service" id="contact-service"
                      value={formData.service} onChange={handleChange}
                      required
                      className={`${inputClass} appearance-none cursor-pointer`}
                    >
                      <option value="" className="bg-premium-charcoal">Select a service</option>
                      <option value="AI SaaS" className="bg-premium-charcoal">AI-Powered SaaS</option>
                      <option value="Cloud DevOps" className="bg-premium-charcoal">Cloud & DevOps</option>
                      <option value="CRM ERP" className="bg-premium-charcoal">CRM / ERP Systems</option>
                      <option value="Web App" className="bg-premium-charcoal">Web Application</option>
                      <option value="Mobile App" className="bg-premium-charcoal">Mobile App</option>
                      <option value="Marketing" className="bg-premium-charcoal">Digital Marketing</option>
                      <option value="Other" className="bg-premium-charcoal">Other</option>
                    </select>
                  </div>
                </div>

                {/* Other Service Text Input */}
                {formData.service === 'Other' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                    <label className="block text-white/90 text-xs font-medium mb-2" htmlFor="contact-other-service">
                      Please specify <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text" name="otherService" id="contact-other-service"
                      value={formData.otherService} onChange={handleChange}
                      placeholder="Describe the service you need"
                      required
                      className={inputClass}
                    />
                  </motion.div>
                )}

                <div>
                  <label className="block text-white/90 text-xs font-medium mb-2" htmlFor="contact-message">
                    Project Details <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="message" id="contact-message"
                    value={formData.message} onChange={handleChange}
                    placeholder="Briefly describe your project requirements, goals, and timeline..."
                    required rows={5}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <button
                  type="submit" disabled={isSubmitting} id="contact-submit"
                  className="w-full flex items-center justify-center gap-2.5 px-6 py-4 bg-gradient-to-r from-premium-platinum to-premium-silver text-black font-semibold text-sm rounded-full transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-wait"
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                  ) : (
                    <><Send className="w-4 h-4" /> Submit Requirements</>
                  )}
                </button>

                {submitStatus === 'success' && (
                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-xs"
                  >
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    <span>Requirements submitted successfully. Our team will review and get back to you within 24 hours.</span>
                  </motion.div>
                )}
                {submitStatus === 'error' && (
                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs"
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>Something went wrong. Please try again or reach us on WhatsApp.</span>
                  </motion.div>
                )}
              </form>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3 mt-7 pt-6 border-t border-white/6">
                {[
                  { icon: Clock, text: '24hr Response' },
                  { icon: Shield, text: 'Data Safe' },
                  { icon: CheckCircle, text: 'Free Consultation' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2 text-white/70 text-xs">
                    <item.icon className="w-3.5 h-3.5" /> {item.text}
                  </div>
                ))}
              </div>
            </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
