import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, Github, X } from "lucide-react";
import { portfolioApi } from "@/lib/api";
import SEO from "@/components/seo";

export default function Portfolio() {
  const { data: projects, isLoading, error } = useQuery({
    queryKey: ["/api/portfolio"],
    queryFn: portfolioApi.getAll,
  });

  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const visibleProjects = showAll ? projects : projects?.slice(0, 6);

  if (error) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <SEO
          title="Portfolio Error | Your Company"
          description="An error occurred while loading the portfolio. Please try again."
          keywords="error, portfolio, loading, your company"
        />
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive mb-4">
            Error Loading Portfolio
          </h2>
          <p className="text-muted-foreground">
            Failed to load portfolio projects. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16" data-testid="portfolio-page">
      <SEO
        title="Our Portfolio | Your Company"
        description="Explore our diverse range of projects and client success stories. See our expertise in action."
        keywords="portfolio, projects, case studies, client work, your company, development, design"
      />
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1
              className="text-4xl md:text-5xl font-bold mb-6"
              data-testid="portfolio-title"
            >
              Our Portfolio
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Showcasing our latest projects and successful client collaborations
            </p>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <Card key={index} className="overflow-hidden">
                  <Skeleton className="w-full h-56" />
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-6 w-16 mb-2" />
                    <Skeleton className="h-8 w-20" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleProjects?.map((project, index) => (
                <Card
                  key={project.id}
                  className="overflow-hidden shadow-lg hover:shadow-2xl transition-transform duration-300 border border-border group cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                  data-testid={`portfolio-project-${index}`}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech: string, techIndex: number) => (
                        <Badge
                          key={techIndex}
                          className={`text-xs px-3 py-1 rounded-full ${
                            techIndex % 2 === 0
                              ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                              : "bg-muted text-foreground"
                          }`}
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!isLoading && projects && projects.length > 6 && (
            <div className="text-center mt-12">
              <Button
                size="lg"
                onClick={() => setShowAll(!showAll)}
                className="gradient-bg text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg"
                data-testid="view-all-projects-button"
              >
                {showAll ? "Show Less" : "View All Projects"}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Modal Popup */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 sm:p-8">
          <SEO
            title={`${selectedProject.title} | Your Company Portfolio`}
            description={selectedProject.description}
            keywords={selectedProject.techStack.join(", ")}
          />
          <div className="bg-white rounded-2xl max-w-3xl w-full shadow-xl overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold">{selectedProject.title}</h2>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              <img
                src={selectedProject.imageUrl}
                alt={selectedProject.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <p className="text-muted-foreground mb-6">
                {selectedProject.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.techStack.map((tech: string, index: number) => (
                  <Badge
                    key={index}
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs px-3 py-1 rounded-full"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline font-semibold"
                  >
                    <ExternalLink className="h-5 w-5" />
                    View Live Project
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-semibold"
                  >
                    <Github className="h-5 w-5" />
                    View Code Repository
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}