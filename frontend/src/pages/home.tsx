import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div>
      <div>this is my home page</div>
      <Link to={"/signup"}>
        <div>signup</div>
      </Link>
    </div>
  );
};
