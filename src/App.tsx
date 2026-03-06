/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  Phone,
  Wrench,
  Flame,
  Wind,
  CheckCircle2,
  Clock,
  ShieldCheck,
  MapPin,
  Menu,
  X,
  ArrowRight,
  Star,
  Mail,
  Award
} from "lucide-react";
import { useState, useEffect } from "react";

// ── FAQ Component ────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "How long will my hot water heater last?",
    a: "Most hot water heaters last 10–14 years, depending on usage. If your hot water heater is within the 10–14 year range and needs any major repair, we recommend purchasing a new heater rather than sinking money into repairs.",
    category: "Water Heaters",
  },
  {
    q: "What should I do if my hot water heater is leaking?",
    a: "The best approach is to replace it if the leak is coming from the vessel itself. Some valves can be replaced, so confirm the leak is from the tank — not a side valve or piping above. Leaks from the tank indicate rusting through the wall of the storage tank, and there is no repair for this. The tank will need to be replaced.",
    category: "Water Heaters",
  },
  {
    q: "What should I do if my water pressure is low at a faucet?",
    a: "Low pressure at a single faucet or shower head is usually caused by calcium buildup in the aerator or shower head. Check whether both hot and cold have low pressure — if so, the aerator is the culprit. Simply unscrew it (lefty-loosey), soak in vinegar or CLR overnight to dissolve deposits, reinstall, and you're done!",
    category: "Plumbing",
  },
  {
    q: "What should I do if my sink is draining slow?",
    a: "A slow-draining sink is usually caused by hair and debris collected on the pop-up stopper. Use a \"zip-it\" tool to clear the drain without disassembly. If you don't have one, unscrew the nut under the sink holding the pop-up, remove and clean the stopper, then refasten. Quick, easy fix!",
    category: "Drains",
  },
  {
    q: "What should I do if my tub is draining slow?",
    a: "Just like a sink, a slow-draining tub is almost always caused by a buildup of hair and debris. Use a zip-it tool or needle-nose pliers to pull out the clog. If there's a tub stopper in the drain, you'll need to remove it first — some come out via the overflow plate, others unscrew directly from the drain.",
    category: "Drains",
  },
  {
    q: "What should I do if my garburator motor hums or makes no noise?",
    a: "A humming garburator is usually jammed by a bone, bottle cap, or piece of metal. Use a ¼\" allen wrench in the opening at the very bottom of the unit and turn vigorously in both directions to free the blades. If there's no sound at all, the reset button (also at the bottom) may have tripped — press it and the motor should re-engage.",
    category: "Garburators",
  },
];

const FAQItem: React.FC<{ faq: typeof faqs[0]; index: number }> = ({ faq, index }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div
      className={`group border rounded-2xl overflow-hidden transition-all duration-300 ${open ? "border-gold shadow-lg shadow-gold/10" : "border-ink/8 hover:border-gold/40"
        }`}
    >
      <button
        id={`faq-${index}`}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={`faq-answer-${index}`}
        className="w-full flex items-center justify-between gap-6 px-8 py-6 text-left cursor-pointer"
      >
        <div className="flex items-center gap-4">
          <span className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${open ? "bg-gold text-ink" : "bg-ink/5 text-ink/40 group-hover:bg-gold/20 group-hover:text-gold"
            }`}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-bold text-ink text-[15px] md:text-base leading-snug">{faq.q}</span>
        </div>
        <span className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${open ? "border-gold bg-gold text-ink rotate-45" : "border-ink/15 text-ink/40 group-hover:border-gold group-hover:text-gold"
          }`}>
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg>
        </span>
      </button>

      <div
        id={`faq-answer-${index}`}
        role="region"
        aria-labelledby={`faq-${index}`}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}>
        <div className="px-8 pb-7 flex gap-4">
          <div className="w-8 shrink-0 flex justify-center">
            <div className="w-0.5 h-full bg-gold/20 rounded-full" />
          </div>
          <p className="text-ink/60 leading-relaxed text-[15px]">{faq.a}</p>
        </div>
      </div>
    </div>
  );
}

// ── Contact Form Component ──────────────────────────────────────────────────
const WEBHOOK_URL = "https://hook.us2.make.com/viaijv914kfwx3kzgoshdmzqk1asvlik";

