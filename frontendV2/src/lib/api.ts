import axios from "axios";
import { BACKEND_URL } from "./config";

// Types from the v1 version
export interface Blog {
  content: string;
  title: string;
  id: string;
  author: {
    name: string;
  };
}

export interface SignupType {
  name?: string;
  email: string;
  password: string;
}

export interface SigninType {
  email: string;
  password: string;
}

// API utility functions
export const api = {
  // Authentication APIs
  signup: async (userData: SignupType) => {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/user/signup`,
      userData
    );
    return response.data;
  },

  signin: async (userData: SigninType) => {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/user/signin`,
      userData
    );
    return response.data;
  },

  // Blog APIs
  getAllBlogs: async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  getBlogById: async (id: string) => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.blog;
  },

  createBlog: async (blogData: { title: string; content: string }) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, blogData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};
