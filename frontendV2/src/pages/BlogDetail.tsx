import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { useBlog } from "@/hooks/useBlogs";

interface BlogDetailProps {
  isLoggedIn: boolean;
}

const BlogDetail = ({ isLoggedIn }: BlogDetailProps) => {
  const { id } = useParams<{ id: string }>();
  const { blog, loading, error } = useBlog(id || "");

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-neo-cream flex items-center justify-center">
        <div className="text-4xl text-neo-charcoal font-black tracking-wide">
          LOADING...
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-neo-cream flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl text-neo-charcoal font-black mb-4">
            BLOG NOT FOUND
          </h1>
          <p className="text-2xl text-neo-charcoal tracking-wide">
            {error || "The blog post you are looking for does not exist."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neo-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <article className="bg-neo-cream border-8 border-neo-charcoal p-16">
          <header className="mb-12">
            <h1 className="text-5xl md:text-6xl text-neo-charcoal tracking-tight font-black mb-6 leading-tight">
              {blog.title}
            </h1>
            <div className="flex items-center text-2xl text-neo-charcoal tracking-wide font-light">
              <span>BY</span>
              <span className="font-black ml-2 uppercase">
                {blog.author.name}
              </span>
            </div>
            <div className="w-24 h-2 bg-neo-charcoal mt-6"></div>
          </header>

          <div
            className="prose prose-xl max-w-none text-neo-charcoal leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </article>
      </div>
    </div>
  );
};

export default BlogDetail;
