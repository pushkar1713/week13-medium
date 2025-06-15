import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Publish from "./pages/Publish";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage";
import BlogDetail from "./pages/BlogDetail";
import Footer from "./components/Footer";
import { useBlogs } from "./hooks/useBlogs";
import { Blog } from "./lib/api";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<string>("");
  const {
    blogs: apiBlogs,
    loading: blogsLoading,
    error: blogsError,
    refetch,
  } = useBlogs(isLoggedIn);

  // Convert API blogs to local BlogPost format
  const blogs: BlogPost[] = (apiBlogs || []).map((blog: Blog) => ({
    id: blog.id,
    title: blog.title,
    content: blog.content,
    author: blog.author.name,
    createdAt: new Date().toISOString(), // API doesn't provide createdAt, using current time
  }));

  // Check for existing token on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      // You might want to validate the token here or get user info
    }
  }, []);

  const handleLogin = (email: string) => {
    setIsLoggedIn(true);
    setCurrentUser(email);
    // Trigger refetch of blogs after login
    setTimeout(() => refetch(), 100);
  };

  const handleSignup = (email: string) => {
    setIsLoggedIn(true);
    setCurrentUser(email);
    // Trigger refetch of blogs after signup
    setTimeout(() => refetch(), 100);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser("");
    localStorage.removeItem("token");
  };

  const handlePublish = (title: string, content: string) => {
    // After publishing, refetch blogs to get the latest data
    refetch();
  };

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-main relative overflow-hidden flex flex-col">
          <div className="absolute inset-0 bg-gradient-soft"></div>
          <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
          <div className="flex-grow relative z-10">
            <Routes>
              <Route
                path="/"
                element={
                  isLoggedIn ? (
                    <Home
                      blogs={blogs}
                      loading={blogsLoading}
                      error={blogsError}
                    />
                  ) : (
                    <LandingPage />
                  )
                }
              />
              <Route
                path="/home"
                element={
                  isLoggedIn ? (
                    <Home
                      blogs={blogs}
                      loading={blogsLoading}
                      error={blogsError}
                    />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/login"
                element={
                  isLoggedIn ? (
                    <Navigate to="/home" />
                  ) : (
                    <Login onLogin={handleLogin} />
                  )
                }
              />
              <Route
                path="/signup"
                element={
                  isLoggedIn ? (
                    <Navigate to="/home" />
                  ) : (
                    <Signup onSignup={handleSignup} />
                  )
                }
              />
              <Route
                path="/publish"
                element={
                  isLoggedIn ? (
                    <Publish
                      onPublish={handlePublish}
                      isLoggedIn={isLoggedIn}
                    />
                  ) : (
                    <Navigate
                      to="/login"
                      state={{ from: { pathname: "/publish" } }}
                    />
                  )
                }
              />
              <Route
                path="/blog/:id"
                element={
                  isLoggedIn ? (
                    <BlogDetail isLoggedIn={isLoggedIn} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  );
};

export default App;
