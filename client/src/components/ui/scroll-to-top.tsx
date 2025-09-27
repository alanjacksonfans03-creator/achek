import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`fixed bottom-24 right-8 z-50 transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="bg-gradient-to-r from-primary to-secondary text-white p-4 rounded-full shadow-xl 
                   hover:scale-110 hover:shadow-[0_0_24px_rgba(59,130,246,0.6),0_0_48px_rgba(139,92,246,0.5)] 
                   transition-all duration-300 flex items-center justify-center"
      >
        <ArrowUp className="h-6 w-6 drop-shadow-md" />
      </button>
    </div>
  );
}
