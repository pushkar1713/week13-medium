import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Blog from "./pages/blog";
import SignUp from "./pages/signup";
import SignIn from "./pages/signin";
import { Blogs } from "./pages/blogs";
import { Publish } from "./pages/publish";
import { Home } from "./pages/home";
export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />, // Home page at the root path
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/blog/:id",
        element: <Blog />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/publish",
        element: <Publish />,
      },
    ],
  },
]);

export default appRouter;
