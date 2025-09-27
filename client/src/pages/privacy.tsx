import { useEffect, useState } from "react";

export default function Privacy() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="pt-16 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h1 className="text-5xl md:text-6xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Privacy Policy
        </h1>
        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
          At Achek Digital Solutions, your privacy is our top priority. We
          collect and use your personal information only to provide services
          and enhance your experience. We never share your data with third
          parties without your consent.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Your Privacy</h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          Achek Digital Solutions only collects information needed to deliver services and support. We never share your data without consent.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          By using our website, you consent to the terms of this privacy
          policy.
        </p>
      </div>
    </div>
  );
}
