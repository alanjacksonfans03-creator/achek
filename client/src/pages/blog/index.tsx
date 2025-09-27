import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { posts } from "./posts";

export default function Blog() {
  return (
    <div className="pt-16">
      <section className="py-24 text-center bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Achek Blog</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Insights, trends, and tips on digital solutions, AI, web development, and business innovation.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid gap-12 lg:grid-cols-3">
        {posts.map((post) => (
          <Card key={post.slug} className="hover:shadow-xl transition-transform duration-300 hover:-translate-y-2">
            <CardContent className="p-0">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover rounded-t-2xl"
              />
              <div className="p-6">
                <div className="text-sm text-muted-foreground mb-2">
                  {post.date} • {post.author}
                </div>
                <h3 className="text-2xl font-bold mb-4">{post.title}</h3>
                <p className="text-muted-foreground mb-4">{post.content.slice(0, 120)}...</p>
                <Link href={`/blog/${post.slug}`}>
                  <button className="gradient-bg text-white px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-transform">
                    Read More
                  </button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
