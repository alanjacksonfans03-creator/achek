import { Link } from "wouter";
import { blogPosts } from "@/pages/data/blogPosts";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SEO from "@/components/seo";

export default function Blog() {
  return (
    <div className="pt-20 pb-16 bg-background">
      <SEO
        title="Blog - Web Development, Tech Insights & Digital Marketing Tips | Achek Digital Solutions"
        description="Stay updated with the latest web development trends, mobile app insights, AI technology, and digital marketing tips. Expert insights from Achek Digital Solutions team."
        canonical="https://achek.com.ng/blog"
        keywords="web development blog Nigeria, mobile app development blog, AI technology blog, digital marketing tips, tech insights Nigeria, software development blog Africa"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Our Blog</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.slug} className="overflow-hidden hover:shadow-lg transition">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="h-48 w-full object-cover"
                loading="lazy"
              />
              <CardContent className="p-4">
                <Badge className="mb-2">{post.category}</Badge>
                <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  {post.excerpt}
                </p>
                <Link href={`/blog/${post.slug}`}>
                  <a className="text-primary font-medium hover:underline">
                    Read More →
                  </a>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}