import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { SignupType } from "@pushkar1713/week13-common";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupType>({
    name: "",
    email: "",
    password: "",
  });

  const sendRequest = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      );
      const jwt = response.data.jwt;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (e) {
      alert("error while signing up");
    }
  };

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex flex-col items-center">
        <div className="m-2 p-4">
          <div className="font-extrabold text-3xl p-1">
            {type === "signin" ? "Welcome Back" : "Create an Account"}
          </div>
          <div className="text-slate-400 pl-2">
            {type === "signin"
              ? "Don't have an account?"
              : "Already have an account?"}
            <Link
              to={type === "signin" ? "/signup" : "/signin"}
              className="underline pl-1"
            >
              {type === "signup" ? "Login" : "Sign Up"}
            </Link>
          </div>
        </div>
        <div className="p-2 w-1/2">
          <LabelledInput
            label="Email"
            placeholder="johndoe@email.com"
            onChange={(e) => {
              setPostInputs((c) => ({
                ...c,
                email: e.target.value,
              }));
            }}
          />
          {type === "signup" ? (
            <LabelledInput
              label="Name"
              placeholder="john doe"
              onChange={(e) => {
                setPostInputs((c) => ({
                  ...c,
                  name: e.target.value,
                }));
              }}
            />
          ) : null}
          <LabelledInput
            label="Password"
            placeholder="Min. 6 Characters"
            type={"password"}
            onChange={(e) => {
              setPostInputs((c) => ({
                ...c,
                password: e.target.value,
              }));
            }}
          />
          <button
            type="button"
            onClick={sendRequest}
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-5 w-full"
          >
            {type === "signin" ? "Sign in" : "Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
};

interface labelledInputTypes {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}
function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: labelledInputTypes) {
  return (
    <div>
      <label
        htmlFor="first_name"
        className="block pt-3 text-sm font-semibold text-gray-900"
      >
        {label}
      </label>
      <input
        type={type || "text"}
        id="first_name"
        onChange={onChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
