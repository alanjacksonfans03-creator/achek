import { useEffect, useState } from "react";
import SEO from "@/components/seo";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Lightbulb,
  Users,
  Award,
  Star,
  MapPin,
  Mail,
  Phone,
  Globe,
} from "lucide-react";

function AboutPage() {
  // SEO meta info for About page
  const seo = {
    title: "About Achek Digital Solutions | Leading Web, Mobile & AI Agency in Nigeria",
    description:
      "Learn about Achek Digital Solutions, a top web, mobile, and AI agency based in Nigeria. Discover our founder, team, mission, values, and journey transforming businesses across Africa and beyond.",
    canonical: "https://achek.com.ng/about",
    keywords:
      "Achek Digital Solutions, About Achek, Caleb Onuche, Web Agency Nigeria, Mobile App Agency, AI Solutions Africa, Digital Transformation, Achek Team, Achek Founder, Achek Mission, Achek Vision, Achek Values, Achek History, Achek Lagos, Achek Portfolio",
    ogImage: "https://achek.com.ng/achek-logo.png",
    ogType: "website",
  };
  const values = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "Achek delivers modern, scalable digital solutions using the latest technology and creative thinking.",
    },
    {
      icon: Users,
      title: "Teamwork",
      description:
        "Our team of designers, developers, and strategists work together to deliver results for every client.",
    },
    {
      icon: Award,
      title: "Quality",
      description:
        "We focus on quality, reliability, and client satisfaction in every project.",
    },
  ];

  const statsData = [
    { value: 6, label: "Years Experience", icon: Star, suffix: "+" },
    { value: 20, label: "Team Members", icon: Users, suffix: "+" },
    { value: 10, label: "Countries Served", icon: Globe, suffix: "+" },
    { value: 150, label: "Projects Completed", icon: Award, suffix: "+" },
  ];

  const milestones = [
    {
      year: "2019",
      title: "Achek Founded",
      description:
        "Achek Digital Solutions was founded by Caleb O. in Lagos, Nigeria.",
    },
    {
      year: "2020",
      title: "First Major Project",
      description: "Delivered our first enterprise-level website and app.",
    },
    {
      year: "2022",
      title: "Global Reach",
      description: "Achek expanded to serve clients in 10+ countries.",
    },
    {
      year: "2024",
      title: "AI & Cloud",
      description: "Launched AI-powered and cloud-based solutions for businesses.",
    },
  ];

  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState(statsData.map(() => 0));

  useEffect(() => {
    setIsVisible(true);

    // Animate counters
    const targets = statsData.map((s) => s.value);
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      setCounters(
        targets.map((t) => Math.min(Math.round((t / steps) * frame), t)),
      );
      if (frame >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <SEO {...seo} />
      <div className="pt-16" data-testid="about-page">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-muted/50 via-background to-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 gradient-bg rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary rounded-full blur-3xl animate-float"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div
              className={`transition-all duration-1000 delay-200 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-6">
                <Star className="h-4 w-4 text-primary mr-2" />
                <span className="text-sm font-medium text-primary">
                  About Achek Digital Solutions
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-glow">
                Transforming <br /> Businesses Digitally
              </h1>

              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Founded with a vision to bridge the gap between innovative
                technology and practical business solutions, Achek has grown to
                become a trusted partner for businesses across various
                industries.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-5 w-5 mr-2 text-primary" />
                  <span>Based in Nigeria, Serving Globally</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Mail className="h-5 w-5 mr-2 text-primary" />
                  <span>24/7 Support Available</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button className="gradient-bg text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg">
                    Start Your Project
                  </Button>
                </Link>
                <Link href="/portfolio">
                  <Button
                    variant="outline"
                    className="px-8 py-4 rounded-xl font-semibold"
                  >
                    View Our Work
                  </Button>
                </Link>
              </div>
            </div>

            <div
              className={`lg:order-last transition-all duration-1000 delay-400 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                  alt="Achek team working collaboratively in modern office"
                  className="rounded-3xl shadow-2xl w-full object-cover h-[500px]"
                />
                <div className="absolute -bottom-8 -left-8 bg-white dark:bg-card p-6 rounded-2xl shadow-xl">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-2xl">100+</div>
                      <div className="text-muted-foreground text-sm">
                        Satisfied Clients
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {statsData.map((stat, index) => (
              <Card
                key={index}
                className={`text-center p-8 hover:shadow-lg transition-all duration-700 hover:-translate-y-2 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <CardContent className="p-0">
                  <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold mb-2 text-foreground">
                    {counters[index]}
                    {stat.suffix}
                  </div>
                  <div className="text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our Core Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These principles guide everything we do and shape how we deliver
              exceptional results for our clients.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className={`p-8 hover:shadow-xl transition-all duration-700 hover:-translate-y-2 border-l-4 border-l-primary ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <CardContent className="p-0">
                  <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mb-6">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-2xl mb-4">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Meet Our Founder</h2>
            <p className="text-xl text-muted-foreground">
              The visionary behind Achek Digital Solutions
            </p>
          </div>

          <Card
            className={`p-8 shadow-2xl border-0 bg-gradient-to-br from-card via-card to-muted/50 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                <div className="relative">
                  <img
                    src="/caleb-founder.jpg"
                    alt="Caleb Onuche, Achek founder and CEO"
                    className="w-48 h-64 rounded-2xl object-cover shadow-lg"
                  />
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 gradient-bg rounded-full flex items-center justify-center">
                    <Star className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-bold text-3xl mb-2">Caleb Onuche</h3>
                  <div className="text-primary font-semibold text-lg mb-4">
                    Founder & CEO
                  </div>
                  <blockquote className="text-lg italic text-muted-foreground mb-6 leading-relaxed">
                    "Building digital solutions that make a difference in
                    people's lives and businesses. Our mission is to democratize
                    technology and make it accessible to businesses of all
                    sizes."
                  </blockquote>
                  <div className="space-y-3 text-muted-foreground">
                    <div className="flex items-center justify-center md:justify-start">
                      <Mail className="h-5 w-5 mr-3 text-primary" />
                      <span>caleb@achek.com.ng</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start">
                      <Phone className="h-5 w-5 mr-3 text-primary" />
                      <span>Available for consultation</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Our Journey</h2>
            <p className="text-xl text-muted-foreground">
              Key milestones that shaped our company
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-secondary"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex items-center transition-all duration-700 delay-${index * 200} ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                >
                  <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {milestone.year.slice(-2)}
                  </div>
                  <Card className="ml-8 p-6 flex-1 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="text-sm text-primary font-semibold mb-1">
                        {milestone.year}
                      </div>
                      <h3 className="font-bold text-xl mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {milestone.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our Mission & Vision
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Driving the future of digital transformation across Africa and
              beyond.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <Card
              className={`p-10 text-center hover:shadow-2xl transition-shadow border-0 bg-gradient-to-br from-primary/5 to-secondary/5 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <CardContent className="p-0">
                <div className="w-20 h-20 gradient-bg rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lightbulb className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To empower businesses with innovative digital solutions that
                  drive growth, enhance user experiences, and create lasting
                  value.
                </p>
              </CardContent>
            </Card>

            <Card
              className={`p-10 text-center hover:shadow-2xl transition-shadow border-0 bg-gradient-to-br from-secondary/5 to-primary/5 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <CardContent className="p-0">
                <div className="w-20 h-20 gradient-bg rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-6">Our Vision</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To be the leading digital solutions provider in Africa,
                  recognized for our innovation, quality, and commitment to
                  client success.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-r from-primary/10 via-background to-secondary/10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 gradient-bg rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary rounded-full blur-3xl animate-float"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Let's discuss your project and explore how our expertise can help
            bring your vision to life. Get in touch today for a free
            consultation.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact">
              <Button className="gradient-bg text-white px-10 py-6 rounded-xl font-semibold text-lg hover:scale-105 transition-transform shadow-xl">
                Start Your Journey Today
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button
                variant="outline"
                className="px-10 py-6 rounded-xl font-semibold text-lg border-2 hover:bg-accent"
              >
                Explore Our Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}

export default AboutPage;