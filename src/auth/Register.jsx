import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const { register, googleSignIn } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  // 🔹 Handle SignUp
  const handleSignup = (e) => {
    e.preventDefault();
    const name = e.target.name?.value;
    const photo = e.target.photo?.value;
    const email = e.target.email?.value;
    const password = e.target.password?.value;
  console.log("SignUp Sucessfully",{email,password,name,photo})

    // Password validation
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one uppercase letter");
      return;
    }

    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain at least one lowercase letter");
      return;
    }

    //  Register user
    register(name,email, password,photo)
      .then((res) => {
        console.log(res)
        toast.success("Registration successful!");
        navigate("/");
      })
      .catch((e) => {
        if (e.code === "auth/email-already-in-use") {
          toast.error("This email is already registered!");
        } else {
          toast.error(e.message);
        }
      });
  };

  //  Google Sign-in
  const handleGoogleSignin = () => {
    googleSignIn()
      .then(() => {
        toast.success("Google Sign-in successful!");
        navigate("/");
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#06251a] via-[#7a3494] to-[#581458] p-4">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-purple-200 transition-all hover:shadow-purple-500/40">
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Create Your HomeNest Account
        </h2>

        <form onSubmit={handleSignup} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-white mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Md. Abdulla Hil Kafi"
              className="w-full px-4 py-2 rounded-lg border border-purple-300 bg-white/70 focus:ring-2 focus:ring-purple-400 outline-none"
              required
            />
          </div>

          {/* Photo */}
          <div>
            <label className="block text-sm font-semibold text-white mb-1">
              Photo URL
            </label>
            <input
              type="text"
              name="photo"
              placeholder="https://i.ibb.co/example.png"
              className="w-full px-4 py-2 rounded-lg border border-purple-300 bg-white/70 focus:ring-2 focus:ring-purple-400 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-white mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              className="w-full px-4 py-2 rounded-lg border border-purple-300 bg-white/70 focus:ring-2 focus:ring-purple-400 outline-none"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-semibold text-white mb-1">
              Password
            </label>
            <input
              type={show ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg border border-purple-300 bg-white/70 focus:ring-2 focus:ring-purple-400 outline-none"
              required
            />
            <span
              onClick={() => setShow(!show)}
              className="absolute right-3 top-9 cursor-pointer text-purple-700"
            >
              {show ? <FaEye /> : <IoEyeOff />}
            </span>
          </div>

          {/* Register button */}
          <button
            type="submit"
            className="w-full py-2.5 mt-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:scale-[1.02] transition-all shadow-md"
          >
            Register
          </button>

          {/* Divider */}
          <div className="flex items-center justify-center gap-3 my-2">
            <div className="h-px w-20 bg-purple-300"></div>
            <span className="text-sm font-semibold text-white">or</span>
            <div className="h-px w-20 bg-purple-300"></div>
          </div>

          {/* Google Signin */}
          <button
            type="button"
            onClick={handleGoogleSignin}
            className="w-full flex items-center justify-center gap-3 py-2 border border-purple-300 rounded-lg bg-white/70 hover:bg-purple-50 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="w-5 h-5"
            />
            <span className="font-semibold text-gray-800">
              Continue with Google
            </span>
          </button>

          {/* Link to Login */}
          <p className="text-center text-white mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-pink-400 hover:underline"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