function ContactForm() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", serviceAddress: "", serviceType: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          serviceAddress: form.serviceAddress,
          serviceType: form.serviceType,
          message: form.message,
          timestamp: new Date().toISOString(),
          source: "Boland Mechanical Website",
        }),
      });
      setStatus("success");
      setForm({ firstName: "", lastName: "", email: "", phone: "", serviceAddress: "", serviceType: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full bg-white border border-ink/10 rounded-xl px-4 py-3 text-ink placeholder:text-ink/30 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all text-sm";
  const labelClass = "block text-xs font-bold text-ink/70 mb-2";

  if (status === "success") {
    return (
      <div className="text-center py-20">
        <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} className="text-gold" />
        </div>
        <h4 className="text-2xl font-display font-bold text-ink mb-3">Quote Request Sent!</h4>
        <p className="text-ink/50">Thanks! We'll get back to you within 24 hours.</p>
        <button onClick={() => setStatus("idle")} className="mt-8 text-sm font-bold text-gold underline underline-offset-4 cursor-pointer min-h-[44px]">
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-left">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className={labelClass}>First Name *</label>
          <input id="firstName" name="firstName" type="text" value={form.firstName} onChange={handleChange} required className={inputClass} />
        </div>
        <div>
          <label htmlFor="lastName" className={labelClass}>Last Name *</label>
          <input id="lastName" name="lastName" type="text" value={form.lastName} onChange={handleChange} required className={inputClass} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className={labelClass}>Email *</label>
          <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required className={inputClass} />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>Phone *</label>
          <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} required className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="serviceAddress" className={labelClass}>Service Address</label>
        <input id="serviceAddress" name="serviceAddress" type="text" placeholder="Street address, city, zip" value={form.serviceAddress} onChange={handleChange} className={inputClass} />
      </div>

      <div>
        <label htmlFor="serviceType" className={labelClass}>What Can We Help With? *</label>
        <select id="serviceType" name="serviceType" value={form.serviceType} onChange={handleChange} required className={`${inputClass} appearance-none bg-no-repeat`} style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23000' opacity='0.5'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundPosition: `right 16px center`, backgroundSize: `16px 16px` }}>
          <option value="" disabled>Select a service...</option>
          <option value="Plumbing Repair">Plumbing Repair</option>
          <option value="Water Heaters">Water Heaters</option>
          <option value="HVAC / Furnaces">HVAC / Furnaces</option>
          <option value="Gasfitting">Gasfitting</option>
          <option value="Emergency Service">Emergency Service</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>Tell Us More</label>
        <textarea id="message" name="message" placeholder="Size of home, what's going on..." rows={3} value={form.message} onChange={handleChange} className={`${inputClass} resize-y bg-stone-50/50`} />
      </div>

      {status === "error" && (
        <p className="text-red-500 text-sm text-center">Something went wrong. Please try again or call us directly.</p>
      )}

      <div className="pt-2">
        <button
          id="contact-submit"
          type="submit"
          disabled={status === "sending"}
          className="w-full bg-gold text-ink font-bold px-8 py-4 rounded-xl hover:bg-gold-dark transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer text-sm uppercase tracking-widest"
        >
          {status === "sending" ? "Sending…" : "Send My Free Quote Request"}
        </button>
        <p className="text-center text-[10px] text-ink/40 mt-4 font-semibold uppercase tracking-widest">
          No spam, no obligation. We'll only use this to contact you about your service.
        </p>
      </div>
    </form>
  );
}

// ── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services = [
    {
      title: "Plumbing",
      description: "Comprehensive plumbing solutions for every need in your home.",
      icon: <Wrench className="w-8 h-8 text-gold" />,
      items: [
        "Hot Water Heaters",
        "Faucets, Toilets & Tubs",
        "Bathroom & Kitchen Sinks",
        "Garburators",
        "Water Softeners",
        "Exterior Hose Faucets",
        "Sewers",
        "Bathroom & Kitchen Sink Unclogging",
        "Drain Cleaning",
        "Reverse Osmosis Filters",
        "Backflow Prevention Testing, Installation & Repair",
      ],
    },
    {
      title: "Gasfitting",
      description: "Safe and certified gas line installations, hookups, and full City of Calgary permit services.",
      icon: <Flame className="w-8 h-8 text-gold" />,
      items: [
        "Barbeques",
        "Indoor/Outdoor Ranges",
        "Outdoor Patio Heaters",
        "Garage Heaters",
        "Underground Gas to Garage",
        "Find, Test and Repair Gas Leaks",
        "City of Calgary Permits and Inspections",
      ],
    },
    {
      title: "Heating & Air Conditioning",
      description: "Year-round comfort solutions from furnaces and boilers to full AC installation.",
      icon: <Wind className="w-8 h-8 text-gold" />,
      items: [
        "Furnaces",
        "Air Conditioning",
        "Boilers & Gas Boiler Controls",
        "Steam Boiler / Heating",
        "Hot Water Heating",
        "In Floor Radiant Heating",
        "Water Heaters",
        "Garage Heaters",
        "Patio Heaters",
        "Backflow Prevention Testing, Installation & Repair",
      ],
    },
  ];

  const features = [
    {
      title: "Same-Day Service",
      description: "Call before 2pm and we'll be at your door the same day. Emergency calls answered 24/7.",
      icon: <Clock className="w-6 h-6" />,
    },
    {
      title: "Red Seal Certified",
      description: "Every tech on your job is a Red Seal certified journeyman or master — not an apprentice, not a subcontractor.",
      icon: <Award className="w-6 h-6" />,
    },
    {
      title: "Upfront Pricing",
      description: "We give you an exact price before we start. No hidden fees, no surprise invoices — ever.",
      icon: <ShieldCheck className="w-6 h-6" />,
    },
    {
      title: "Iron Pipe Promise",
      description: "If anything we service fails within 30 days, we return and fix it completely free. No questions, no invoice.",
      icon: <CheckCircle2 className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Skip to main content — keyboard accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-gold focus:text-ink focus:font-bold focus:px-4 focus:py-2 focus:rounded-lg"
      >
        Skip to main content
      </a>
      {/* Navigation */}
      <nav
        aria-label="Main navigation"
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-6"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" aria-label="Boland Mechanical Contractors Ltd — Home" className="cursor-pointer flex items-center gap-2">
            <div className="relative">
              <span className="text-2xl font-display font-bold tracking-tighter text-ink">
                BOLAND
              </span>
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gold rounded-full" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-ink bg-gold px-1.5 py-0.5 rounded-sm mt-1 ml-1 inline-block">
              Mechanical
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {["Services", "About", "Reviews", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-semibold text-ink hover:text-gold transition-colors"
              >
                {item}
              </a>
            ))}
            <a
              href="tel:4035609065"
              aria-label="Call Boland Mechanical at 403-560-9065"
              className="flex items-center gap-2 bg-ink text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-gold hover:text-ink transition-all cursor-pointer min-h-[44px]"
            >
              <Phone size={16} aria-hidden="true" />
              403-560-9065
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-ink cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl py-8 px-6 flex flex-col gap-6 md:hidden"
          >
            {["Services", "About", "Reviews", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-lg font-bold text-ink"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <a
              href="tel:4035609065"
              className="flex items-center justify-center gap-2 bg-gold text-ink px-5 py-4 rounded-xl font-bold"
            >
              <Phone size={20} />
              Call 403-560-9065
            </a>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden" aria-label="Hero">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop"
            alt=""
            aria-hidden="true"
            loading="eager"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
        </div>

        <div id="main-content" className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-black uppercase tracking-[0.2em] bg-gold text-ink py-1.5 px-3 rounded-md shadow-lg">
                Est. 1988 • Calgary, AB
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-bold text-ink leading-[1.1] mb-6">
              Calgary's Emergency
              <br />
              <span className="relative inline-block">
                Plumbers & HVAC
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="absolute -bottom-2 left-0 h-1.5 bg-gold/80 rounded-full"
                />
              </span>
              <br />
              At Your Door Fast.
            </h1>

            {/* Response time guarantee pill */}
            <div className="inline-flex items-center gap-2 bg-ink text-gold rounded-full px-5 py-2.5 text-sm font-bold mb-8 shadow-xl">
              <Clock size={16} aria-hidden="true" />
              Same-day service, 24/7 emergency response
            </div>

            <p className="text-xl text-ink/70 mb-8 max-w-xl leading-relaxed">
              Red Seal certified plumbers, gasfitters, and HVAC techs serving Calgary since 1988.
              Upfront pricing. No subcontractors. Guaranteed work.
            </p>

            {/* Trust pills */}
            <div className="flex flex-wrap gap-3 mb-10">
              {[
                { icon: <ShieldCheck size={13} />, label: "Red Seal Certified" },
                { icon: <CheckCircle2 size={13} />, label: "Background Checked" },
                { icon: <Award size={13} />, label: "Not Subcontractors" },
                { icon: <Star size={13} />, label: "4.9★ Google Rating" },
              ].map((pill) => (
                <span key={pill.label} className="inline-flex items-center gap-1.5 text-xs font-bold bg-white/80 border border-ink/10 text-ink/70 rounded-full px-3 py-1.5">
                  <span className="text-gold" aria-hidden="true">{pill.icon}</span>
                  {pill.label}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                aria-label="Book a service call — scroll to contact form"
                className="btn-gold flex items-center justify-center gap-2 group"
              >
                Book a Service Call
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </button>
              <a href="tel:4035609065" className="btn-outline flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" aria-hidden="true" />
                Emergency: 403-560-9065
              </a>
            </div>
          </motion.div>
        </div>

        {/* Mobile Sticky Call Button */}
        <div className="md:hidden fixed bottom-6 right-6 z-50">
          <motion.a
            href="tel:4035609065"
            aria-label="Call Boland Mechanical at 403-560-9065"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 bg-gold text-ink rounded-full flex items-center justify-center shadow-2xl border-4 border-white cursor-pointer"
          >
            <Phone size={24} aria-hidden="true" />
          </motion.a>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          aria-hidden="true"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest text-ink/40">Scroll</span>
          <div className="w-[1px] h-12 bg-ink/10 relative">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gold" />
          </div>
        </motion.div>
      </section>

      {/* Trust / Credentials Bar */}
      <section aria-label="Trust credentials" className="bg-ink py-5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4">
            {[
              { label: "35+ Years in Calgary" },
              { label: "Red Seal Certified Journeymen" },
              { label: "Fully Licensed & Insured" },
              { label: "Background-Checked Techs" },
              { label: "Upfront, No-Surprise Pricing" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-white/60 text-sm font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" aria-hidden="true" />
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-white py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-sm font-bold text-gold uppercase tracking-[0.2em] mb-4">Our Expertise</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-ink">Comprehensive Mechanical Solutions</h3>
            <p className="text-ink/50 mt-4 max-w-xl mx-auto">From emergency pipe bursts to full home HVAC installs — one call handles everything.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                className="p-10 rounded-3xl border border-ink/5 bg-stone-50 hover:bg-white hover:shadow-2xl hover:shadow-gold/10 transition-all duration-500 group"
              >
                <div className="mb-6 p-4 bg-white rounded-2xl w-fit shadow-sm group-hover:shadow-md transition-all">
                  {service.icon}
                </div>
                <h4 className="text-2xl font-display font-bold mb-3">{service.title}</h4>
                <p className="text-ink/60 leading-relaxed mb-6 text-sm">{service.description}</p>
                <ul className="space-y-2">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-ink/70">
                      <span className="text-gold mt-0.5 shrink-0">✦</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-ink text-white py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gold/5 skew-x-12 translate-x-1/4" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">

            {/* Left: Text Content */}
            <div>
              <h2 className="text-sm font-bold text-gold uppercase tracking-[0.2em] mb-4">About Us</h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold mb-8 leading-tight">
                Calgary's Trusted Plumbing &amp; HVAC Experts Since 1988.
              </h3>

              <div className="space-y-5 text-white/65 leading-relaxed text-[15px] mb-10">
                <p>
                  For over 35 years, <span className="text-white font-semibold">Doug Boland</span> and his team of Red Seal certified journeymen plumbers and gasfitters have been the trusted name for plumbing, gasfitting, and HVAC in Calgary — built on a legacy of craftsmanship passed from father to son.
                </p>
                <p>
                  A <span className="text-gold font-semibold">certified master plumber and gasfitter</span> since 1980, Doug has tackled landmark Calgary projects from Banker's Hall to custom residential homes. Every technician on our team is a <span className="text-white font-semibold">background-checked, full-time employee</span> — not a subcontractor. When we arrive at your door, you can trust who's walking in.
                </p>
              </div>

              {/* Credential cards */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-start gap-4">
                  <Award size={22} className="text-gold shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <h4 className="font-bold mb-1">Red Seal Certified Masters</h4>
                    <p className="text-sm text-white/50">Highest trade certification in Canada — journeymen and master plumbers only.</p>
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-start gap-4">
                  <ShieldCheck size={22} className="text-gold shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <h4 className="font-bold mb-1">Background-Checked Staff</h4>
                    <p className="text-sm text-white/50">Every tech is a direct employee, fully screened before they ever enter your home.</p>
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-start gap-4">
                  <CheckCircle2 size={22} className="text-gold shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <h4 className="font-bold mb-1">Not Subcontractors</h4>
                    <p className="text-sm text-white/50">Our name is on the truck and the work. No outsourcing, ever.</p>
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-start gap-4">
                  <Clock size={22} className="text-gold shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <h4 className="font-bold mb-1">Licensed & Insured</h4>
                    <p className="text-sm text-white/50">Fully licensed, bonded, and insured for your total peace of mind.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Contained image with floating badge */}
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden border-8 border-white/5">
                <img
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop"
                  alt="Professional plumber working on a pipe installation"
                  loading="lazy"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-gold p-8 rounded-2xl text-ink shadow-2xl hidden md:block">
                <div className="text-4xl font-display font-bold mb-1">35+</div>
                <div className="text-xs font-bold uppercase tracking-widest">Years of Excellence</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* How We Work — 3-step process (top converter from competitive analysis) */}
      <section className="bg-stone-50 py-28" aria-label="How we work">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-gold uppercase tracking-[0.2em] mb-4">Simple Process</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-ink mb-4">Here's What Happens<br />When You Call</h3>
            <p className="text-ink/50 max-w-xl mx-auto">No mystery. No pressure. Just straight-forward service from a family that's been doing this since 1988.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector line (desktop only) */}
            <div className="hidden md:block absolute top-14 left-[17%] right-[17%] h-0.5 bg-gold/20" aria-hidden="true" />

            {[
              {
                step: "01",
                title: "Call or Book Online",
                desc: "Reach us by phone (24/7 for emergencies) or fill out the form below. We'll confirm a same-day or next-morning time slot.",
                icon: <Phone size={26} className="text-gold" />,
              },
              {
                step: "02",
                title: "We Give You a Price First",
                desc: "Before any wrench turns, our tech gives you an exact, upfront quote. You approve it — or we walk away. Zero pressure.",
                icon: <CheckCircle2 size={26} className="text-gold" />,
              },
              {
                step: "03",
                title: "Done Right. Guaranteed.",
                desc: "Work is completed same day. We clean up completely. And if anything we touched has an issue within 30 days, we're back for free.",
                icon: <ShieldCheck size={26} className="text-gold" />,
              },
            ].map((item, i) => (
              <div key={i} className="relative text-center">
                <div className="w-28 h-28 rounded-full bg-white border-2 border-gold/20 flex items-center justify-center mx-auto mb-6 shadow-md relative z-10">
                  {item.icon}
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gold text-ink text-xs font-bold flex items-center justify-center shadow">{item.step}</span>
                </div>
                <h4 className="text-xl font-display font-bold text-ink mb-3">{item.title}</h4>
                <p className="text-ink/55 text-sm leading-relaxed max-w-xs mx-auto">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <a href="tel:4035609065" className="inline-flex items-center gap-3 bg-ink text-white font-bold px-10 py-5 rounded-full hover:bg-gold hover:text-ink transition-all cursor-pointer min-h-[52px] text-sm uppercase tracking-wider group">
              <Phone size={16} aria-hidden="true" />
              Call Now — We Answer 24/7
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl">
              <h2 className="text-sm font-bold text-gold uppercase tracking-[0.2em] mb-4">Verified Reviews</h2>
              <h3 className="text-4xl font-display font-bold text-ink">What Calgary Homeowners Say</h3>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex text-gold" aria-label="5 out of 5 stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" aria-hidden="true" />)}
              </div>
              <span className="font-bold text-ink">4.9 / 5 on Google</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Kare7924",
                text: "Always a pleasure dealing with Boland Mechanical. Service is always prompt efficient and professional. Love these guys!",
                location: "Calgary",
                stars: 5,
                service: "Plumbing",
              },
              {
                name: "Dbra5654",
                text: "Very great service and reasonable rates. Would highly recommend to anyone in Calgary looking for a reliable plumber.",
                location: "Calgary",
                stars: 5,
                service: "Water Heater",
              },
              {
                name: "Dfmc5578",
                text: "Excellent, prompt service! They came out the same day I called and fixed the issue quickly. Very professional team.",
                location: "Calgary",
                stars: 5,
                service: "Emergency Repair",
              }
            ].map((review, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-ink/5">
                {/* Star rating */}
                <div className="flex gap-1 mb-4" aria-label={`${review.stars} out of 5 stars`}>
                  {[...Array(review.stars)].map((_, i) => <Star key={i} size={14} fill="#F5B800" className="text-gold" aria-hidden="true" />)}
                </div>
                {/* Service tag */}
                <span className="inline-block text-[10px] font-bold uppercase tracking-widest bg-gold/10 text-gold px-3 py-1 rounded-full mb-4">{review.service}</span>
                <p className="text-ink/70 italic mb-8 leading-relaxed">"{review.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center text-gold font-bold text-sm">
                    {review.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-sm">{review.name}</div>
                    <div className="text-xs text-ink/40">Google Review · {review.location}, AB</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Google CTA */}
          <div className="mt-12 text-center">
            <a
              href="https://maps.app.goo.gl/tdXYSEvVDnLMSJMRA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white border border-ink/10 text-ink font-bold px-8 py-4 rounded-full hover:border-gold hover:text-gold transition-all cursor-pointer text-sm shadow-sm"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" aria-hidden="true">
                <path d="M21.8 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.5a4.7 4.7 0 01-2 3.1v2.6h3.3c1.9-1.8 3-4.4 3-7.5z" fill="#4285F4" />
                <path d="M12 22c2.7 0 5-.9 6.7-2.4l-3.3-2.6a6 6 0 01-9-3.2H3v2.7C4.8 19.9 8.2 22 12 22z" fill="#34A853" />
                <path d="M6.4 13.8a6 6 0 010-3.6V7.5H3a10 10 0 000 9l3.4-2.7z" fill="#FBBC05" />
                <path d="M12 6a5.4 5.4 0 013.8 1.5L18.6 5A10 10 0 003 7.5l3.4 2.7A6 6 0 0112 6z" fill="#EA4335" />
              </svg>
              Read All Reviews on Google
              <ArrowRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* Iron Pipe Promise — Branded Guarantee Section */}
      <section className="bg-ink py-24 relative overflow-hidden" aria-label="Our guarantee">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent pointer-events-none" aria-hidden="true" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="w-20 h-20 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-8">
            <ShieldCheck size={36} className="text-gold" aria-hidden="true" />
          </div>
          <h2 className="text-sm font-bold text-gold uppercase tracking-[0.2em] mb-4">Our Promise to You</h2>
          <h3 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
            The Iron Pipe Promise
          </h3>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            If anything we service or install has a problem within <strong className="text-white">30 days</strong> of our visit, we return and fix it completely free — no questions, no invoice, no exceptions. That's our name on the work and we stand behind it.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              "30-Day Free Return Policy",
              "No Hidden Fees — Ever",
              "Upfront Quote Before We Start",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-white/70 font-semibold text-sm">
                <CheckCircle2 size={16} className="text-gold shrink-0" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-gold rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" aria-hidden="true">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
          </div>

          <div className="inline-flex items-center gap-2 bg-ink/10 rounded-full px-4 py-2 text-ink/70 text-xs font-bold uppercase tracking-widest mb-6 relative z-10">
            <Clock size={12} aria-hidden="true" /> 24/7 Emergency Line Available
          </div>

          <h3 className="text-4xl md:text-6xl font-display font-bold text-ink mb-6 relative z-10">
            Pipe Burst? No Hot Water?
            <br />We're On Our Way.
          </h3>
          <p className="text-ink/70 text-lg mb-10 max-w-2xl mx-auto relative z-10">
            Same-day service for most calls. 24/7 emergency response. Upfront price before we start.
            Join thousands of Calgary homeowners who trust Boland Mechanical.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-ink text-white font-bold py-5 px-10 rounded-full hover:bg-white hover:text-ink transition-all shadow-xl cursor-pointer min-h-[52px]"
            >
              Book a Service Call
            </button>
            <a href="tel:4035609065" className="bg-white/20 backdrop-blur-md border border-ink/10 text-ink font-bold py-5 px-10 rounded-full hover:bg-white transition-all cursor-pointer min-h-[52px] flex items-center justify-center gap-2">
              <Phone size={16} aria-hidden="true" /> Call 403-560-9065
            </a>
          </div>
        </div>
      </section>

      {/* Service Area Section */}
      <section id="service-area" className="bg-ink py-28 relative overflow-hidden">
        {/* Decorative glows */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-gold/5 blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* LEFT: Content */}
            <div>
              <h2 className="text-sm font-bold text-gold uppercase tracking-[0.2em] mb-4">Our Coverage</h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
                Proudly Serving<br />All of Calgary
              </h3>
              <p className="text-white/50 leading-relaxed mb-10">
                Based in SW Calgary, we serve residential and commercial clients across the entire city and surrounding communities — from new construction to century-old homes.
              </p>

              {/* Neighbourhood tags */}
              <div className="flex flex-wrap gap-2 mb-10">
                {[
                  "SW Calgary", "SE Calgary", "NW Calgary", "NE Calgary",
                  "Downtown", "Beltline", "Bridgeland", "Kensington",
                  "Marda Loop", "Inglewood", "Signal Hill", "Tuscany",
                ].map((area) => (
                  <span key={area} className="px-3 py-1.5 rounded-full text-xs font-bold border border-white/10 text-white/50 hover:border-gold/50 hover:text-gold transition-colors cursor-default">
                    {area}
                  </span>
                ))}
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-6 mb-10 border-t border-white/10 pt-10">
                {[
                  { value: "35+", label: "Years Serving Calgary" },
                  { value: "100%", label: "Licensed & Insured" },
                  { value: "24/7", label: "Emergency Service" },
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="text-3xl font-display font-bold text-gold mb-1">{stat.value}</div>
                    <div className="text-xs text-white/40 uppercase tracking-wider leading-tight">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <a
                href="https://maps.app.goo.gl/tdXYSEvVDnLMSJMRA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gold text-ink font-bold px-8 py-4 rounded-full hover:bg-gold/80 transition-all text-sm uppercase tracking-wider group"
              >
                <MapPin size={16} />
                Get Directions
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* RIGHT: Framed Map */}
            <div className="relative">
              {/* Gold glow ring behind map */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-gold/30 via-gold/5 to-transparent blur-xl pointer-events-none" />

              {/* Map container */}
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50">
                <iframe
                  title="Boland Mechanical Contractors Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2507.2!2d-114.1517118!3d51.0358711!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x53716f0a2c042405%3A0x327ed811c8f1ee9!2sBoland+Mechanical+Contractors+Ltd!5e0!3m2!1sen!2sca!4v1741000000000!5m2!1sen!2sca"
                  width="100%"
                  height="420"
                  style={{ border: 0, display: 'block', filter: 'grayscale(20%) contrast(1.05) brightness(0.9)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                {/* Top fade */}
                <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-ink/40 to-transparent pointer-events-none" />
              </div>

              {/* Floating HQ badge */}
              <div className="absolute -bottom-5 -left-5 bg-gold text-ink px-6 py-4 rounded-2xl shadow-xl shadow-gold/20 flex items-center gap-3">
                <MapPin size={18} className="shrink-0" />
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider">Our HQ</div>
                  <div className="text-xs font-semibold opacity-70">SW Calgary, AB</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-stone-50 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-gold/5 blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-gold uppercase tracking-[0.2em] mb-4">Quick Fixes</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-ink mb-6">
              Frequently Asked Questions
            </h3>
            <p className="text-ink/50 max-w-2xl mx-auto leading-relaxed">
              A basic understanding of your home's plumbing and heating can help you solve simple problems yourself.
              If trouble persists, <span className="text-gold font-semibold">contact us</span> and we'll book you in right away.
            </p>
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {["All", "Water Heaters", "Plumbing", "Drains", "Garburators"].map((cat) => (
              <span key={cat} className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white border border-ink/10 text-ink/50">{cat}</span>
            ))}
          </div>

          {/* FAQ accordion */}
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} />
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-14 text-center bg-ink rounded-3xl p-10">
            <p className="text-white/70 mb-2 text-sm">Still having issues after trying these fixes?</p>
            <h4 className="text-2xl font-display font-bold text-white mb-6">We're Here to Help</h4>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-gold text-ink font-bold px-8 py-4 rounded-full hover:bg-gold/80 transition-all text-sm uppercase tracking-wider"
            >
              Book an Appointment <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left: Content */}
            <div className="lg:pt-8">
              <h2 className="text-sm font-bold text-gold uppercase tracking-[0.2em] mb-4">Let's Talk</h2>
              <h3 className="text-5xl md:text-6xl font-display font-bold text-ink mb-6">
                Get Your Free, No-<br className="hidden lg:block" />Obligation Quote
              </h3>
              <p className="text-ink/60 text-lg mb-12 max-w-lg leading-relaxed">
                Tell us about your home's mechanical needs and we'll send a transparent quote within 24 hours. No pressure, no sales pitch — just honest pricing from your Calgary neighbours.
              </p>

              <div className="space-y-8">
                <div className="flex gap-5 items-center">
                  <div className="w-14 h-14 bg-white shadow-sm border border-ink/5 rounded-2xl flex items-center justify-center shrink-0 text-gold">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-ink text-lg mb-1 hidden">Contact Us</h4>
                    <p className="text-ink font-bold text-xl mb-1"><a href="tel:4035609065">403-560-9065</a></p>
                    <p className="text-ink/40 text-sm font-medium">Mon-Sat 7am-7pm • Emergency line 24/7</p>
                  </div>
                </div>

                <div className="flex gap-5 items-center">
                  <div className="w-14 h-14 bg-white shadow-sm border border-ink/5 rounded-2xl flex items-center justify-center shrink-0 text-gold">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-ink text-lg mb-1 hidden">Email Us</h4>
                    <p className="text-ink font-bold text-lg mb-1"><a href="mailto:info@bolandmechanical.com">info@bolandmechanical.com</a></p>
                    <p className="text-ink/40 text-sm font-medium">We respond within a few hours</p>
                  </div>
                </div>

                <div className="flex gap-5 items-center">
                  <div className="w-14 h-14 bg-white shadow-sm border border-ink/5 rounded-2xl flex items-center justify-center shrink-0 text-gold">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-ink text-lg mb-1">Locally Owned & Operated</h4>
                    <p className="text-ink/40 text-sm font-medium">Proudly serving greater Calgary, AB since 1988</p>
                  </div>
                </div>
              </div>

              <div className="mt-16 flex flex-wrap gap-8 items-center bg-transparent py-4">
                <div className="flex items-center gap-3 font-bold text-ink/70 text-sm">
                  <ShieldCheck size={22} className="text-gold" /> Licensed & Insured
                </div>
                <div className="flex items-center gap-3 font-bold text-ink/70 text-sm">
                  <Star size={22} fill="currentColor" className="text-gold" /> 4.9★ on Google
                </div>
                <div className="flex items-center gap-3 font-bold text-ink/70 text-sm">
                  <Award size={22} fill="currentColor" className="text-gold" /> Red Seal Certified
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-xl shadow-ink/5 border border-ink/5 relative">
              <h3 className="text-2xl font-display font-bold text-ink mb-2">Request a Quote</h3>
              <p className="text-ink/50 text-sm mb-8">We'll get back to you within 24 hours.</p>
              <ContactForm />
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}

      <footer role="contentinfo" aria-label="Site footer" className="bg-white border-t border-ink/5 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2">
              <a href="#" aria-label="Boland Mechanical Contractors Ltd — Home" className="inline-flex items-center gap-2 mb-6 cursor-pointer">
                <div className="relative">
                  <span className="text-2xl font-display font-bold tracking-tighter text-ink">
                    BOLAND
                  </span>
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gold rounded-full" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold mt-1 ml-1">
                  Mechanical
                </span>
              </a>
              <p className="text-ink/50 max-w-sm mb-8">
                Calgary's premier choice for plumbing, gasfitting, and HVAC services.
                Committed to quality, integrity, and your home's comfort since 1988.
              </p>
              <div className="flex gap-4">
                {/* Google */}
                <a href="https://www.google.com/search?q=Boland+Mechanical+Contractors+Calgary" target="_blank" rel="noopener noreferrer"
                  aria-label="Review us on Google"
                  className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center hover:bg-gold transition-all cursor-pointer group">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                    <path d="M21.8 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.5a4.7 4.7 0 01-2 3.1v2.6h3.3c1.9-1.8 3-4.4 3-7.5z" fill="#4285F4" className="group-hover:fill-ink transition-colors" />
                    <path d="M12 22c2.7 0 5-0.9 6.7-2.4l-3.3-2.6a6 6 0 01-9-3.2H3v2.7C4.8 19.9 8.2 22 12 22z" fill="#34A853" className="group-hover:fill-ink transition-colors" />
                    <path d="M6.4 13.8a6 6 0 010-3.6V7.5H3a10 10 0 000 9l3.4-2.7z" fill="#FBBC05" className="group-hover:fill-ink transition-colors" />
                    <path d="M12 6a5.4 5.4 0 013.8 1.5L18.6 5A10 10 0 003 7.5l3.4 2.7A6 6 0 0112 6z" fill="#EA4335" className="group-hover:fill-ink transition-colors" />
                  </svg>
                </a>
                {/* Facebook */}
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"
                  aria-label="Visit us on Facebook"
                  className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center hover:bg-gold transition-all cursor-pointer group">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#1877F2] group-hover:fill-ink transition-colors">
                    <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.27h3.32l-.53 3.5h-2.79V24C19.61 23.1 24 18.1 24 12.07z" />
                  </svg>
                </a>
                {/* Yelp */}
                <a href="https://www.yelp.ca" target="_blank" rel="noopener noreferrer"
                  aria-label="Find us on Yelp"
                  className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center hover:bg-gold transition-all cursor-pointer group">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#D32323] group-hover:fill-ink transition-colors">
                    <path d="M20.16 12.73l-4.703 1.14c-.778.189-1.476-.555-1.085-1.288l2.348-4.282c.415-.757 1.474-.655 1.752.1l2.355 4.142c.278.756-.11 1.188-.667 1.188zM10.586 3.21L9.15 8.267c-.23.827.577 1.562 1.37 1.227l4.595-1.95c.793-.336.858-1.42.106-1.87L11.9 3.128c-.752-.448-1.314-.018-1.314.082zm-3.8 12.418l4.32-2.227c.714-.368.7-1.43-.022-1.782l-4.303-2.12c-.722-.355-1.463.275-1.288 1.055l.854 3.987c.175.78 1.44 1.087 1.44.087zM9.71 16.97l-4.58 1.318c-.764.22-.93 1.208-.287 1.676l3.51 2.543c.644.467 1.51-.01 1.518-.8l.07-4.16c.007-.79-.231-1.577-.23-.577zm5.14 3.896l-3.073-3.1c-.51-.512-1.4-.224-1.514.483l-.657 4.135c-.114.707.638 1.25 1.254.903l3.73-2.035c.616-.347.765-1.03.26-1.386z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h5 className="font-bold mb-6 text-ink">Services</h5>
              <ul className="space-y-3 text-sm text-ink/50">
                <li><a href="#services" className="hover:text-gold transition-colors">Plumbing</a></li>
                <li><a href="#services" className="hover:text-gold transition-colors">Hot Water Heaters</a></li>
                <li><a href="#services" className="hover:text-gold transition-colors">Drain Cleaning</a></li>
                <li><a href="#services" className="hover:text-gold transition-colors">Gasfitting</a></li>
                <li><a href="#services" className="hover:text-gold transition-colors">Gas Leak Detection</a></li>
                <li><a href="#services" className="hover:text-gold transition-colors">Furnaces & Boilers</a></li>
                <li><a href="#services" className="hover:text-gold transition-colors">Air Conditioning</a></li>
                <li><a href="#services" className="hover:text-gold transition-colors">In Floor Radiant Heating</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold mb-6 text-ink">Contact</h5>
              <ul className="space-y-4 text-sm text-ink/50">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-gold shrink-0" />
                  <span>4516 - 19 Avenue SW<br />Calgary, Alberta T3E 0H1</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-gold shrink-0" />
                  <a href="tel:4035609065" className="hover:text-gold transition-colors">403-560-9065</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-gold shrink-0" />
                  <a href="mailto:boland@shaw.ca" className="hover:text-gold transition-colors">boland@shaw.ca</a>
                </li>
                <li className="flex items-center gap-3">
                  <Clock size={18} className="text-gold shrink-0" />
                  <span>Mon - Fri: 8am - 6pm <br /> 24/7 Emergency Service</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-ink/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-ink/30">
            <p>© 2026 Boland Mechanical Contractors Ltd. All Rights Reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-gold cursor-pointer transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-gold cursor-pointer transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-gold cursor-pointer transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
