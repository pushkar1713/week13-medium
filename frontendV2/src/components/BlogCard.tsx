import React from "react";
import { useNavigate } from "react-router-dom";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

interface BlogCardProps {
  blog: BlogPost;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  const navigate = useNavigate();

  const getExcerpt = (content: string, maxLength: number = 200) => {
    const textContent = content.replace(/<[^>]*>/g, "");
    return textContent.length > maxLength
      ? textContent.substring(0, maxLength) + "..."
      : textContent;
  };

  const handleReadMore = () => {
    navigate(`/blog/${blog.id}`);
  };

  return (
    <article
      className="bg-neo-cream border-8 border-neo-charcoal hover:bg-neo-sage transition-colors duration-200 cursor-pointer"
      onClick={handleReadMore}
    >
      <div className="p-12">
        <header className="mb-8">
          <h2 className="text-5xl md:text-6xl text-neo-charcoal tracking-wide font-black leading-tight mb-4">
            {blog.title.toUpperCase()}
          </h2>
          <div className="flex items-center gap-4">
            <div className="bg-neo-charcoal px-6 py-2">
              <span className="text-neo-cream font-black tracking-wide">
                {blog.author.toUpperCase()}
              </span>
            </div>
            <span className="text-xl text-neo-charcoal font-light tracking-wide">
              {new Date(blog.createdAt).toLocaleDateString()}
            </span>
          </div>
        </header>

        <div className="mb-8">
          <p className="text-xl text-neo-charcoal leading-relaxed font-light tracking-wide">
            {getExcerpt(blog.content)}
          </p>
        </div>

        <footer>
          <button className="bg-neo-charcoal hover:bg-neo-cream hover:text-neo-charcoal text-neo-cream px-8 py-4 border-4 border-neo-charcoal font-black tracking-wide transition-all duration-200 text-lg">
            READ MORE
          </button>
        </footer>
      </div>
    </article>
  );
};

export default BlogCard;
