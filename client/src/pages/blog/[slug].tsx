import { useRoute } from "wouter";
import { posts } from "./posts";

export default function BlogPost() {
  const [match, params] = useRoute("/blog/:slug");
  const post = posts.find((p) => p.slug === params?.slug);

  if (!post) {
    return (
      <div className="pt-16 text-center">
        <h1 className="text-4xl font-bold">Post not found</h1>
      </div>
    );
  }

  return (
    <div className="pt-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-5xl font-bold mb-6">{post.title}</h1>
      <p className="text-sm text-muted-foreground mb-2">
        {post.date} • {post.author}
      </p>
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-96 object-cover rounded-2xl mb-8"
      />
      <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
        {post.content}
      </p>
    </div>
  );
}
