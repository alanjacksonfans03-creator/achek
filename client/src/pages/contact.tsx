import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { messagesApi } from "@/lib/api";
import { 
  Mail, Phone, MapPin, Clock, MessageCircle, 
  Youtube, Twitter, Linkedin, Instagram, Facebook,
  Calculator, Send
} from "lucide-react";
import { SiTiktok } from "react-icons/si"; // TikTok icon
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    projectType: "",
    message: "", 
  });

  const [quoteData, setQuoteData] = useState({
    fullName: "",
    email: "",
    phone: "",
    serviceType: "",
    projectDetails: "",
    budgetRange: "",
  });

  const { toast } = useToast();
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("contact");
  const [location] = useLocation();

  useEffect(() => {
    // Check for tab query param using window.location.search
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab");
    if (tab === "quote") {
      setActiveTab("quote");
    }
  }, []);

  // SEO optimization for contact/quote page
  useEffect(() => {
    document.title = "Contact Achek Digital Solutions - Get Free Quote & Project Consultation";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Contact Achek Digital Solutions for web development, mobile apps, and digital marketing. Get free quotes and project consultation in Nigeria. Call +234-810-404-0841.');
    }

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://achek.com.ng/contact';
  }, []);

  // Quick Help state
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [qhName, setQhName] = useState("");
  const [qhProjectType, setQhProjectType] = useState("");
  const [qhCustomType, setQhCustomType] = useState("");
  const [qhMessage, setQhMessage] = useState("");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const contactMutation = useMutation({
    mutationFn: messagesApi.create,
    onSuccess: () => {
      // Show success toast
      toast({
        title: "Message Sent Successfully! ✅",
        description: "Thank you for your message. We'll get back to you within 24 hours via WhatsApp or email.",
      });

      // Clear form after a short delay to let user see the success message
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          whatsapp: "",
          projectType: "",
          message: "",
        });
      }, 1000);
    },
    onError: (error: any) => {
      toast({
        title: "Failed to Send Message ❌",
        description: error.message || "Something went wrong. Please try again or contact us directly via WhatsApp.",
        variant: "destructive",
      });
    },
  });

  const quoteMutation = useMutation({
    mutationFn: async (data: typeof quoteData) => {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.fullName,
          email: data.email,
          phone: data.phone,
          whatsapp: data.phone,
          projectType: data.serviceType,
          message: `Quote Request:\n\nService Type: ${data.serviceType}\nBudget Range: ${data.budgetRange || "Not specified"}\n\nProject Details:\n${data.projectDetails}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit quote request");
      }

      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Quote Request Sent! ✅",
        description: "Thank you! Our team will contact you shortly with a tailored estimate.",
      });

      setTimeout(() => {
        setQuoteData({
          fullName: "",
          email: "",
          phone: "",
          serviceType: "",
          projectDetails: "",
          budgetRange: "",
        });
      }, 1000);
    },
    onError: (error) => {
      toast({
        title: "Failed to Send Quote Request ❌",
        description: "Something went wrong. Please try again or contact us directly.",
        variant: "destructive",
      });
      console.error("Quote submission error:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message || !formData.whatsapp) {
      toast({
        title: "Required Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    contactMutation.mutate(formData);
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteData.fullName || !quoteData.email || !quoteData.projectDetails) {
      toast({
        title: "Required Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    quoteMutation.mutate(quoteData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleQuoteInputChange = (field: string, value: string) => {
    setQuoteData((prev) => ({ ...prev, [field]: value }));
  };

  // Quick Help flow handlers
  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleQuickHelpSubmit = () => {
    const type = qhProjectType === "other" ? qhCustomType : qhProjectType;
    const whatsappMessage = `Hello, my name is ${qhName}.
I'm interested in ${type || "a project"}.
Here are the details: ${qhMessage}`;

    const whatsappUrl = `https://wa.me/2348104040841?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, "_blank");

    // Reset quick help state
    setOpen(false);
    setStep(1);
    setQhName("");
    setQhProjectType("");
    setQhCustomType("");
    setQhMessage("");
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "hello@achek.com.ng", href: "mailto:hello@achek.com.ng" },
    { icon: Phone, label: "Phone", value: "+234 810 404 0841", href: "tel:+2348104040841" },
    { icon: MapPin, label: "Location", value: "Lagos, Nigeria" },
    { icon: Clock, label: "Business Hours", value: "Always Open" },
  ];

  const socialLinks = [
    { href: "https://www.youtube.com/@AchekOfficial", icon: Youtube, label: "YouTube", color: "text-red-500" },
    { href: "https://x.com/AchekOfficial", icon: Twitter, label: "Twitter", color: "text-blue-400" },
    { href: "https://www.linkedin.com/company/achek", icon: Linkedin, label: "LinkedIn", color: "text-blue-600" },
    { href: "https://www.instagram.com/achekofficial", icon: Instagram, label: "Instagram", color: "text-pink-500" },
    { href: "https://www.tiktok.com/@achekofficial", icon: SiTiktok, label: "TikTok", color: "text-black" },
    { href: "https://web.facebook.com/AchekOfficial/", icon: Facebook, label: "Facebook", color: "text-blue-600" },
  ];

  // Project type options for both form and WhatsApp
  const projectTypeOptions = [
    { value: "web-development", label: "Web Development" },
    { value: "mobile-app", label: "Mobile App" },
    { value: "digital-marketing", label: "Digital Marketing" },
    { value: "ui-ux-design", label: "UI/UX Design" },
    { value: "hosting-services", label: "Hosting Services" },
    { value: "domain-registration", label: "Domain Registration" },
    { value: "email-hosting", label: "Email Hosting" },
    { value: "website-maintenance", label: "Website Maintenance" },
    { value: "cybersecurity", label: "Cybersecurity" },
    { value: "analytics-optimization", label: "Analytics & Optimization" },
    { value: "consulting", label: "About Project Type & Consulting" },
    { value: "other", label: "Other" },
  ];

  const serviceTypeOptions = [
    { value: "website", label: "Website Development" },
    { value: "mobile-app", label: "Mobile App" },
    { value: "payment-integration", label: "Payment Integration" },
    { value: "digital-marketing", label: "Digital Marketing" },
    { value: "ui-ux-design", label: "UI/UX Design" },
    { value: "hosting-services", label: "Hosting Services" },
    { value: "other", label: "Other" },
  ];

  const budgetRangeOptions = [
    { value: "under-500", label: "Under $500" },
    { value: "500-1000", label: "$500 - $1,000" },
    { value: "1000-plus", label: "$1,000+" },
  ];

  return (
    <div className="pt-16" data-testid="contact-page">
      <Toaster />
      <section className="py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 gradient-bg rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary rounded-full blur-3xl animate-float"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-glow">
              Get In Touch
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ready to start your project? Contact us or request a free quote.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact & Quote Forms */}
            <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="contact" className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Contact Us
                  </TabsTrigger>
                  <TabsTrigger value="quote" className="flex items-center gap-2">
                    <Calculator className="h-4 w-4" />
                    Get Quote
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="contact">
                  <Card className="p-8 shadow-2xl border-0 bg-gradient-to-br from-card via-card to-muted/50">
                    <CardHeader className="p-0 pb-6">
                      <CardTitle className="text-2xl font-semibold">Send us a message</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                          <Label htmlFor="name">Full Name *</Label>
                          <Input id="name" type="text" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} className="mt-2" required />
                        </div>

                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input id="email" type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} className="mt-2" required />
                        </div>

                        <div>
                          <Label htmlFor="phone">Phone (Optional)</Label>
                          <Input id="phone" type="tel" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} className="mt-2" />
                        </div>

                        <div>
                          <Label htmlFor="whatsapp">WhatsApp Number *</Label>
                          <Input id="whatsapp" type="tel" value={formData.whatsapp} onChange={(e) => handleInputChange("whatsapp", e.target.value)} className="mt-2" placeholder="+234..." required />
                        </div>

                        <div>
                          <Label htmlFor="projectType">Project Type</Label>
                          <Select value={formData.projectType} onValueChange={(value) => handleInputChange("projectType", value)}>
                            <SelectTrigger className="mt-2">
                              <SelectValue placeholder="Select a project type" />
                            </SelectTrigger>
                            <SelectContent>
                              {projectTypeOptions.map(opt => (
                                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="message">Message *</Label>
                          <Textarea id="message" rows={5} value={formData.message} onChange={(e) => handleInputChange("message", e.target.value)} placeholder="Tell us about your project..." className="mt-2 resize-none" required />
                        </div>

                        <Button type="submit" disabled={contactMutation.isPending} className="w-full gradient-bg text-white py-4 rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg disabled:hover:scale-100">
                          {contactMutation.isPending ? "Sending..." : "Send Message"}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="quote">
                  <Card className="p-8 shadow-2xl border-0 bg-gradient-to-br from-card via-card to-muted/50">
                    <CardHeader className="p-0 pb-6">
                      <CardTitle className="text-2xl font-semibold">Request a Quote</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <form onSubmit={handleQuoteSubmit} className="space-y-6">
                        <div>
                          <Label htmlFor="fullName">Full Name *</Label>
                          <Input 
                            id="fullName" 
                            type="text" 
                            value={quoteData.fullName} 
                            onChange={(e) => handleQuoteInputChange("fullName", e.target.value)} 
                            className="mt-2" 
                            required 
                          />
                        </div>

                        <div>
                          <Label htmlFor="quoteEmail">Email *</Label>
                          <Input 
                            id="quoteEmail" 
                            type="email" 
                            value={quoteData.email} 
                            onChange={(e) => handleQuoteInputChange("email", e.target.value)} 
                            className="mt-2" 
                            required 
                          />
                        </div>

                        <div>
                          <Label htmlFor="quotePhone">Phone Number</Label>
                          <Input 
                            id="quotePhone" 
                            type="tel" 
                            value={quoteData.phone} 
                            onChange={(e) => handleQuoteInputChange("phone", e.target.value)} 
                            className="mt-2" 
                            placeholder="+234..." 
                          />
                        </div>

                        <div>
                          <Label htmlFor="serviceType">Service Type</Label>
                          <Select 
                            value={quoteData.serviceType} 
                            onValueChange={(value) => handleQuoteInputChange("serviceType", value)}
                          >
                            <SelectTrigger className="mt-2">
                              <SelectValue placeholder="Select a service type" />
                            </SelectTrigger>
                            <SelectContent>
                              {serviceTypeOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="projectDetails">Project Details *</Label>
                          <Textarea 
                            id="projectDetails" 
                            rows={5} 
                            value={quoteData.projectDetails} 
                            onChange={(e) => handleQuoteInputChange("projectDetails", e.target.value)} 
                            placeholder="Please describe your project requirements, features needed, timeline, and any specific preferences..." 
                            className="mt-2 resize-none" 
                            required 
                          />
                        </div>

                        <div>
                          <Label htmlFor="budgetRange">Budget Range (Optional)</Label>
                          <Select 
                            value={quoteData.budgetRange} 
                            onValueChange={(value) => handleQuoteInputChange("budgetRange", value)}
                          >
                            <SelectTrigger className="mt-2">
                              <SelectValue placeholder="Select your budget range" />
                            </SelectTrigger>
                            <SelectContent>
                              {budgetRangeOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <Button 
                          type="submit" 
                          disabled={quoteMutation.isPending} 
                          className="w-full gradient-bg text-white py-4 rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg disabled:hover:scale-100"
                        >
                          {quoteMutation.isPending ? "Sending Request..." : "Request Quote"}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Contact Info + Quick Help */}
            <div className="space-y-8">
              <Card className="p-8 shadow-2xl border-0 bg-gradient-to-br from-card via-card to-muted/50 transition-all duration-700">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
                  <div className="space-y-6">
                    {contactInfo.map((info, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center mr-4">
                          <info.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="font-medium">{info.label}</div>
                          {info.href ? (
                            <a href={info.href} className="text-muted-foreground hover:text-primary transition-colors">{info.value}</a>
                          ) : (
                            <div className="text-muted-foreground">{info.value}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent> 
              </Card>

              {/* WhatsApp Quick Help Wizard */}
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-8 rounded-2xl text-white shadow-lg hover:scale-105 transition-transform">
                <h3 className="text-2xl font-semibold mb-4">Need Quick Help?</h3>
                <p className="mb-6 text-green-100">Chat with us on WhatsApp for immediate assistance.</p>
                <Button 
                  onClick={() => setOpen(true)} 
                  className="inline-flex items-center bg-white text-green-600 px-6 py-3 rounded-xl font-semibold hover:bg-green-50 transition-colors"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Get Help
                </Button>
              </div>

              {/* Quick Help Dialog */}
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Get Help</DialogTitle>
                  </DialogHeader>

                  {step === 1 && (
                    <div className="space-y-4">
                      <Label>Your Name</Label>
                      <Input value={qhName} onChange={(e) => setQhName(e.target.value)} placeholder="Enter your name" />
                      <Button disabled={!qhName} onClick={handleNext} className="w-full">Next</Button>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-4">
                      <Label>Project Type</Label>
                      <Select value={qhProjectType} onValueChange={setQhProjectType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select project type" />
                        </SelectTrigger>
                        <SelectContent>
                          {projectTypeOptions.map(opt => (
                            <SelectItem key={opt.value} value={opt.label}>{opt.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {qhProjectType === "other" && (
                        <Input value={qhCustomType} onChange={(e) => setQhCustomType(e.target.value)} placeholder="Enter custom type" />
                      )}
                      <div className="flex justify-between">
                        <Button variant="outline" onClick={handleBack}>Back</Button>
                        <Button disabled={!qhProjectType} onClick={handleNext}>Next</Button>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-4">
                      <Label>How can we help you?</Label>
                      <Textarea value={qhMessage} onChange={(e) => setQhMessage(e.target.value)} placeholder="Tell us more..." />
                      <div className="flex justify-between">
                        <Button variant="outline" onClick={handleBack}>Back</Button>
                        <Button disabled={!qhMessage} onClick={handleQuickHelpSubmit}>Open WhatsApp</Button>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>

              {/* Social Media Links */}
              <Card className="p-8 shadow-2xl border-0 bg-gradient-to-br from-card via-card to-muted/50 transition-all duration-700">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-semibold mb-6">Follow Us</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {socialLinks.map((social, index) => (
                      <a key={index} href={social.href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center p-4 rounded-lg hover:bg-accent transition-colors group">
                        <social.icon className={`text-2xl ${social.color} group-hover:scale-110 transition-transform mb-2`} />
                        <span className="text-sm font-medium">{social.label}</span>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
