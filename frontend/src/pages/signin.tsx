import { Quote } from "../components/quote.tsx";
import { Auth } from "../components/auth.tsx";

const SignIn = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div>
        <Auth type="signin" />
      </div>
      <div className="hidden lg:block">
        <Quote />
      </div>
    </div>
  );
};

export default SignIn;
