import { Quote } from "../components/quote.tsx";
import { Auth } from "../components/auth.tsx";
import { Header } from "../components/header.tsx";
import { Footer } from "../components/footer.tsx";

const SignUp = () => {
  return (
    <div className="h-screen">
      <Header />
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
          <Auth type="signup" />
        </div>
        <div className="hidden lg:block">
          <Quote />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
