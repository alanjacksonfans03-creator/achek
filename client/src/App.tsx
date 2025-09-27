import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/theme-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import { NewsletterSection } from "@/components/newsletter-section";
import { ScrollToTopButton } from "@/components/ui/scroll-to-top";
import Analytics from "@/components/analytics";
import PerformanceMonitor from "@/components/performance-monitor";
import ScrollProgress from "@/components/scroll-progress";
import ErrorBoundary from "@/components/error-boundary";

// Pages
import Home from "@/pages/home";
import Services from "@/pages/services";
import Portfolio from "@/pages/portfolio";
import Pricing from "@/pages/pricing";
import Testimonials from "@/pages/testimonials";
import About from "@/pages/about";
import Contact from "@/pages/contact";

import FAQ from "@/pages/faq";
import NotFound from "@/pages/not-found";
import PrivacyPolicy from "@/pages/privacy";
import TermsOfService from "@/pages/Terms";
import CookiePolicy from "@/pages/Cookie";
import Blog from "@/pages/blog";
import BlogSingle from "@/pages/BlogSingle";


// Demo pages
import EduAfricaLMS from "@/pages/EduAfricaLMS";
import FintechDashboard from "@/pages/FintechDashboard";
import EventHub from "@/pages/EventHub";
import RealEstate from "@/pages/RealEstate";
import NewsPortal from "@/pages/NewsPortal";
import Marketplace from "@/pages/Marketplace";
import FoodDelivery from "@/pages/FoodDelivery";
import TravelNaija from "@/pages/TravelNaija";
import AgroConnect from "@/pages/AgroConnect";
import HealthLinkNG from "@/pages/HealthLinkNG";
import ShopSmartNG from "@/pages/ShopSmartNG";

// Admin pages
import AdminLogin from "@/pages/admin/Login";
import AdminDashboard from "@/pages/admin/Dashboard";
import TestReceiptEmailPage from "./pages/receipt";
import Deliver from "./pages/deliver";
import Newsletter from "@/pages/admin/newsletter";

function Router() {
  return (
    <Switch>
      {/* Main site pages */}
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/testimonials" component={Testimonials} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />

      <Route path="/faq" component={FAQ} />
      <Route path="/privacy" component={PrivacyPolicy} />
      <Route path="/terms" component={TermsOfService} />
      <Route path="/cookie" component={CookiePolicy} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogSingle} />
  {/* DNS Deliverability info page */}
  <Route path="/deliver" component={Deliver} />
  <Route path="/recieve" component={Deliver} />
      {/* Test receipt email page */}
      <Route path="/test-receipt" component={TestReceiptEmailPage} />

      {/* Demo pages */}
      <Route path="/fintechdashboard" component={FintechDashboard} />
      <Route path="/eduafrica" component={EduAfricaLMS} />
      <Route path="/eventhub" component={EventHub} />
      <Route path="/realestate" component={RealEstate} />
      <Route path="/marketplace" component={Marketplace} />
      <Route path="/fooddelivery" component={FoodDelivery} />
      <Route path="/travelnaija" component={TravelNaija} />
      <Route path="/agroconnect" component={AgroConnect} />
      <Route path="/shopsmart" component={ShopSmartNG} />
      <Route path="/newsportal" component={NewsPortal} />

      {/* Admin pages */}
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin/newsletter" component={Newsletter} />

      {/* 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const isAdminPage = window.location.pathname.startsWith("/admin");
  const [location] = useLocation();

  // Scroll to top on every route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location]);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="achek-ui-theme">
          <TooltipProvider>
            <div className="min-h-screen flex flex-col">
              <Analytics />
              <PerformanceMonitor />
              <ScrollProgress />
              <Navbar />
              <main className="flex-1">
                <Router />
                {!isAdminPage && <NewsletterSection />}
                <ScrollToTopButton />
              </main>
              {!isAdminPage && <Footer />}
              <FloatingWhatsApp />
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;