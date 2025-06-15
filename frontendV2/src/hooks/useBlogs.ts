import { useEffect, useState } from "react";
import { api, Blog } from "@/lib/api";

export const useBlogs = (shouldFetch: boolean = true) => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      const token = localStorage.getItem("token");

      // Don't fetch if no token or shouldFetch is false
      if (!token || !shouldFetch) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await api.getAllBlogs();
        setBlogs(data);
      } catch (err) {
        setError("Failed to fetch blogs");
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [shouldFetch]); // Add shouldFetch as dependency

  const refetch = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No authentication token found");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await api.getAllBlogs();
      setBlogs(data);
    } catch (err) {
      setError("Failed to fetch blogs");
      console.error("Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    blogs,
    error,
    refetch,
  };
};

export const useBlog = (id: string) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      const token = localStorage.getItem("token");

      // Don't fetch if no token
      if (!token) {
        setError("Authentication required");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await api.getBlogById(id);
        setBlog(data);
      } catch (err) {
        setError("Failed to fetch blog");
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  return {
    loading,
    blog,
    error,
  };
};
