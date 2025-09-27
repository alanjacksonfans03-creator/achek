// src/pages/FAQ.tsx
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: { category: string; items: FAQItem[] }[] = [
  {
    category: "General",
    items: [
      {
        question: "What does Achek Digital Solutions do?",
        answer:
          "Achek Digital Solutions builds modern websites, mobile apps, and provides digital marketing, hosting, and cloud services for businesses and individuals in Nigeria and globally.",
      },
      {
        question: "Who is the founder?",
        answer:
          "Achek was founded by Caleb O. and is run by a team of experienced designers, developers, and strategists.",
      },
    ],
  },
  {
    category: "Services",
    items: [
      {
        question: "Do you build both websites and mobile apps?",
        answer:
          "Yes. We create responsive websites (business, e-commerce, portfolio, blog, etc.) and mobile apps for Android and iOS.",
      },
      {
        question: "Do you offer redesigns and upgrades?",
        answer:
          "Yes, we modernize and upgrade existing websites and apps with new features, better design, and improved performance.",
      },
    ],
  },
  {
    category: "Pricing",
    items: [
      {
        question: "How much does a website cost?",
        answer:
          "Basic Website: ₦80,000. Pro Website: ₦250,000+. Enterprise Website: ₦800,000+. Mobile apps and custom solutions are quoted based on requirements.",
      },
      {
        question: "Do you offer payment plans?",
        answer:
          "Yes, we offer flexible payment plans and accept secure online payments. Contact us for details.",
      },
    ],
  },
  {
    category: "Technical",
    items: [
      {
        question: "Do you provide hosting and maintenance?",
        answer:
          "Yes. We offer hosting, domain registration, email hosting, and ongoing website maintenance starting from ₦10,000/yr.",
      },
      {
        question: "How long does it take to build a website?",
        answer:
          "Basic websites take 1-2 weeks, Pro websites 3-5 weeks, and Enterprise projects 6-12 weeks or less, depending on requirements.",
      },
    ],
  },
];

function FAQAccordion({ question, answer }: FAQItem) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      layout
      className="rounded-lg border border-border bg-white dark:bg-gray-800 shadow-sm overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-5 text-left"
      >
        <span className="text-lg font-medium">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="px-5 pb-5 text-muted-foreground dark:text-gray-300"
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {

  // SEO optimization
  useEffect(() => {
    document.title = "Frequently Asked Questions - Web Development & Digital Marketing | Achek";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Get answers to common questions about web development, mobile app development, digital marketing, pricing, and our services at Achek Digital Solutions Nigeria.');
    }

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://achek.com.ng/faq';

    // Add FAQ structured data for rich snippets
    const faqStructuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much does web development cost in Nigeria?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Web development costs vary based on complexity. Basic websites start from ₦150,000, e-commerce sites from ₦400,000, and custom web applications from ₦800,000. Contact us for a detailed quote."
          }
        },
        {
          "@type": "Question", 
          "name": "How long does it take to build a website?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Timeline depends on project scope. Simple websites take 2-4 weeks, e-commerce sites 4-8 weeks, and complex web applications 8-16 weeks. We provide detailed timelines during consultation."
          }
        },
        {
          "@type": "Question",
          "name": "Do you provide website maintenance services?", 
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we offer comprehensive website maintenance including security updates, content updates, performance optimization, and technical support starting from ₦25,000 per month."
          }
        }
      ]
    };

    let structuredDataScript = document.getElementById('faq-structured-data');
    if (!structuredDataScript) {
      structuredDataScript = document.createElement('script');
      structuredDataScript.id = 'faq-structured-data';
      structuredDataScript.type = 'application/ld+json';
      document.head.appendChild(structuredDataScript);
    }
    structuredDataScript.textContent = JSON.stringify(faqStructuredData);

  }, []);

  return (
    <div className="pt-28 pb-20">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto px-4 mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Frequently Asked Questions
        </h1>
        <p className="text-muted-foreground dark:text-gray-400 text-lg">
          Got questions? We’ve got answers. Explore our most commonly asked
          questions about services, pricing, and processes.
        </p>
      </div>

      {/* FAQ Sections */}
      <div className="max-w-5xl mx-auto px-4 space-y-16">
        {faqData.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-6">{section.category}</h2>
            <div className="space-y-4">
              {section.items.map((item, i) => (
                <FAQAccordion key={i} question={item.question} answer={item.answer} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
