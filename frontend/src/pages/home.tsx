import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { Quote } from "../components/quote";
import Logo from "../assets/logo.png";

export const Home = () => {
  return (
    <div>
      <Header />
      <div className="h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col justify-center items-center font-serif underline decoration-wavy font-bold text-4xl">
            <div>Pen's & Pixels</div>
            <img className="w-1/3 h-1/5" src={Logo} alt="" />
          </div>
          <div className="hidden lg:block">
            <Quote />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
