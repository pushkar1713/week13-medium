import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { api, SignupType } from "@/lib/api";

interface SignupProps {
  onSignup: (email: string) => void;
}

const Signup = ({ onSignup }: SignupProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      if (!name || !email || !password) {
        toast({
          title: "Error",
          description: "Please fill in all fields.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      const signupData: SignupType = { name, email, password };
      const response = await api.signup(signupData);

      // Store JWT token in localStorage
      localStorage.setItem("token", response.jwt);

      onSignup(email);
      toast({
        title: "Account created!",
        description:
          "Welcome to Pen's and Pixels. You can now start publishing.",
      });
      navigate("/");
    } catch (error: any) {
      console.error("Signup error:", error);
      toast({
        title: "Error",
        description:
          error.response?.data?.message ||
          "Failed to create account. Please try again.",
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
              SIGNUP
            </h1>
            <div className="w-24 h-2 bg-neo-charcoal mx-auto"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label
                htmlFor="name"
                className="text-2xl text-neo-charcoal tracking-wide font-black block mb-3"
              >
                NAME
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="YOUR FULL NAME"
                className="border-4 border-neo-charcoal text-xl p-6 focus:ring-0 focus:border-neo-sage bg-neo-cream font-light h-16 tracking-wide"
              />
            </div>

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
                placeholder="CREATE PASSWORD"
                className="border-4 border-neo-charcoal text-xl p-6 focus:ring-0 focus:border-neo-sage bg-neo-cream font-light h-16 tracking-wide"
              />
            </div>

            <div>
              <Label
                htmlFor="confirmPassword"
                className="text-2xl text-neo-charcoal tracking-wide font-black block mb-3"
              >
                CONFIRM PASSWORD
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="CONFIRM PASSWORD"
                className="border-4 border-neo-charcoal text-xl p-6 focus:ring-0 focus:border-neo-sage bg-neo-cream font-light h-16 tracking-wide"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-neo-charcoal hover:bg-neo-sage text-neo-cream hover:text-neo-charcoal text-2xl py-8 border-4 border-neo-charcoal transition-all duration-200 font-black tracking-wide"
              disabled={loading}
            >
              {loading ? "CREATING..." : "JOIN"}
            </Button>
          </form>

          <div className="text-center mt-10">
            <p className="text-xl text-neo-charcoal tracking-wide font-light">
              ALREADY MEMBER?{" "}
              <Link
                to="/login"
                className="text-neo-charcoal hover:opacity-60 underline font-black"
              >
                LOGIN HERE
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
