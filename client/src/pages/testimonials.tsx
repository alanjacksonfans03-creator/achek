import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react";
import { testimonialsApi } from "@/lib/api";
import type { Testimonial } from "@shared/schema";
import SEO from '@/components/seo';

export default function Testimonials() {
  const { data: testimonials, isLoading, error } = useQuery({
    queryKey: ["/api/testimonials"],
    queryFn: testimonialsApi.getAll,
  });

  // State for "View All"
  const [showAll, setShowAll] = useState(false);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${
          index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  if (error) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive mb-4">
            Error Loading Testimonials
          </h2>
          <p className="text-muted-foreground">
            Failed to load testimonials. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  // Limit testimonials if not showing all
  const displayedTestimonials = showAll
    ? testimonials
    : testimonials?.slice(0, 6);

  return (
    <div className="pt-16" data-testid="testimonials-page">
      <SEO
        title="Client Testimonials - Success Stories & Reviews | Achek Digital Solutions"
        description="Read what our clients say about our web development, mobile app, and digital marketing services. Real testimonials from satisfied customers across Nigeria and Africa."
        canonical="https://achek.com.ng/testimonials"
        keywords="Achek testimonials, client reviews Nigeria, web development testimonials, mobile app development reviews, digital marketing success stories, satisfied clients Africa"
      />
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1
              className="text-4xl md:text-5xl font-bold mb-6"
              data-testid="testimonials-title"
            >
              What Our Clients Say
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Don&apos;t just take our word for it. Here&apos;s what our
              satisfied clients have to say about our work.
            </p>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <Card key={index} className="p-8">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      <div className="flex space-x-1">
                        {Array.from({ length: 5 }).map((_, starIndex) => (
                          <Skeleton key={starIndex} className="h-5 w-5" />
                        ))}
                      </div>
                    </div>
                    <Skeleton className="h-20 w-full mb-6" />
                    <div className="flex items-center">
                      <Skeleton className="w-12 h-12 rounded-full mr-4" />
                      <div>
                        <Skeleton className="h-4 w-32 mb-1" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedTestimonials?.map(
                (testimonial: Testimonial, index: number) => (
                  <Card
                    key={testimonial.id}
                    className="p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border"
                    data-testid={`testimonial-card-${index}`}
                  >
                    <CardContent className="p-0">
                      <div className="flex items-center mb-4">
                        <div className="flex space-x-1 star-rating">
                          {renderStars(testimonial.rating)}
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-6 italic">
                        "{testimonial.content}"
                      </p>
                      <div className="flex items-center">
                        {testimonial.imageUrl && (
                    <img
                      src={testimonial.imageUrl}
                      alt={testimonial.clientName}
                      className="w-20 h-20 rounded-full object-cover mr-4 border-4 border-muted shadow-md"
                    />

                        )}
                        <div>
                          <div className="font-semibold">
                            {testimonial.clientName}
                          </div>
                          {testimonial.position && testimonial.company && (
                            <div className="text-muted-foreground text-sm">
                              {testimonial.position}, {testimonial.company}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              )}
            </div>
          )}

          {!isLoading &&
            testimonials &&
            testimonials.length > 6 && (
              <div className="text-center mt-12">
                <Button
                  size="lg"
                  className="gradient-bg text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg"
                  data-testid="view-all-reviews-button"
                  onClick={() => setShowAll((prev) => !prev)}
                >
                  {showAll ? "Show Less" : "View All Reviews"}
                </Button>
              </div>
            )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join Our Success Stories?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let&apos;s work together to create something amazing. Get in touch
            today and see how we can help transform your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="gradient-bg text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg"
              data-testid="start-project-button"
            >
              Start Your Project
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-4 rounded-xl font-semibold"
              data-testid="view-portfolio-button"
            >
              View Our Portfolio
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}