import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import React from "react";
import {
  Code,
  Smartphone,
  TrendingUp,
  Palette,
  Cloud,
  Server,
  ShieldCheck,
  Globe,
  Mail,
  Wrench,
  BarChart,
  Check,
} from "lucide-react";
import SEO from '@/components/seo';


export default function Services() {
  // SEO optimization for services page
  useEffect(() => {
    document.title = "Web Development & Digital Marketing Services in Nigeria | Achek";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Professional web development, mobile app development, digital marketing, UI/UX design, and cloud solutions in Nigeria. Custom websites, e-commerce, SEO services, and more.');
    }

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://achek.com.ng/services';
  }, []);

  // JSON-LD structured data for Organization and Service
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Achek Digital Solutions",
    "url": "https://achek.com.ng",
    "logo": "https://achek.com.ng/achek-logo.png",
    "sameAs": [
      "https://twitter.com/AchekOfficial",
      "https://www.linkedin.com/company/achek-digital-solutions/"
    ],
    "description": "Comprehensive digital services including web development, mobile app development, AI solutions, digital marketing, and more. Professional services in Nigeria and across Africa.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+2348104040841",
      "contactType": "customer service",
      "areaServed": "NG",
      "availableLanguage": ["English"]
    },
    "makesOffer": [
      {
        "@type": "Service",
        "name": "Web Development",
        "description": "Custom websites and web applications built with modern technologies like React, Next.js, and Node.js.",
        "areaServed": "NG"
      },
      {
        "@type": "Service",
        "name": "Mobile Apps",
        "description": "Native and cross-platform mobile applications for iOS and Android using React Native and Flutter.",
        "areaServed": "NG"
      },
      {
        "@type": "Service",
        "name": "Digital Marketing",
        "description": "Comprehensive digital marketing strategies including SEO, social media, and paid advertising.",
        "areaServed": "NG"
      },
      {
        "@type": "Service",
        "name": "WhatsApp Bot Development",
        "description": "Automate customer engagement and support with custom WhatsApp bots using Baileys.",
        "areaServed": "NG"
      }
      // ...add more services as needed
    ]
  };

  const services = [
    {
      icon: Code,
      title: "Web Development",
      description:
        "Custom websites and web applications built with modern technologies like React, Next.js, and Node.js.",
      features: ["Responsive Design", "SEO Optimization", "Performance Optimization"],
    },
    {
      icon: Smartphone,
      title: "Mobile Apps",
      description:
        "Native and cross-platform mobile applications for iOS and Android using React Native and Flutter.",
      features: ["Cross-Platform", "Native Performance", "App Store Deployment"],
    },
    {
      icon: TrendingUp,
      title: "Digital Marketing",
      description:
        "Comprehensive digital marketing strategies including SEO, social media, and paid advertising.",
      features: ["SEO & SEM", "Social Media Marketing", "Analytics & Reporting"],
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description:
        "User-centered design solutions that enhance user experience and drive conversions.",
      features: ["User Research", "Wireframing & Prototyping", "Design Systems"],
    },
    {
      icon: Cloud,
      title: "Cloud Solutions",
      description:
        "Scalable cloud infrastructure and deployment solutions using AWS, Google Cloud, and Azure.",
      features: ["Cloud Migration", "DevOps & CI/CD", "Monitoring & Security"],
    },
    {
      icon: Server,
      title: "Hosting Services",
      description:
        "Reliable web hosting solutions with high uptime, security, and expert support for your business.",
      features: ["99.9% Uptime Guarantee", "SSL Security", "24/7 Expert Support"],
    },
    {
      icon: Globe,
      title: "Domain Registration",
      description:
        "Secure your online identity with fast, affordable domain registration and management.",
      features: ["Wide Domain Choices", "Easy Management", "DNS Support"],
    },
    {
      icon: Mail,
      title: "Email Hosting",
      description:
        "Professional business email hosting for your brand, with spam protection and easy setup.",
      features: ["Custom Domains", "Spam Protection", "Webmail & Mobile Access"],
    },
    {
      icon: Wrench,
      title: "Website Maintenance",
      description:
        "Ongoing website updates, backups, and technical support to keep your site running smoothly.",
      features: ["Regular Updates", "Backups", "Technical Support"],
    },
    {
      icon: ShieldCheck,
      title: "Cybersecurity",
      description:
        "Protect your business with advanced security solutions, malware scanning, and SSL certificates.",
      features: ["Malware Scanning", "SSL Certificates", "Firewall Protection"],
    },
    {
      icon: BarChart,
      title: "Analytics & Optimization",
      description:
        "Track, analyze, and optimize your website’s performance and conversions with expert insights.",
      features: ["Google Analytics", "Conversion Tracking", "Performance Reports"],
    },
    // --- Added Services ---
    {
      icon: Palette,
      title: "Branding & Identity Design",
      description: "Build a memorable brand with professional logo, color palette, and brand guidelines.",
      features: ["Logo Design", "Brand Guidelines", "Business Cards & Collateral"],
    },
    {
      icon: Code,
      title: "Custom Software Development",
      description: "Tailored software solutions to automate, streamline, and grow your business.",
      features: ["Business Automation", "CRM Integration", "Custom APIs"],
    },
    {
      icon: Mail,
      title: "Email Marketing & Automation",
      description: "Engage your audience with targeted email campaigns and automated workflows.",
      features: ["Campaign Design", "Automation", "Analytics & Reporting"],
    },
    {
      icon: BarChart,
      title: "Business Intelligence & Data Analytics",
      description: "Unlock insights from your data to drive smarter business decisions.",
      features: ["Dashboards", "Data Visualization", "KPI Tracking"],
    },
    {
      icon: Smartphone,
      title: "Online Learning Platforms (LMS)",
      description: "Launch your own e-learning platform with course management, quizzes, and student tracking.",
      features: ["Course Management", "Student Analytics", "Payment Integration"],
    },
    {
      icon: Code,
      title: "API Development & Integration",
      description: "Connect your systems and automate workflows with robust API solutions.",
      features: ["REST & GraphQL APIs", "Third-Party Integrations", "Secure Authentication"],
    },
    {
      icon: Smartphone,
      title: "Payment Gateway Integration",
      description: "Accept online payments securely with seamless gateway integration for your website or app.",
      features: ["Paystack, Flutterwave, Stripe", "PCI Compliance", "Automated Receipts"],
    },
    {
      icon: Palette,
      title: "Content Creation & Copywriting",
      description: "Professional content and copywriting services to boost your brand and SEO.",
      features: ["Blog Posts", "Website Copy", "Ad Copywriting"],
    },
    {
      icon: Code,
      title: "IT Consulting & Strategy",
      description: "Expert advice and digital strategy to help your business grow and stay secure.",
      features: ["IT Roadmaps", "Security Audits", "Tech Support"],
    },
    {
      icon: Smartphone,
      title: "Video Production & Animation",
      description: "Engage your audience with professional video content and animations for your brand.",
      features: ["Explainer Videos", "Product Demos", "Social Media Clips"],
    },
    {
      icon: Cloud,
      title: "Virtual Events & Webinar Platforms",
      description: "Host virtual events, webinars, and conferences with interactive features and analytics.",
      features: ["Live Streaming", "Q&A & Polls", "Event Analytics"],
    },
    {
      icon: Smartphone,
      title: "WhatsApp Bot Development",
      description: "Automate customer engagement and support with custom WhatsApp bots using Baileys. Integrate with your business systems for instant responses, order tracking, and more.",
      features: ["24/7 Customer Support", "Order & Booking Automation", "Business System Integration", "Broadcast Messaging", "Secure & Compliant"],
    },
  ];

  return (
    <div className="pt-16" data-testid="services-page">
      <SEO
        title="Our Services - Web Development, Mobile Apps & Digital Marketing | Achek Digital Solutions"
        description="Comprehensive digital services including web development, mobile app development, AI solutions, digital marketing, and more. Professional services in Nigeria and across Africa."
        canonical="https://achek.com.ng/services"
        keywords="web development services Nigeria, mobile app development services, AI solutions Nigeria, digital marketing services, e-commerce development, custom software development, UI/UX design services Nigeria"
      />
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="services-title">
              Our Services
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive digital solutions to elevate your business and reach
              your goals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="p-8 border border-border transition-all duration-300 hover:shadow-2xl hover:border-primary hover:bg-primary/5 group relative"
                style={{ boxShadow: '0 0 0 rgba(0,0,0,0)', transition: 'box-shadow 0.3s' }}
                data-testid={`service-card-${index}`}
              >
                <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 group-hover:shadow-[0_0_32px_4px_rgba(59,130,246,0.25)] transition-all duration-300"></span>
                <CardContent className="p-0 relative z-10">
                  <div className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center mb-6 group-hover:shadow-[0_0_16px_4px_rgba(59,130,246,0.5)] transition-all duration-300">
                    <service.icon className="h-6 w-6 text-white group-hover:text-primary group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.7)] transition-all duration-300" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <ul className="space-y-2 text-sm">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="h-4 w-4 text-primary mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16">
            <h2 className="text-3xl font-bold mb-8">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss your project and see how we can help bring your vision
              to life with our comprehensive digital solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="gradient-bg text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg"
                  data-testid="contact-us-button"
                >
                  Contact Us Today
                </Button>
              </Link>
              <Link href="/pricing">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 rounded-xl font-semibold"
                  data-testid="view-pricing-button"
                >
                  View Pricing Plans
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}