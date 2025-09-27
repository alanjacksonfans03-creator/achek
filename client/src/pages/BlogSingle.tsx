// src/pages/BlogSingle.tsx
import { useEffect } from "react";
import { useParams } from "wouter";
import { blogPosts } from "@/pages/data/blogPosts";
import { Badge } from "@/components/ui/badge";

// ✅ Reusable AdSense component
const AdSenseAd = ({
  slot,
  format = "auto",
  layout,
  position,
}: {
  slot: string;
  format?: string;
  layout?: string;
  position: string;
}) => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.log("Adsbygoogle error", e);
    }
  }, []);

  return (
    <div className="my-6 w-full text-center">
      <ins
        className="adsbygoogle"
        style={{ display: "block", textAlign: layout ? "center" : "initial" }}
        data-ad-client="ca-pub-5807971758805138"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
        data-ad-layout={layout}
      ></ins>
    </div>
  );
};

export default function BlogSingle() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">404 - Post Not Found</h1>
          <p className="text-muted-foreground">
            The article you’re looking for doesn’t exist or may have been moved.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 max-w-6xl mx-auto px-4 lg:flex gap-10">
      {/* Main Content */}
      <article className="lg:w-2/3">
        {/* Blog Top Ad */}
        <AdSenseAd slot="5947626241" position="Blog Top" />

        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-6">
          <span>{post.date}</span>•<span>{post.author}</span>
          <Badge>{post.category}</Badge>
        </div>
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-80 object-cover rounded-lg mb-6"
        />

        {/* ✅ Dark mode compatible typography */}
        <div className="prose dark:prose-invert max-w-none">
          {post.content.map((paragraph, index) => (
            <div key={index}>
              <p className="mb-4">{paragraph}</p>
              {index === 1 && (
                <AdSenseAd
                  slot="1469379080"
                  format="fluid"
                  layout="in-article"
                  position="In-Article #1"
                />
              )}
              {index === 3 && (
                <AdSenseAd
                  slot="7519233378"
                  format="fluid"
                  layout="in-article"
                  position="In-Article #2"
                />
              )}
            </div>
          ))}
        </div>

        {/* Blog Bottom Ad */}
        <AdSenseAd slot="6530134072" position="Blog Bottom" />
      </article>

      {/* Sidebar */}
      <aside className="lg:w-1/3 lg:sticky lg:top-28 mt-10 lg:mt-0 space-y-6">
        {/* Sidebar Top Ad */}
        <AdSenseAd slot="4893070033" position="Sidebar Top" />

        <div className="p-4 border rounded-lg shadow-sm bg-card dark:bg-gray-900">
          <h2 className="text-xl font-bold mb-3">Related Posts</h2>
          <ul className="space-y-2 text-primary">
            {blogPosts
              .filter((p) => p.slug !== post.slug)
              .slice(0, 5)
              .map((related) => (
                <li key={related.slug}>
                  <a
                    href={`/blog/${related.slug}`}
                    className="hover:underline text-sm"
                  >
                    {related.title}
                  </a>
                </li>
              ))}
          </ul>
        </div>

        {/* Sidebar Bottom Ad */}
        <AdSenseAd slot="8382217895" position="Sidebar Bottom" />
      </aside>
    </div>
  );
}
