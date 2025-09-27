import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "@/contexts/theme-provider";
import { Menu, Moon, Sun, Youtube, Twitter, Linkedin } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/pricing", label: "Pricing" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const socialLinks = [
    { href: "https://www.youtube.com/@AchekOfficial", icon: Youtube },
    { href: "https://x.com/AchekOfficial", icon: Twitter },
    { href: "https://www.linkedin.com/company/achek", icon: Linkedin },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-effect shadow-lg" : "glass-effect"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src="/achek-logo.png"
              alt="Achek Digital Solutions"
              className="h-12 sm:h-14 md:h-16 w-auto max-w-[160px]"
              loading="eager"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 ml-6 flex-1 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`hover:text-primary transition-colors px-3 py-2 rounded-md text-sm lg:text-base font-medium ${
                  location === link.href ? "text-primary" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contact?tab=quote">
              <Button className="gradient-bg text-white px-4 py-2 rounded-lg font-semibold hover:scale-105 transition-transform shadow-md">
                Get Quote
              </Button>
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-3 md:space-x-4 flex-shrink-0">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2 rounded-lg hover:bg-accent transition-colors"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5 md:h-6 md:w-6" />
              ) : (
                <Sun className="h-5 w-5 md:h-6 md:w-6" />
              )}
            </Button>

            {/* Social Links */}
            <div className="hidden md:flex items-center space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors p-1"
                >
                  <social.icon className="h-5 w-5 md:h-6 md:w-6" />
                </a>
              ))}
            </div>

            {/* Mobile Menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden p-2">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[360px]">
                <div className="flex flex-col space-y-6 mt-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`text-lg font-medium hover:text-primary transition-colors ${
                        location === link.href ? "text-primary" : ""
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link href="/contact?tab=quote">
                    <Button className="gradient-bg text-white px-4 py-2 rounded-lg font-semibold hover:scale-105 transition-transform shadow-md">
                      Get Quote
                    </Button>
                  </Link>

                  {/* Mobile Socials */}
                  <div className="flex space-x-4 pt-6">
                    {socialLinks.map((social) => (
                      <a
                        key={social.href}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <social.icon className="h-6 w-6" />
                      </a>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
