import { useEffect, useState } from "react";

export default function Cookies() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="pt-16 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h1 className="text-5xl md:text-6xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Cookie Policy
        </h1>

        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
          Achek Digital Solutions uses cookies and similar technologies to improve
          your browsing experience. Cookies are small files stored on your device
          that help us analyze website traffic, remember preferences, and enhance
          performance.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Types of Cookies</h2>
        <ul className="list-disc list-inside mb-6 text-muted-foreground">
          <li><strong>Essential:</strong> Required for basic site functionality.</li>
          <li><strong>Analytics:</strong> Help us understand how visitors interact with our site.</li>
          <li><strong>Preferences:</strong> Store your preferences and settings.</li>
          <li><strong>Marketing:</strong> Used for personalized ads and promotions.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Managing Cookies</h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          You can manage or disable cookies in your browser settings. Note that
          some features may not function properly if cookies are disabled.
        </p>

        <p className="text-muted-foreground leading-relaxed">
          By using our website, you consent to the use of cookies in accordance
          with this policy.
        </p>
      </div>
    </div>
  );
}
