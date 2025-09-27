
import { useEffect } from 'react';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

interface AnalyticsProps {
  trackingId?: string;
}

export default function Analytics({ trackingId = "G-XXXXXXXXXX" }: AnalyticsProps) {
  useEffect(() => {
    // Only load analytics in production
    if (process.env.NODE_ENV !== 'production') return;
    
    // Load Google Analytics
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    document.head.appendChild(script);
    
    // Initialize gtag
    window.gtag = function(...args: any[]) {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push(arguments);
    };
    
    window.gtag('js', new Date());
    window.gtag('config', trackingId, {
      page_title: document.title,
      page_location: window.location.href,
    });
    
    // Track page views on route changes
    const originalPushState = history.pushState;
    history.pushState = function(...args) {
      originalPushState.apply(history, args);
      window.gtag('config', trackingId, {
        page_title: document.title,
        page_location: window.location.href,
      });
    };
    
  }, [trackingId]);
  
  return null;
}

// Helper function to track custom events
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

// Track form submissions
export const trackFormSubmission = (formName: string) => {
  trackEvent('form_submit', {
    form_name: formName,
  });
};

// Track button clicks
export const trackButtonClick = (buttonName: string) => {
  trackEvent('button_click', {
    button_name: buttonName,
  });
};
