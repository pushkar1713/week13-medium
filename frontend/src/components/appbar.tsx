import { Avatar } from "./blogCard";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

export const Appbar = () => {
  return (
    <div className="border-b flex justify-between px-10 py-4">
      <Link
        to={"/blogs"}
        className="flex flex-col justify-center cursor-pointer"
      >
        <img className="w-20" src={Logo} alt="" />
      </Link>
      <div>
        <Link to={`/publish`}>
          <button
            type="button"
            className="mr-4 text-white bg-red-500 hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 "
          >
            New
          </button>
        </Link>

        <Avatar size={"big"} name="User" />
      </div>
    </div>
  );
};
