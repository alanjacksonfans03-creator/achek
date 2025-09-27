import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { newsletterApi } from "@/lib/api";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const subscribeMutation = useMutation({
    mutationFn: newsletterApi.subscribe,
    onSuccess: (data: any) => {
      if (data?.message?.toLowerCase().includes("already subscribed")) {
        setError("This email is already subscribed to Achek’s newsletter.");
        setSuccess(null);
      } else {
        setSuccess("You’re now subscribed to Achek’s newsletter. 🎉");
        setError(null);
        setEmail("");
      }
    },
    onError: (error: any) => {
      let description = "Something went wrong. Please try again.";
      if (error?.response?.data?.message) {
        description = error.response.data.message;
      } else if (typeof error?.message === "string" && error.message.length < 100) {
        description = error.message;
      }
      setError(description);
      setSuccess(null);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    subscribeMutation.mutate({ email });
  };

  return (
    <section className="py-10 sm:py-16 lg:py-24 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 dark:from-primary/20 dark:via-secondary/20 dark:to-accent/20">
      <div className="max-w-4xl mx-auto px-2 sm:px-4 lg:px-8 text-center">
        <div className="relative rounded-2xl overflow-hidden shadow-xl bg-white/70 dark:bg-gray-900/60 backdrop-blur-md border-2 border-transparent bg-gradient-to-br from-primary/30 via-secondary/30 to-accent/30">
          <div className="relative z-10 px-4 py-8 sm:px-8 sm:py-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary dark:text-white mb-2">
              Stay Updated with Achek
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground dark:text-gray-300 mb-6 max-w-xl mx-auto">
              Get the latest insights on digital solutions, tech trends, and web development delivered straight to your inbox.
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={subscribeMutation.isPending}
                className="flex-1 px-4 py-3 rounded-lg border-0 bg-white/20 dark:bg-gray-800/30 backdrop-blur text-gray-900 dark:text-white placeholder-gray-600 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:scale-105 transition-all duration-200"
                data-testid="newsletter-email-input"
              />
              <Button
                type="submit"
                disabled={subscribeMutation.isPending}
                className="bg-gradient-to-r from-primary via-secondary to-accent text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:scale-105 transition-transform disabled:opacity-50 whitespace-nowrap"
                data-testid="newsletter-subscribe-button"
              >
                {subscribeMutation.isPending ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
            {/* Error Card */}
            {error && (
              <div className="mt-4 max-w-md mx-auto bg-red-50 border border-red-200 text-red-800 rounded-lg px-4 py-3 text-sm flex items-center gap-2 shadow-sm animate-fade-in">
                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0Z" /></svg>
                <span>{error}</span>
              </div>
            )}
            {/* Success Card */}
            {success && (
              <div className="mt-4 max-w-md mx-auto bg-green-50 border border-green-200 text-green-800 rounded-lg px-4 py-3 text-sm flex items-center gap-2 shadow-sm animate-fade-in">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                <span>{success}</span>
              </div>
            )}
            <p className="text-xs text-gray-700 dark:text-gray-300 mt-3">
              No spam. Unsubscribe anytime. We respect your privacy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
