import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { api, SigninType } from "@/lib/api";

interface LoginProps {
  onLogin: (email: string) => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!email || !password) {
        toast({
          title: "Error",
          description: "Please fill in all fields.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      const signinData: SigninType = { email, password };
      const response = await api.signin(signinData);

      // Store JWT token in localStorage
      localStorage.setItem("token", response.jwt);

      onLogin(email);
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      navigate(from, { replace: true });
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Error",
        description:
          error.response?.data?.message ||
          "Failed to login. Please check your credentials.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neo-cream flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl">
        <div className="bg-neo-cream border-8 border-neo-charcoal p-16">
          <div className="text-center mb-12">
            <h1 className="text-7xl text-neo-charcoal tracking-wide font-black mb-4">
              LOGIN
            </h1>
            <div className="w-24 h-2 bg-neo-charcoal mx-auto"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <Label
                htmlFor="email"
                className="text-2xl text-neo-charcoal tracking-wide font-black block mb-3"
              >
                EMAIL
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="YOUR EMAIL ADDRESS"
                className="border-4 border-neo-charcoal text-xl p-6 focus:ring-0 focus:border-neo-sage bg-neo-cream font-light h-16 tracking-wide"
              />
            </div>

            <div>
              <Label
                htmlFor="password"
                className="text-2xl text-neo-charcoal tracking-wide font-black block mb-3"
              >
                PASSWORD
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="YOUR PASSWORD"
                className="border-4 border-neo-charcoal text-xl p-6 focus:ring-0 focus:border-neo-sage bg-neo-cream font-light h-16 tracking-wide"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-neo-charcoal hover:bg-neo-sage text-neo-cream hover:text-neo-charcoal text-2xl py-8 border-4 border-neo-charcoal transition-all duration-200 font-black tracking-wide"
              disabled={loading}
            >
              {loading ? "LOGGING IN..." : "ENTER"}
            </Button>
          </form>

          <div className="text-center mt-12">
            <p className="text-xl text-neo-charcoal tracking-wide font-light">
              NEW HERE?{" "}
              <Link
                to="/signup"
                className="text-neo-charcoal hover:opacity-60 underline font-black"
              >
                CREATE ACCOUNT
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
