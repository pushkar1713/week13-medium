import { Quote } from "../components/quote.tsx";
import { Auth } from "../components/auth.tsx";

const SignUp = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div>
        <Auth type="signup" />
      </div>
      <div className="hidden lg:block">
        <Quote />
      </div>
    </div>
  );
};

export default SignUp;
