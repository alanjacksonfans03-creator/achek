import { useEffect, useState } from "react";

export default function Terms() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="pt-16 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h1 className="text-5xl md:text-6xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Terms of Service
        </h1>

        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
          Welcome to Achek Digital Solutions. By accessing or using our website
          and services, you agree to the following terms:
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Use of Services</h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          You may use our website and services for lawful purposes only. You
          agree not to misuse the services or interfere with their normal
          operation.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Intellectual Property</h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          All content, design, and software on our website are owned by Achek
          Digital Solutions and protected by intellectual property laws. You may
          not copy or redistribute without permission.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Liability</h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          We strive to provide accurate information and reliable services. However,
          we are not liable for any damages arising from your use of the website
          or services.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Changes to Terms</h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          Achek Digital Solutions reserves the right to modify these terms at
          any time. Changes will be posted on this page.
        </p>
      </div>
    </div>
  );
}
