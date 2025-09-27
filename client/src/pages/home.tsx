import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Code, 
  Smartphone, 
  TrendingUp, 
  Star,
  CheckCircle2,
  Zap,
  Shield,
  Users,
  Clock,
  Globe,
  Award,
  Sparkles,
  Target,
  Rocket
} from "lucide-react";
import SEO from "@/components/seo";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState([0, 0, 0, 0]);
  const [animatedText, setAnimatedText] = useState("");
  const [typewriterState, setTypewriterState] = useState({
    wordIndex: 0,
    charIndex: 0,
    isDeleting: false,
  });
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart Nigeria",
      content: "Achek transformed our startup with an incredible website and mobile app. Our sales increased by 400% in just 3 months!",
      rating: 5
    },
    {
      name: "Michael Adebayo", 
      role: "Founder, Lagos Retail Chain",
      content: "Outstanding professional service! They delivered exactly what we needed on time and under budget. Highly recommended!",
      rating: 5
    },
    {
      name: "Grace Okafor",
      role: "Marketing Director, EduHub Africa",
      content: "Their digital marketing strategy helped us reach over 50,000 new customers across Nigeria. ROI increased by 300%!",
      rating: 5
    }
  ];

  // Auto-play testimonials every 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearTimeout(timer);
  }, [testimonialIndex, testimonials.length]);

  useEffect(() => {
    document.title = "Best Digital Agency Nigeria | Web Development, Mobile Apps & AI Solutions | Achek Digital";

    const metaDescription = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]'
    );
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "🚀 Nigeria's #1 Digital Agency | Expert Web Development, Mobile Apps, AI Solutions & Digital Marketing | 150+ Projects, 99% Success Rate | Transform Your Business Online Today with Achek Digital Solutions. Get Free Quote!"
      );
    }

    let canonical = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]'
    );
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = "https://achek.com.ng/";
  }, []);

  useEffect(() => {
    setIsVisible(true);

    // Animated counter effect
    const targets = [150, 50, 99, 5];
    const duration = 2500;
    const steps = 100;
    const interval = duration / steps;

    let frame = 0;
    const timer = setInterval(() => {
      frame++;
      setCounters(
        targets.map((t) => {
          const progress = Math.min(frame / steps, 1);
          const easeOut = 1 - Math.pow(1 - progress, 3);
          return Math.floor(t * easeOut);
        })
      );
      if (frame >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // Typewriter effect (refactored)
  useEffect(() => {
    const words = ["Professional", "Innovative", "Scalable", "Modern"];
    const { wordIndex, charIndex, isDeleting } = typewriterState;
    const currentWord = words[wordIndex];

    let timeout: NodeJS.Timeout;
    if (!isDeleting && charIndex < currentWord.length) {
      setAnimatedText(currentWord.substring(0, charIndex + 1));
      timeout = setTimeout(() => {
        setTypewriterState((prev) => ({ ...prev, charIndex: prev.charIndex + 1 }));
      }, 100);
    } else if (!isDeleting && charIndex === currentWord.length) {
      timeout = setTimeout(() => {
        setTypewriterState((prev) => ({ ...prev, isDeleting: true }));
      }, 1200);
    } else if (isDeleting && charIndex > 0) {
      setAnimatedText(currentWord.substring(0, charIndex - 1));
      timeout = setTimeout(() => {
        setTypewriterState((prev) => ({ ...prev, charIndex: prev.charIndex - 1 }));
      }, 50);
    } else if (isDeleting && charIndex === 0) {
      timeout = setTimeout(() => {
        setTypewriterState((prev) => ({
          wordIndex: (prev.wordIndex + 1) % words.length,
          charIndex: 0,
          isDeleting: false,
        }));
      }, 300);
    }
    return () => clearTimeout(timeout);
  }, [typewriterState]);

  const stats = [
    { value: counters[0], label: "Projects Completed", suffix: "+" },
    { value: counters[1], label: "Happy Clients", suffix: "+" },
    { value: counters[2], label: "Success Rate", suffix: "%" },
    { value: counters[3], label: "Years Experience", suffix: "+" },
  ];

  const features = [
    {
      icon: Code,
      title: "Web Development",
      description: "Custom websites & web applications built with modern technologies like React, Next.js, and Node.js for maximum performance.",
      highlights: ["React & Next.js", "E-commerce Platforms", "CMS Development", "API Integration"]
    },
    {
      icon: Smartphone,
      title: "Mobile App Development",
      description: "Native iOS & Android apps plus cross-platform solutions using React Native and Flutter for broader market reach.",
      highlights: ["iOS & Android", "React Native", "Flutter", "App Store Publishing"]
    },
    {
      icon: TrendingUp,
      title: "Digital Marketing & SEO",
      description: "Data-driven marketing strategies, SEO optimization, and social media management to boost your online visibility and sales.",
      highlights: ["Google Ads", "SEO Optimization", "Social Media", "Analytics & Reporting"]
    },
  ];

  const benefits = [
    { icon: Zap, title: "Lightning Fast Delivery", description: "Get your project delivered in weeks, not months" },
    { icon: Shield, title: "Bank-Level Security", description: "Enterprise-grade security with SSL, encryption & monitoring" },
    { icon: Users, title: "Expert Team of 20+", description: "Skilled developers, designers & marketers at your service" },
    { icon: Clock, title: "24/7 Premium Support", description: "Round-the-clock technical support and maintenance" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="Best Digital Agency Nigeria | Web Development, Mobile Apps & AI Solutions | Achek Digital"
        description="🚀 Nigeria's #1 Digital Agency | Expert Web Development, Mobile Apps, AI Solutions & Digital Marketing | 150+ Projects, 99% Success Rate | Transform Your Business Online Today with Achek Digital Solutions. Get Free Quote!"
        canonical="https://achek.com.ng/"
        keywords="best digital agency Nigeria, top web development company Lagos, mobile app development Nigeria, AI solutions Africa, digital marketing Nigeria, Achek Digital Solutions, website design Lagos, e-commerce development Nigeria, SEO services Nigeria, social media marketing Lagos, custom software development, React development Nigeria, Node.js developers Lagos, Flutter app development, business website Nigeria, online store development, digital transformation Nigeria, Caleb Onuche, young Nigerian entrepreneur, 17 year old CEO, tech startup Nigeria, innovative web solutions"
        ogType="website"
      />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center relative overflow-hidden pt-28 pb-16">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 opacity-30 -z-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 gradient-bg rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/30 rounded-full blur-3xl animate-pulse delay-500"></div>
          <div className="absolute top-20 right-20 w-64 h-64 bg-yellow-500/20 rounded-full blur-3xl animate-bounce"></div>
        </div>

        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 relative z-10 w-full">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left">
              <div className="mb-6">
                <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium animate-bounce">
                  🏆 Nigeria's #1 Digital Agency
                </Badge>
              </div>
              <h1
                className={`text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight transition-all duration-1000 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-shimmer">
                  {animatedText}
                </span>
                <br />
                <span className="text-foreground">Digital Solutions</span>
                <br />
                <span className="text-muted-foreground text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                  That Grow Your Business
                </span>
              </h1>
              <p
                className={`text-base sm:text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed transition-all duration-1000 delay-200 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                🚀 Transform your business with cutting-edge web development, mobile apps, AI solutions, and digital marketing. 
                We bring your vision to life with professional expertise and guaranteed results.
              </p>
              <div
                className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12 transition-all duration-1000 delay-400 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <Link href="/contact?tab=quote">
                  <Button
                    size="lg"
                    className="gradient-bg text-white px-8 py-4 rounded-xl font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group focus:ring-2 focus:ring-primary"
                    aria-label="Get Free Quote Today"
                  >
                    Get Free Quote Today
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/portfolio">
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-8 py-4 rounded-xl font-semibold text-lg border-2 hover:bg-accent transition-all duration-300 group focus:ring-2 focus:ring-secondary"
                    aria-label="View Our Amazing Work"
                  >
                    <Sparkles className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                    View Our Amazing Work
                  </Button>
                </Link>
              </div>
              {/* Trust Indicators */}
              <div
                className={`flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 mb-12 transition-all duration-1000 delay-600 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <div className="flex items-center gap-2 group hover:scale-105 transition-transform">
                  <CheckCircle2 className="h-5 w-5 text-green-500 group-hover:animate-bounce" />
                  <span className="text-sm text-muted-foreground font-medium">100% Money-back guarantee</span>
                </div>
                <div className="flex items-center gap-2 group hover:scale-105 transition-transform">
                  <Award className="h-5 w-5 text-yellow-500 group-hover:animate-bounce" />
                  <span className="text-sm text-muted-foreground font-medium">Award-winning team</span>
                </div>
                <div className="flex items-center gap-2 group hover:scale-105 transition-transform">
                  <Globe className="h-5 w-5 text-blue-500 group-hover:animate-bounce" />
                  <span className="text-sm text-muted-foreground font-medium">International standards</span>
                </div>
                <div className="flex items-center gap-2 group hover:scale-105 transition-transform">
                  <Target className="h-5 w-5 text-red-500 group-hover:animate-bounce" />
                  <span className="text-sm text-muted-foreground font-medium">99% Success rate</span>
                </div>
              </div>
              {/* Animated Stats */}
              <div
                className={`grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 transition-all duration-1000 delay-800 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                {stats.map((stat, index) => (
                  <div key={index} className="text-center lg:text-left group hover:scale-110 transition-transform duration-300">
                    <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-1 group-hover:animate-bounce">
                      {stat.value}
                      {stat.suffix}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Hero Image */}
            <div className="flex justify-center items-center w-full mt-6 lg:mt-0 lg:justify-end">
              <div className="relative group">
                <div className="absolute inset-0 gradient-bg rounded-3xl blur-3xl opacity-30 animate-pulse group-hover:opacity-50 transition-opacity"></div>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce delay-300"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-400 rounded-full animate-bounce delay-700"></div>
                <img
                  src="/mockup-image.png"
                  alt="Professional website and mobile app mockup showcasing modern design"
                  loading="lazy"
                  className="relative w-full max-w-xs sm:max-w-md lg:max-w-xl drop-shadow-2xl object-contain animate-float group-hover:scale-105 transition-transform duration-500"
                  style={{
                    aspectRatio: "16/10",
                    backgroundColor: "transparent",
                  }}
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-400 rounded-full animate-ping"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section (CTA) */}
      <section className="py-16 sm:py-20 lg:py-24 gradient-bg text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-yellow-300 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-4xl mx-auto px-2 sm:px-4 lg:px-8 text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 animate-glow">
            Ready to Transform Your Business?
          </h2>
          <p className="text-base sm:text-lg opacity-90 mb-6 leading-relaxed">
            Join 150+ satisfied clients who have grown their businesses with our digital solutions. 
            Get your free consultation today and see how we can help you achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/contact?tab=quote">
              <Button
                size="lg"
                variant="secondary"
                className="px-6 py-3 rounded-xl font-semibold text-base sm:text-lg hover:scale-105 transition-transform shadow-lg group bg-white text-primary hover:bg-gray-100 focus:ring-2 focus:ring-secondary"
                aria-label="Start Your Project Today"
              >
                <Rocket className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                Start Your Project Today
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button
                size="lg"
                variant="outline"
                className="px-6 py-3 rounded-xl font-semibold text-base sm:text-lg border-white text-white hover:bg-white hover:text-primary transition-all duration-300 group focus:ring-2 focus:ring-primary"
                aria-label="View Pricing Plans"
              >
                <Target className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                View Pricing Plans
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-40 h-40 bg-primary rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 bg-secondary rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <Badge variant="outline" className="mb-4 px-4 py-2 animate-bounce">
              🎯 Our Premium Services
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Why Choose Achek Digital?
            </h2>
            <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We combine technical expertise with creative innovation to deliver solutions that drive real business results and exceed expectations.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-16">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-8 hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 group hover:scale-105"
              >
                <CardContent className="p-0">
                  <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="space-y-2">
                    {feature.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-2 group/item hover:scale-105 transition-transform">
                        <CheckCircle2 className="h-4 w-4 text-green-500 group-hover/item:animate-bounce" />
                        <span className="text-sm text-muted-foreground">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <Link href="/services">
              <Button
                size="lg"
                className="gradient-bg text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg group focus:ring-2 focus:ring-primary"
                aria-label="Explore All Services"
              >
                <Rocket className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                Explore All Services
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              The Achek Advantage
            </h2>
            <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the difference with our professional approach and commitment to excellence.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2 animate-bounce">
              💬 Client Success Stories
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              What Our Clients Say
            </h2>
            <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Don't just take our word for it. See what our satisfied clients have to say about working with us.
            </p>
          </div>
          {/* Mobile: Carousel, Desktop: Grid */}
          <div className="block lg:hidden max-w-xl mx-auto text-center">
            <div className="relative">
              <Card className="p-6 shadow-xl">
                <CardContent>
                  <div className="flex items-center gap-1 mb-4 justify-center">
                    {[...Array(testimonials[testimonialIndex].rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed italic">
                    "{testimonials[testimonialIndex].content}"
                  </p>
                  <div>
                    <div className="font-semibold">{testimonials[testimonialIndex].name}</div>
                    <div className="text-sm text-muted-foreground">{testimonials[testimonialIndex].role}</div>
                  </div>
                </CardContent>
              </Card>
              <div className="flex justify-center gap-2 mt-4">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setTestimonialIndex(idx)}
                    aria-label={`Go to testimonial ${idx + 1}`}
                    className={`w-3 h-3 rounded-full transition-all duration-300 border border-gray-300
                      ${testimonialIndex === idx ? "bg-gray-400" : "bg-gray-200 opacity-60"}
                    `}
                    style={{ outline: "none", borderWidth: testimonialIndex === idx ? 2 : 1 }}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <Card key={idx} className="p-6 shadow-xl flex flex-col h-full">
                <CardContent className="flex flex-col flex-1">
                  <div className="flex items-center gap-1 mb-4 justify-center">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed italic flex-1">
                    "{t.content}"
                  </p>
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-sm text-muted-foreground">{t.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 gradient-bg text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-yellow-300 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-4xl mx-auto px-2 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 animate-glow">
            Ready to Transform Your Business?
          </h2>
          <p className="text-base sm:text-xl opacity-90 mb-8 leading-relaxed">
            Join 150+ satisfied clients who have grown their businesses with our digital solutions. 
            Get your free consultation today and see how we can help you achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact?tab=quote">
              <Button
                size="lg"
                variant="secondary"
                className="px-8 py-4 rounded-xl font-semibold text-lg hover:scale-105 transition-transform shadow-lg group bg-white text-primary hover:bg-gray-100 focus:ring-2 focus:ring-secondary"
                aria-label="Start Your Project Today"
              >
                <Rocket className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                Start Your Project Today
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button
                size="lg"
                className="px-8 py-4 rounded-xl font-semibold text-lg bg-primary text-white hover:bg-primary/90 dark:bg-transparent dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-primary border border-primary dark:variant-outline transition-all duration-300 group focus:ring-2 focus:ring-primary"
                aria-label="View Pricing Plans"
              >
                <Target className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                View Pricing Plans
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
