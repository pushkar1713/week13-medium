import { Footer } from "../components/footer.tsx";
import { Header } from "../components/header.tsx";
import { Login } from "../components/Login.tsx";
import { Quote } from "../components/quote.tsx";

const SignIn = () => {
  return (
    <div className="h-screen">
      <Header />
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
          <Login />
        </div>
        <div className="hidden lg:block">
          <Quote />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignIn;
