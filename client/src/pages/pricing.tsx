import { useState, useEffect, useRef, MouseEvent as ReactMouseEvent } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Link } from "wouter";
import { Check, Copy } from "lucide-react";
import SEO from "@/components/seo"; // Import the SEO component
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; // Import DialogTitle
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";


// Flutterwave type declaration
declare global {
  interface Window {
    FlutterwaveCheckout?: any;
  }
}

function CustomDropdown({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        className={`w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-base font-semibold shadow focus:outline-none focus:ring-2 focus:ring-primary flex items-center justify-between transition-all duration-300 ${open ? 'ring-2 ring-primary' : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{value}</span>
        <svg className={`ml-2 h-5 w-5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
      </button>
      <div
        className={`absolute left-0 right-0 z-[999] mt-2 bg-background border border-border rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${open ? 'max-h-96 opacity-100 scale-100' : 'max-h-0 opacity-0 scale-95 pointer-events-none'}`}
        style={{ boxShadow: open ? '0 8px 32px rgba(0,0,0,0.12)' : undefined, zIndex: 999 }}
        role="listbox"
      >
        {options.map((opt) => (
          <button
            key={opt}
            className={`w-full text-left px-6 py-3 text-base font-medium transition-colors duration-200 hover:bg-primary/10 focus:bg-primary/10 ${opt === value ? 'bg-primary/10 text-primary font-semibold' : 'text-foreground'}`}
            onClick={() => { onChange(opt); setOpen(false); }}
            role="option"
            aria-selected={opt === value}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Pricing() {
  // Load Flutterwave script on mount for instant payment modal
  useEffect(() => {
    loadFlutterwaveScript();
  }, []);
  // Flutterwave inline script loader
  function loadFlutterwaveScript() {
    if (!document.getElementById("flutterwave-inline-js")) {
      const script = document.createElement("script");
      script.id = "flutterwave-inline-js";
      script.src = "https://checkout.flutterwave.com/v3.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }
  // Service categories and pricing data
  const serviceCategories = [
    "Web Development",
    "Mobile Apps",
    "Digital Marketing",
    "UI/UX Design",
    "Hosting Services",
    "Domain Registration",
    "Email Hosting",
    "Website Maintenance",
    "Cybersecurity",
    "Analytics & Optimization",
    "About Project Type & Consulting",
  ];

  const services = [
    {
      name: "Basic Website",
      price: "₦80,000",
      description: "Up to 6 pages, responsive design, basic SEO, contact form.",
      features: ["Up to 6 pages", "Responsive Design", "Basic SEO", "Contact Form"],
    },
    {
      name: "Pro Website",
      price: "₦250,000+",
      description: "Up to 15 pages, advanced SEO, blog/news section, performance optimization, custom integrations.",
      features: ["Up to 15 pages", "Advanced SEO", "Blog/News Section", "Performance Optimization", "Custom Integrations"],
    },
    {
      name: "Enterprise Website",
      price: "₦800,000+",
      description: "30+ pages, e-commerce, custom features, API integrations, dedicated support.",
      features: ["30+ pages", "E-commerce", "Custom Features", "API Integrations", "Dedicated Support"],
    },
    {
      name: "Mobile Apps",
      price: "Custom Quote",
      description: "Native and cross-platform mobile applications for iOS and Android. Pricing based on features.",
      features: ["Android/iOS", "Cross-Platform", "Custom Features", "App Store Deployment"],
    },
    {
      name: "Digital Marketing",
      price: "₦30,000+",
      description: "Comprehensive digital marketing strategies including SEO, social media, and paid advertising.",
      features: ["SEO & SEM", "Social Media Marketing", "Analytics & Reporting"],
    },
    {
      name: "UI/UX Design",
      price: "₦40,000+",
      description: "User-centered design solutions that enhance user experience.",
      features: ["User Research", "Wireframing & Prototyping", "Design Systems"],
    },
    {
      name: "Hosting Services",
      price: "₦10,000/yr",
      description: "Reliable web hosting solutions with high uptime and security.",
      features: ["99.9% Uptime Guarantee", "SSL Security", "24/7 Expert Support"],
    },
    {
      name: "Domain Registration",
      price: "₦3,000/yr",
      description: "Fast, affordable domain registration and management.",
      features: ["Wide Domain Choices", "Easy Management", "DNS Support"],
    },
    {
      name: "Email Hosting",
      price: "₦5,000/yr",
      description: "Professional business email hosting for your brand.",
      features: ["Custom Domains", "Spam Protection", "Webmail & Mobile Access"],
    },
    {
      name: "Website Maintenance",
      price: "₦15,000/yr",
      description: "Ongoing website updates, backups, and technical support.",
      features: ["Regular Updates", "Backups", "Technical Support"],
    },
    {
      name: "Cybersecurity",
      price: "₦20,000+",
      description: "Advanced security solutions, malware scanning, and SSL certificates.",
      features: ["Malware Scanning", "SSL Certificates", "Firewall Protection"],
    },
    {
      name: "Analytics & Optimization",
      price: "₦25,000+",
      description: "Track, analyze, and optimize your website’s performance.",
      features: ["Google Analytics", "Conversion Tracking", "Performance Reports"],
    },
    {
      name: "Consulting",
      price: "₦30,000+",
      description: "Expert guidance on project scoping, technology selection, and business consulting for digital transformation.",
      features: ["Project Scoping", "Tech Stack Advice", "Business Consulting", "Strategy Sessions"],
    },
    // WhatsApp Bot Development Service
    {
      name: "WhatsApp Bot Development",
      price: "Custom Quote",
      description: "Automate customer engagement and support with custom WhatsApp bots using Baileys. Contact us on WhatsApp for a quote.",
      features: [
        "24/7 Customer Support",
        "Order & Booking Automation",
        "Business System Integration",
        "Broadcast Messaging",
        "Secure & Compliant"
      ],
      whatsapp: true,
    },
  ];

  // Add package tiers for Web Development and Mobile App
  const servicePackages: Record<string, Array<{ name: string; price: string; features: string[]; description: string }>> = {
    "Web Development": [
      {
        name: "Basic Website",
        price: "₦80,000",
        features: ["Up to 6 pages", "Responsive Design", "Basic SEO", "Contact Form"],
        description: "Ideal for small businesses or personal websites.",
      },
      {
        name: "Pro Website",
        price: "₦250,000",
        features: ["Up to 15 pages", "Advanced SEO", "Blog/News Section", "Performance Optimization", "Custom Integrations"],
        description: "Perfect for growing businesses needing extra features.",
      },
      {
        name: "Enterprise Website",
        price: "₦800,000+",
        features: ["30+ pages", "E-commerce", "Custom Features", "API Integrations", "Dedicated Support"],
        description: "Fully custom solutions with advanced integrations and dedicated support.",
      },
    ],
    "Mobile Apps": [
      {
        name: "Basic App",
        price: "₦150,000",
        features: ["Up to 6 screens", "Essential Features", "Single Platform (iOS or Android)", "Simple UI"],
        description: "Simple app with essential features for one platform.",
      },
      {
        name: "Pro App",
        price: "₦450,000",
        features: ["Up to 15 screens", "Cross-Platform", "Advanced Functionality", "User Authentication"],
        description: "Cross-platform app with advanced functionality.",
      },
      {
        name: "Enterprise App",
        price: "₦1,000,000+",
        features: ["30+ screens", "Custom Integrations", "Scalable Backend", "Analytics", "Dedicated Support"],
        description: "Fully custom scalable app with analytics and dedicated support.",
      },
    ],
    "Digital Marketing": [
      {
        name: "SEO & SEM",
        price: "₦50,000/mo",
        features: ["Search Engine Optimization", "Ad Campaign Optimization"],
        description: "Improve visibility on search engines and optimize ad campaigns.",
      },
      {
        name: "Social Media Marketing",
        price: "₦50,000/mo",
        features: ["Strategy", "Content Creation", "Engagement"],
        description: "Strategy, content, and engagement across platforms.",
      },
      {
        name: "Analytics & Reporting",
        price: "₦25,000/mo",
        features: ["Performance Tracking", "Conversion Reports"],
        description: "Track and optimize performance with reports.",
      },
    ],
    "UI/UX Design": [
      {
        name: "Basic UI/UX",
        price: "₦40,000",
        features: ["Wireframes", "Simple Interface Design"],
        description: "Wireframes and simple interface design for small projects.",
      },
      {
        name: "Pro UI/UX",
        price: "₦100,000",
        features: ["Advanced Interface", "Prototype Design"],
        description: "Advanced interface and prototype design for medium projects.",
      },
      {
        name: "Enterprise UI/UX",
        price: "₦250,000+",
        features: ["Full Design System", "UX Strategy"],
        description: "Full design system and user experience strategy for complex platforms.",
      },
    ],
    "Hosting Services": [
      {
        name: "Standard Hosting",
        price: "₦15,000/yr",
        features: ["SSL", "99.9% Uptime", "Reliable Hosting"],
        description: "Reliable hosting with SSL and 99.9% uptime.",
      },
      {
        name: "Advanced Hosting",
        price: "₦40,000/yr",
        features: ["Extra Resources", "Scalability"],
        description: "Extra resources for growing websites.",
      },
      {
        name: "Enterprise Hosting",
        price: "₦100,000+/yr",
        features: ["Dedicated Hosting", "Maximum Performance", "Priority Support"],
        description: "Dedicated hosting with maximum performance and support.",
      },
    ],
    "Domain Registration": [
      {
        name: "Standard Domain",
        price: "₦10,000/yr",
        features: ["Affordable Registration"],
        description: "Affordable domain registration.",
      },
      {
        name: "Premium Domain",
        price: "₦15,000/yr",
        features: ["Highly Sought-After Domains"],
        description: "Highly sought-after domains.",
      },
      {
        name: "Enterprise Domain Portfolio",
        price: "₦20,000+/yr",
        features: ["Multiple Domain Management"],
        description: "Multiple domain management for businesses.",
      },
    ],
    "Email Hosting": [
      {
        name: "Basic Email",
        price: "₦5,000/yr",
        features: ["Custom Business Email", "Small Teams"],
        description: "Custom business email for small teams.",
      },
      {
        name: "Pro Email",
        price: "₦15,000/yr",
        features: ["Multiple Accounts", "Advanced Spam Protection"],
        description: "Multiple accounts with advanced spam protection.",
      },
      {
        name: "Enterprise Email",
        price: "₦50,000+/yr",
        features: ["Full Email Suite", "Large Organizations"],
        description: "Full email suite for large organizations.",
      },
    ],
    "Website Maintenance": [
      {
        name: "Basic Maintenance",
        price: "₦15,000/yr",
        features: ["Updates", "Backups"],
        description: "Updates and backups for small sites.",
      },
      {
        name: "Pro Maintenance",
        price: "₦50,000/yr",
        features: ["Regular Updates", "Security", "Optimizations"],
        description: "Regular updates, security, and optimizations.",
      },
      {
        name: "Enterprise Maintenance",
        price: "₦150,000+/yr",
        features: ["Full Support", "Performance Monitoring", "Priority Service"],
        description: "Full support, performance monitoring, and priority service.",
      },
    ],
    "Cybersecurity": [
      {
        name: "Basic Security",
        price: "₦20,000",
        features: ["Malware Scanning", "SSL Certificates"],
        description: "Malware scanning and SSL certificates.",
      },
      {
        name: "Pro Security",
        price: "₦60,000",
        features: ["Advanced Protection", "Firewall Setup"],
        description: "Advanced protection and firewall setup.",
      },
      {
        name: "Enterprise Security",
        price: "₦150,000+",
        features: ["Comprehensive Security", "Large Platforms"],
        description: "Comprehensive security solutions for large platforms.",
      },
    ],
    "About Project Type & Consulting": [
      {
        name: "Basic Consulting",
        price: "₦30,000",
        features: ["Guidance for Small Projects", "Startups"],
        description: "Guidance for small projects or startups.",
      },
      {
        name: "Pro Consulting",
        price: "₦80,000",
        features: ["Strategy", "Tech Stack Advice", "Project Planning"],
        description: "Strategy, tech stack advice, and project planning.",
      },
      {
        name: "Enterprise Consulting",
        price: "₦200,000+",
        features: ["Full Business Consulting", "Digital Transformation"],
        description: "Full business and technology consulting for large-scale digital transformation.",
      },
    ],
  };

  // Modal state for payment
  const [showModal, setShowModal] = useState(false);
  type Service = {
    name: string;
    price: string;
    description: string;
    features: string[];
  };
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [form, setForm] = useState({ name: "", email: "", whatsapp: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Dummy Paystack integration (replace with real API later)
  // Flutterwave payment integration
  const handlePay = async () => {
    setLoading(true);
    loadFlutterwaveScript();
    const amount = parseInt((selectedService?.price ?? "").replace(/[^\d]/g, "")) || 1000;
    // Wait for script to load
    const interval = setInterval(() => {
      if (window.FlutterwaveCheckout) {
        clearInterval(interval);
        window.FlutterwaveCheckout({
          public_key: "FLWPUBK-5083d4f7555df2910db281d565bce8a5-X",
          tx_ref: `ACHK-${Date.now()}`,
          amount: amount,
          currency: "NGN",
          payment_options: "card,banktransfer,ussd",
          customer: {
            email: form.email,
            whatsapp: form.whatsapp,
            name: form.name,
          },
          customizations: {
            title: "Achek Digital Solutions",
            description: `Payment for ${selectedService?.name}`,
            // Use local logo for reliability
            logo: "/achek-logo.png",
          },
          callback: function (response) {
            setLoading(false);
            setSuccess(true);
            // Send receipt to email via backend
            fetch("/api/send-receipt", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: form.email,
                name: form.name,
                whatsapp: form.whatsapp,
                service: selectedService?.name,
                package: selectedService?.name,
                amount: amount,
              }),
            });
          },
          onclose: function () {
            setLoading(false);
          },
        });
      }
    }, 300);
  };

  // Category filter state
  const [selectedCategory, setSelectedCategory] = useState<string>(serviceCategories[0]);

  return (
    <div className="pt-16" data-testid="pricing-page">
      <SEO
        title="Pricing - Affordable Web Development & Digital Services | Achek Digital Solutions"
        description="Transparent pricing for web development, mobile apps, and digital marketing services in Nigeria. Get quality solutions at competitive rates. Request custom quote today!"
        canonical="https://achek.com.ng/pricing"
        keywords="web development pricing Nigeria, mobile app development cost, digital marketing pricing, affordable web development Nigeria, custom software development pricing, website cost Nigeria"
      />
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-shimmer" data-testid="pricing-title">
              Service Pricing
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Choose the service you need and pay securely online. Your team will contact you immediately to deliver your selected service and send a receipt to your email.
            </p>
            {/* Responsive Category Selector */}
            <div className="mt-8 w-full flex flex-col items-center">
              {/* Mobile: Custom Animated Dropdown */}
              <div className="block md:hidden w-full max-w-xs animate-fade-in relative z-[1000]" data-testid="category-dropdown">
                <CustomDropdown
                  options={serviceCategories}
                  value={selectedCategory}
                  onChange={setSelectedCategory}
                />
              </div>
              {/* Desktop: Button Group */}
              <div className="hidden md:flex flex-wrap justify-center gap-3 animate-fade-in">
                {serviceCategories.map((cat) => (
                  <button
                    key={cat}
                    className={`px-6 py-2 rounded-full font-semibold border transition-colors duration-200 focus:outline-none text-base shadow-sm ${selectedCategory === cat ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg" : "bg-background text-foreground border-border hover:bg-primary/10"}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Service tiers for selected category */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 py-8 justify-items-center">
            {(servicePackages[selectedCategory] || []).map((pkg, pkgIdx) => (
              <Card
                key={pkgIdx}
                className={`w-full max-w-xs p-8 bg-background border border-border shadow-xl rounded-2xl flex-shrink-0 transition-transform duration-500 hover:scale-105 hover:shadow-2xl hover:border-primary/70 animate-fade-in ${pkgIdx === 1 ? "border-2 border-primary" : ""}`}
              >
                <CardContent className="p-0">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-2xl font-bold text-primary animate-glow-modern">{pkg.name}</h4>
                    {pkgIdx === 1 && (
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-xs font-semibold shadow">Most Popular</span>
                    )}
                    {pkgIdx === 2 && (
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-semibold shadow">Recommended</span>
                    )}
                  </div>
                  <div className="text-3xl font-extrabold mb-4 text-foreground">
                    <span className="inline-block px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 font-bold text-lg animate-glow-modern text-white">
                      {pkg.price}
                    </span>
                  </div>
                  <ul className="space-y-3 mb-4">
                    {pkg.features.map((f, fIdx) => (
                      <li key={fIdx} className="flex items-center animate-fade-in">
                        <Check className="h-5 w-5 text-primary mr-2 animate-pulse" />
                        <span className="text-foreground text-base">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full py-3 rounded-xl font-semibold gradient-bg text-white mt-2 transition-transform duration-300 hover:scale-105 animate-fade-in text-lg"
                    onClick={() => {
                      setSelectedService({
                        name: pkg.name,
                        price: pkg.price,
                        features: pkg.features,
                        description: pkg.description,
                      });
                      setShowModal(true);
                      setSuccess(false);
                    }}
                  >
                    Pay Now
                  </Button>
                </CardContent>
              </Card>
            ))}
            {/* WhatsApp Bot Development Card */}
            <Card className="w-full max-w-xs p-8 bg-background border border-border shadow-xl rounded-2xl flex-shrink-0 transition-transform duration-500 hover:scale-105 hover:shadow-2xl hover:border-green-500 animate-fade-in">
              <CardContent className="p-0">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-2xl font-bold text-green-700 animate-glow-modern">WhatsApp Bot Development</h4>
                  <span className="px-3 py-1 rounded-full bg-green-500 text-white text-xs font-semibold shadow">Custom Quote</span>
                </div>
                <div className="text-lg font-extrabold mb-4 text-foreground">
                  <span className="inline-block px-4 py-2 rounded-xl bg-gradient-to-r from-green-400 to-green-600 font-bold text-lg animate-glow-modern text-white">
                    Custom Quote
                  </span>
                </div>
                <ul className="space-y-3 mb-4">
                  <li className="flex items-center animate-fade-in"><Check className="h-5 w-5 text-green-600 mr-2 animate-pulse" /><span>24/7 Customer Support</span></li>
                  <li className="flex items-center animate-fade-in"><Check className="h-5 w-5 text-green-600 mr-2 animate-pulse" /><span>Order & Booking Automation</span></li>
                  <li className="flex items-center animate-fade-in"><Check className="h-5 w-5 text-green-600 mr-2 animate-pulse" /><span>Business System Integration</span></li>
                  <li className="flex items-center animate-fade-in"><Check className="h-5 w-5 text-green-600 mr-2 animate-pulse" /><span>Broadcast Messaging</span></li>
                  <li className="flex items-center animate-fade-in"><Check className="h-5 w-5 text-green-600 mr-2 animate-pulse" /><span>Secure & Compliant</span></li>
                </ul>
                <a
                  href="https://wa.me/234XXXXXXXXXX?text=Hi%20Achek%2C%20I%20am%20interested%20in%20WhatsApp%20Bot%20Development"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block py-3 rounded-xl font-semibold bg-green-500 text-white mt-2 text-center transition-transform duration-300 hover:scale-105 animate-fade-in text-lg shadow-lg"
                  style={{ textDecoration: 'none' }}
                  data-testid="whatsapp-bot-contact-btn"
                >
                  Contact on WhatsApp
                </a>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-16">
            <p className="text-muted-foreground mb-4 text-lg">
              All services include <span className="font-semibold text-primary">free consultation</span> and project planning
            </p>
            <Link href="/contact">
              <Button
                variant="ghost"
                className="text-primary hover:underline font-medium text-lg"
                data-testid="custom-solution-link"
              >
                Need a custom solution? Contact us →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Payment Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md" aria-describedby="payment-dialog-description">
          <DialogHeader>
            <DialogTitle className="sr-only">Payment Information</DialogTitle>
          </DialogHeader>
          <div id="payment-dialog-description" className="text-center space-y-4">
              {!success ? (
                <>
                  <h2 className="text-2xl font-bold mb-4 text-foreground" id="modal-title">Pay for {selectedService?.name}</h2>
                  <p className="mb-4 text-muted-foreground">Fill in your details. You'll receive a receipt and our team will contact you immediately after payment.</p>
                  <form
                    className="space-y-4"
                    onSubmit={e => {
                      e.preventDefault();
                      handlePay();
                    }}
                  >
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      className="w-full px-4 py-3 rounded-lg border bg-background text-foreground"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                    />
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      className="w-full px-4 py-3 rounded-lg border bg-background text-foreground"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                    />
                    <input
                      type="tel"
                      required
                      placeholder="WhatsApp Number"
                      className="w-full px-4 py-3 rounded-lg border bg-background text-foreground"
                      value={form.whatsapp}
                      onChange={e => setForm({ ...form, whatsapp: e.target.value })}
                    />
                    <Button
                      type="submit"
                      className="w-full py-3 rounded-xl font-semibold gradient-bg text-white dark:text-white"
                      disabled={loading}
                    >
                      {loading ? "Processing..." : `Pay ₦${selectedService?.price.replace(/[^\d]/g, "")}`}
                    </Button>
                  </form>
                  <Button
                    variant="ghost"
                    className="mt-4 w-full text-foreground dark:text-foreground"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">Payment Successful!</h2>
                  <p className="mb-4 text-foreground">A receipt has been sent to <span className="font-semibold">{form.email}</span>.<br />Our team will contact you immediately to deliver your service.</p>
                  <Button
                    className="w-full py-3 rounded-xl font-semibold gradient-bg text-white dark:text-white mb-2"
                    onClick={() => {
                      // Create a simple receipt for download
                      const receiptHtml = `
                        <div style='font-family:Segoe UI,Arial,sans-serif;max-width:480px;margin:auto;padding:32px;'>
                          <img src='/achek-logo.png' alt='Achek Logo' style='max-width:120px;display:block;margin-bottom:16px;' />
                          <h2 style='color:#1d4ed8;'>Payment Receipt</h2>
                          <p><strong>Name:</strong> ${form.name}</p>
                          <p><strong>Email:</strong> ${form.email}</p>
                          <p><strong>Service:</strong> ${selectedService?.name}</p>
                          <p><strong>Amount Paid:</strong> ₦${selectedService?.price.replace(/[^\d]/g, "")}</p>
                          <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
                          <hr style='margin:24px 0;' />
                          <p>Thank you for your payment! Our team will contact you via WhatsApp to begin onboarding.</p>
                          <div style='margin-top:32px;font-size:12px;color:#888;text-align:center;'>Achek Digital Solutions &copy; 2025</div>
                        </div>
                      `;
                      const win = window.open('', 'Receipt', 'width=600,height=800');
                      win?.document.write(receiptHtml);
                      win?.document.close();
                      win?.focus();
                      win?.print();
                    }}
                  >
                    Download Receipt
                  </Button>
                  <Button
                    className="w-full py-3 rounded-xl font-semibold gradient-bg text-white dark:text-white"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground">Got questions? We've got answers.</p>
          </div>

          <div className="space-y-6">
            <Card className="p-6 bg-background text-foreground">
              <CardContent className="p-0">
                <h3 className="text-lg font-semibold mb-2">What's included in the support period?</h3>
                <p className="text-muted-foreground">Our support includes bug fixes, security updates, content updates, and technical assistance. We're here to ensure your website runs smoothly.</p>
              </CardContent>
            </Card>

            <Card className="p-6 bg-background text-foreground">
              <CardContent className="p-0">
                <h3 className="text-lg font-semibold mb-2">Can I upgrade my plan later?</h3>
                <p className="text-muted-foreground">Absolutely! You can upgrade your plan at any time. We'll work with you to transition smoothly and add the additional features you need.</p>
              </CardContent>
            </Card>

            <Card className="p-6 bg-background text-foreground">
              <CardContent className="p-0">
                <h3 className="text-lg font-semibold mb-2">Do you offer payment plans?</h3>
                <p className="text-muted-foreground">Yes, we offer flexible payment plans for all our packages. Contact us to discuss payment options that work for your budget.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* Animation & Glow CSS */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes glowModern {
          0% { text-shadow: 0 0 8px #818cf8, 0 0 16px #a5b4fc, 0 0 32px #c084fc; }
          50% { text-shadow: 0 0 24px #818cf8, 0 0 48px #a5b4fc, 0 0 64px #c084fc; }
          100% { text-shadow: 0 0 8px #818cf8, 0 0 16px #a5b4fc, 0 0 32px #c084fc; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.07); }
        }
        .animate-fade-in {
          animation: fadeIn 0.7s cubic-bezier(.4,0,.2,1) forwards;
        }
        .animate-glow-modern {
          animation: glowModern 1.5s ease-in-out infinite;
        }
        .animate-pulse {
          animation: pulse 1.2s cubic-bezier(.4,0,.2,1) infinite;
        }
      `}</style>
    </div>
  );
}