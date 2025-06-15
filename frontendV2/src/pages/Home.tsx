import React from "react";
import BlogCard from "@/components/BlogCard";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

interface HomeProps {
  blogs: BlogPost[];
  loading?: boolean;
  error?: string | null;
}

const Home = ({ blogs, loading = false, error = null }: HomeProps) => {
  return (
    <div className="min-h-screen bg-neo-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-20">
          <h1 className="text-8xl md:text-9xl text-neo-charcoal mb-8 tracking-wide font-black leading-none">
            YOUR FEED
          </h1>
          <div className="w-32 h-2 bg-neo-charcoal"></div>
        </div>

        {loading ? (
          <div className="text-center py-24">
            <h2 className="text-6xl text-neo-charcoal mb-6 tracking-wide font-black">
              LOADING...
            </h2>
            <p className="text-2xl text-neo-charcoal tracking-wide font-light">
              FETCHING YOUR STORIES
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-24 bg-red-100 border-8 border-red-600">
            <h2 className="text-6xl text-red-600 mb-6 tracking-wide font-black">
              ERROR
            </h2>
            <p className="text-2xl text-red-600 tracking-wide font-light">
              {error}
            </p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-24 bg-neo-charcoal border-8 border-neo-charcoal">
            <h2 className="text-6xl text-neo-cream mb-6 tracking-wide font-black">
              NO CONTENT
            </h2>
            <p className="text-2xl text-neo-cream tracking-wide font-light">
              START PUBLISHING YOUR STORIES
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
