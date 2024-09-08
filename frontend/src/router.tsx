import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Blog from "./pages/blog";
import SignUp from "./pages/signup";
import SignIn from "./pages/signin";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
    ],
  },
]);

export default appRouter;
