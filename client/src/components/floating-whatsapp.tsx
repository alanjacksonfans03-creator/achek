import { MessageCircle } from "lucide-react";
import React, { useState } from "react";

export function FloatingWhatsApp() {
  const phone = "2348104040841";
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const openModal = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowModal(true);
    setName("");
    setError("");
  };

  const handleSend = () => {
    if (!name || name.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }
    const message = encodeURIComponent(
      `Hello, my name is ${name.trim()}. I am contacting you from Achek Digital Solutions website. I would like to know more about your services.`
    );
    const whatsappUrl = `https://wa.me/${phone}?text=${message}`;
    window.open(whatsappUrl, "_blank");
    setShowModal(false);
  };

  return (
    <>
      <a
        href="#whatsapp"
        onClick={openModal}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Chat on WhatsApp"
        data-testid="floating-whatsapp"
      >
        <MessageCircle className="h-8 w-8 text-white" />
      </a>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-sm mx-auto flex flex-col items-center">
            <MessageCircle className="h-10 w-10 text-green-500 mb-2" />
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Start WhatsApp Chat</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 text-center">Enter your name to begin a professional chat with Achek Digital Solutions.</p>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your full name"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 mb-2 text-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              autoFocus
            />
            {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
            <button
              onClick={handleSend}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold text-lg shadow-md transition mt-2"
            >
              Start Chat
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="w-full mt-2 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
