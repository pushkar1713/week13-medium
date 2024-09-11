import { BlogCard } from "../components/blogCard";
import { useBlog } from "../hooks/useBlog";

export const Blogs = () => {
  const { loading, blogs } = useBlog();

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <div>
      {blogs.map((blog) => (
        <BlogCard
          title={blog.title}
          content={blog.content}
          authorName={blog.author.name}
          date="9 September 2002"
        />
      ))}
    </div>
  );
};
