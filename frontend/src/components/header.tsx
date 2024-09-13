import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

export const Header = () => {
  return (
    <div className="border-b flex justify-between px-10 py-4">
      <Link to={"/"} className="flex flex-col justify-center cursor-pointer">
        <img className="w-20" src={Logo} alt="" />
      </Link>
      <div>
        <Link to={`/signin`}>
          <button
            type="button"
            className="mr-4 text-white bg-red-500 hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2 w-25"
          >
            Login
          </button>
        </Link>
        <Link to={`/signup`}>
          <button
            type="button"
            className="mr-4 text-white bg-red-500 hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2 w-25"
          >
            Sign Up
          </button>
        </Link>
        <a href="https://github.com/pushkar1713/week13-medium">
          <button
            type="button"
            className="mr-4 text-white bg-red-500 hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2 w-25"
          >
            Github
          </button>
        </a>
      </div>
    </div>
  );
};
