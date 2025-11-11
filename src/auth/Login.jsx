import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";


const Login = () => {
  const { login, googleSignIn } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      toast.error("Please enter both email and password!");
      return;
    }

    login(email, password)
      .then((res) => {
        console.log(res.user);
        toast.success("Login successful!");
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
        if (e.code === "auth/invalid-credential" || e.code === "auth/wrong-password") {
          toast.error("Incorrect email or password!");
        } else if (e.code === "auth/user-not-found") {
          toast.error("User not found! Please register first.");
        } else {
          toast.error(e.message);
        }
      });
  };

  const handleGoogleSignin = () => {
    googleSignIn()
      .then((res) => {
        console.log(res.user);
        toast.success("Login successful!");
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
        toast.error(e.message);
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#06251a] via-[#7a3494] to-[#581458] px-4">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-lg shadow-2xl rounded-3xl border border-white/30 p-8 transition-all hover:shadow-purple-500/30">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6">
          Welcome Back 🌸
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-purple-900 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-purple-900 mb-1">
              Password
            </label>
            <input
              type={show ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
              required
            />
            <span
              onClick={() => setShow(!show)}
              className="absolute right-3 top-9 cursor-pointer text-lg text-purple-600"
            >
              {show ? <FaEye /> : <IoEyeOff />}
            </span>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-md hover:from-purple-600 hover:to-pink-600 transition-all"
          >
            Login
          </button>

          {/* Divider */}
          <div className="flex items-center justify-center gap-2 my-2">
            <div className="h-px w-16 bg-purple-500"></div>
            <span className="text-sm font-semibold text-purple-700">or</span>
            <div className="h-px w-16 bg-purple-500"></div>
          </div>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogleSignin}
            className="w-full flex items-center justify-center gap-3 border border-purple-300 py-2 rounded-lg hover:bg-purple-50 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          <p className="font-semibold text-center pt-5 text-purple-900">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-purple-700 font-bold hover:underline hover:text-pink-500"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
