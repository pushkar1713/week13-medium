import { Appbar } from "../components/appbar";
import { Footer } from "../components/footer";
import { FullBlog } from "../components/fullBlog";
import { Spinner } from "../components/spinner";
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
          <div className="flex justify-center">
            <Spinner />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="h-screen">
      <Appbar />
      <FullBlog blog={blog} />
      <Footer />
    </div>
  );
};

export default Blog;
