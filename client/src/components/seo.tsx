
import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  author?: string;
  robots?: string;
  language?: string;
}

export default function SEO({
  title,
  description,
  canonical,
  keywords,
  ogImage = "https://achek.com.ng/achek-logo.png",
  ogType = "website",
  author = "Caleb Onuche - Achek Digital Solutions",
  robots = "index, follow",
  language = "en"
}: SEOProps) {
  useEffect(() => {
    // Set title
    document.title = title;
    
    // Ensure viewport meta tag for mobile responsiveness
    let viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.setAttribute('name', 'viewport');
      document.head.appendChild(viewport);
    }
    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0');
    
    // Set meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);
    
    // Set keywords if provided
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords);
    }
    
    // Set canonical URL
    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonical);
    }
    
    // Set Open Graph meta tags
    const ogTags = [
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: ogImage },
      { property: 'og:type', content: ogType },
      { property: 'og:url', content: canonical || window.location.href }
    ];
    
    ogTags.forEach(({ property, content }) => {
      let ogTag = document.querySelector(`meta[property="${property}"]`);
      if (!ogTag) {
        ogTag = document.createElement('meta');
        ogTag.setAttribute('property', property);
        document.head.appendChild(ogTag);
      }
      ogTag.setAttribute('content', content);
    });
    
    // Set Twitter Card meta tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImage },
      { name: 'twitter:site', content: '@AchekOfficial' }
    ];
    
    twitterTags.forEach(({ name, content }) => {
      let twitterTag = document.querySelector(`meta[name="${name}"]`);
      if (!twitterTag) {
        twitterTag = document.createElement('meta');
        twitterTag.setAttribute('name', name);
        document.head.appendChild(twitterTag);
      }
      twitterTag.setAttribute('content', content);
    });
    
    // Set additional SEO meta tags
    const additionalTags = [
      { name: 'author', content: author },
      { name: 'robots', content: robots },
      { name: 'language', content: language },
      { name: 'revisit-after', content: '7 days' },
      { name: 'theme-color', content: '#0ea5e9' },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:site_name', content: 'Achek Digital Solutions' }
    ];

    // Add preload hints for critical resources
    const preloadLinks = [
      { rel: 'preload', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap', as: 'style' },
      { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
      { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' }
    ];
    
    additionalTags.forEach(({ name, property, content }) => {
      const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
      let metaTag = document.querySelector(selector);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        if (name) metaTag.setAttribute('name', name);
        if (property) metaTag.setAttribute('property', property);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', content);
    });

    // Add preload links for performance
    preloadLinks.forEach(({ rel, href, as }) => {
      let linkTag = document.querySelector(`link[href="${href}"]`);
      if (!linkTag) {
        linkTag = document.createElement('link');
        linkTag.setAttribute('rel', rel);
        linkTag.setAttribute('href', href);
        if (as) linkTag.setAttribute('as', as);
        document.head.appendChild(linkTag);
      }
    });
    
  }, [title, description, canonical, keywords, ogImage, ogType, author, robots, language]);
  
  return null;
}
