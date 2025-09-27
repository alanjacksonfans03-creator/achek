
import { useEffect } from 'react';

export default function PerformanceMonitor() {
  useEffect(() => {
    // Monitor page load performance
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      console.log('Page Load Time:', navigation.loadEventEnd - navigation.fetchStart);
    });
  }, []);

  return null;
}
