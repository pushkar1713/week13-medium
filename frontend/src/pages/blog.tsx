import { Appbar } from "../components/appbar";
import { FullBlog } from "../components/fullBlog";
import { userBlogs } from "../hooks/hooks";
import { useParams } from "react-router-dom";

// atomFamilies/selectorFamilies
const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = userBlogs({
    id: id || "",
  });

  if (loading || !blog) {
    return (
      <div>
        <Appbar />
        <div className="h-screen flex flex-col justify-center">
          <div className="flex justify-center"> loading...</div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Appbar />
      <FullBlog blog={blog} />
    </div>
  );
};

export default Blog;
