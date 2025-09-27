import { Link } from "wouter";
import { Youtube, Twitter, Linkedin, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/faq", label: "FAQ" },
    { href: "/blog", label: "Blog" },
    { href: "/admin/login", label: "Panel" },
  ];

  const services = [
    "Web Development",
    "Mobile Apps",
    "Digital Marketing",
    "UI/UX Design",
    "Cloud Solutions",
    "Hosting & Domains",
    "Email Hosting",
    "Maintenance",
    "Cybersecurity",
    "Analytics",
  ];

  const socialLinks = [
    { href: "https://www.youtube.com/@AchekOfficial", icon: Youtube, label: "YouTube" },
    { href: "https://x.com/AchekOfficial", icon: Twitter, label: "Twitter" },
    { href: "https://www.linkedin.com/company/achek", icon: Linkedin, label: "LinkedIn" },
    { href: "https://www.instagram.com/achekofficial", icon: Instagram, label: "Instagram" },
    { href: "https://web.facebook.com/AchekOfficial/", icon: Facebook, label: "Facebook" },
  ];

  return (
    <footer
      className="relative bg-gradient-to-br from-white via-indigo-50 to-purple-50 
                 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 
                 border-t border-border py-10 text-sm"
      data-testid="footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid md:grid-cols-4 gap-10 md:gap-6">
          {/* Logo & About */}
          <div className="md:col-span-1">
            <a href="/" className="group inline-block mb-3">
              <img
                src="/achek-logo.png"
                alt="Achek Digital Solutions"
                className="h-14 md:h-16 w-auto transition-transform duration-200 
                           group-hover:scale-105 group-hover:drop-shadow-xl"
                loading="lazy"
              />
            </a>
            <p className="text-muted-foreground dark:text-gray-400 mb-3 leading-relaxed text-sm max-w-xs">
              Achek Digital Solutions is your trusted partner for{" "}
              <span className="text-primary font-medium">modern websites, apps, and cloud services</span>.  
              We deliver technology that grows with your business.
            </p>
            <div className="flex space-x-2">
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-md flex items-center justify-center
                             bg-gradient-to-tr from-primary to-secondary 
                             text-white hover:scale-110 transition-transform shadow-md"
                  aria-label={social.label}
                  data-testid={`footer-social-${social.label.toLowerCase()}`}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wide text-xs">
              Quick Links
            </h3>
            <ul className="space-y-1.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors text-sm"
                    data-testid={`footer-link-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wide text-xs">
              Services
            </h3>
            <ul className="space-y-1.5">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-muted-foreground dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors text-sm cursor-pointer">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / Extra */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wide text-xs">
              Contact
            </h3>
            <ul className="space-y-1.5 text-sm text-muted-foreground dark:text-gray-400">
              <li>
                Email:{" "}
                <a href="mailto:info@achek.com.ng" className="hover:text-primary">
                  info@achek.com.ng
                </a>
              </li>
              <li>
                Phone:{" "}
                <a href="tel:+2348104040841" className="hover:text-primary">
                  +234 810 404 0841
                </a>
              </li>
              <li>Location: Lagos, Nigeria</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-primary/20 via-secondary/20 to-transparent my-6" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground dark:text-gray-400 gap-3">
          <span>© {year} Achek Digital Solutions. All rights reserved.</span>
          <div className="flex items-center gap-3">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms
            </Link>
            <Link href="/cookie" className="hover:text-primary transition-colors">
              Cookies
            </Link>
          </div>
          <div className="flex items-center gap-1 text-primary/80 font-medium">
            <span>Made with ❤️ in Nigeria</span>
          </div>
        </div>
      </div>
    </footer>
  );
}