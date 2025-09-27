export interface BlogPost {
  title: string;
  date: string;
  author: string;
  image: string;
  content: string;
  slug: string;
}

export const posts: BlogPost[] = [
  {
    title: "The Future of Digital Transformation",
    date: "2025-09-19",
    author: "Caleb Onuche",
    image: "https://images.unsplash.com/photo-1581090700227-0a00a5c2076e?auto=format&fit=crop&w=800&q=80",
    content: `Digital transformation is reshaping businesses worldwide. 
              Companies that adopt technology early gain competitive advantages. 
              In this post, we explore how AI, cloud computing, and automation 
              can enhance business efficiency.`,
    slug: "digital-transformation",
  },
  {
    title: "Top Web Development Trends in 2025",
    date: "2025-08-10",
    author: "Caleb Onuche",
    image: "https://images.unsplash.com/photo-1581091870623-c0d38518e6c3?auto=format&fit=crop&w=800&q=80",
    content: `Web development is evolving fast. From Jamstack to Next.js 
              and advanced UI/UX design, developers must stay ahead. 
              Learn the key trends shaping modern websites.`,
    slug: "web-development-trends",
  },
  {
    title: "How AI is Transforming Businesses",
    date: "2025-07-01",
    author: "Caleb Onuche",
    image: "https://images.unsplash.com/photo-1581091215366-fd91d2ff846f?auto=format&fit=crop&w=800&q=80",
    content: `Artificial Intelligence is no longer the future; it's the present. 
              Discover how AI improves customer experience, automates tasks, 
              and drives data-driven decisions.`,
    slug: "ai-transforming-business",
  },
];
