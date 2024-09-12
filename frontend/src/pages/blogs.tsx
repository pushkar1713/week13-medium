import { Appbar } from "../components/appbar";
import { BlogCard } from "../components/blogCard";
import { useBlog } from "../hooks/hooks";

export const Blogs = () => {
  const { loading, blogs } = useBlog();

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <div>
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
    </div>
  );
};
