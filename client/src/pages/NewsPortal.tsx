import { useState } from "react";

// Fake data
const categories = ["All", "Politics", "Business", "Technology", "Sports", "Entertainment", "Health"];

const featuredPost = {
  id: 1,
  title: "Nigerian Tech Startups Attract $500M in New Funding",
  excerpt: "A record-breaking year for Nigerian fintech and AI-driven startups as global investors pour funds into the ecosystem.",
  image: "https://source.unsplash.com/random/1200x600/?technology,africa",
  category: "Technology",
  date: "Sept 15, 2025",
};

const articles = [
  {
    id: 2,
    title: "Super Eagles Secure AFCON Victory",
    excerpt: "The Nigerian national football team clinched a 2-1 victory in a thrilling final match.",
    image: "https://source.unsplash.com/random/400x300/?football,nigeria",
    category: "Sports",
    date: "Sept 14, 2025",
  },
  {
    id: 3,
    title: "CBN Introduces New Digital Banking Regulations",
    excerpt: "The Central Bank of Nigeria has announced stricter compliance measures for fintech operators.",
    image: "https://source.unsplash.com/random/400x300/?banking,finance",
    category: "Business",
    date: "Sept 13, 2025",
  },
  {
    id: 4,
    title: "Nollywood Expands Global Reach via Netflix",
    excerpt: "Nigerian filmmakers are gaining international recognition as Nollywood titles trend worldwide.",
    image: "https://source.unsplash.com/random/400x300/?cinema,movie",
    category: "Entertainment",
    date: "Sept 12, 2025",
  },
  {
    id: 5,
    title: "Health Experts Warn of Cholera Outbreak in Lagos",
    excerpt: "Public health officials caution residents to practice better sanitation amid rising cases.",
    image: "https://source.unsplash.com/random/400x300/?health,hospital",
    category: "Health",
    date: "Sept 11, 2025",
  },
];

export default function NewsPortal() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredArticles =
    selectedCategory === "All"
      ? articles
      : articles.filter((a) => a.category === selectedCategory);

  return (
    <div className="pt-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* ✅ Padding top prevents navbar overlap */}

      {/* Featured Post */}
      <section className="mb-12">
        <div className="relative rounded-2xl overflow-hidden shadow-lg">
          <img
            src={featuredPost.image}
            alt={featuredPost.title}
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10 flex items-end p-6">
            <div>
              <span className="text-sm text-blue-400 font-medium">
                {featuredPost.category}
              </span>
              <h2 className="text-3xl font-bold text-white mb-2">
                {featuredPost.title}
              </h2>
              <p className="text-slate-200 max-w-2xl">{featuredPost.excerpt}</p>
              <p className="text-xs text-slate-300 mt-2">{featuredPost.date}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-12 gap-8">
        {/* Sidebar Categories */}
        <aside className="hidden md:block col-span-3">
          <div className="sticky top-28 space-y-2">
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === cat
                        ? "bg-blue-600 text-white"
                        : "hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Articles Grid */}
        <main className="col-span-12 md:col-span-9">
          <h3 className="text-xl font-semibold mb-4">
            {selectedCategory} News
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow bg-white dark:bg-slate-900"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <span className="text-xs uppercase text-blue-600 font-medium">
                    {article.category}
                  </span>
                  <h4 className="mt-2 text-lg font-semibold">{article.title}</h4>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    {article.excerpt}
                  </p>
                  <p className="text-xs text-slate-400 mt-2">{article.date}</p>
                </div>
              </article>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
