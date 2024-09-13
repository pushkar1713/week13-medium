import { Appbar } from "../components/appbar";
import { BlogCard } from "../components/blogCard";
import { BlogSkeleton } from "../components/blogSkeleton";
import { Footer } from "../components/footer";
import { useBlog } from "../hooks/hooks";

export const Blogs = () => {
  const { loading, blogs } = useBlog();

  if (loading) {
    return (
      <div>
        <Appbar />
        <div className="flex justify-center">
          <div>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen">
      <Appbar />
      <h1 className="flex justify-center font-serif font-bold text-4xl p-7 underline decoration-wavy">
        Pens and Pixels Blog
      </h1>
      {blogs.map((blog) => (
        <BlogCard
          title={blog.title}
          content={blog.content}
          authorName={blog.author.name}
          date="9 September 2002"
          id={blog.id}
        />
      ))}
      <Footer />
    </div>
  );
};
