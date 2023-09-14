"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="p-10 m-10 flex flex-row justify-center bg-white min-h-full ">
      <div className="w-1/2 bg-stone-800">Hi</div>
      <div className="w-1/2 bg-white m-10">
        <div className="m-16">
          <p className="text-black font-bold text-2xl">Hey, Hello👋</p>

          <h4 className="text-black">
            {loading
              ? "Processing"
              : "Enter your username, email and password to signup."}
          </h4>
        </div>
        <div className="mt-10 w-400 m-16">
          <h4 className="text-black from-neutral-600 ">Username</h4>
          <input
            type="text"
            className="w-full p-3 border border-gray-400 rounded-lg mb-4 focus:outline-none focus: border-gray-400 text-black"
            placeholder="Username"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
          <h4 className="text-black from-neutral-600 ">Email</h4>
          <input
            type="text"
            className="w-full p-3  border border-gray-400 rounded-lg mb-4 focus:outline-none focus: border-gray-400 text-black"
            placeholder="Enter your email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <h4 className="text-black from-neutral-600">Password</h4>
          <input
            type="password"
            className="w-full p-3  border border-gray-400 rounded-lg mb-4 focus:outline-none focus: border-gray-400 text-black"
            placeholder="Enter your password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <div className=" m-16 flex flex-row gap-12">
          <button
            type="button"
            text-white
            className="w-full p-3 text-center rounded-[12px] h-14  bg-gradient-to-r from-purple-500 via-pink-600 to-red-400"
            onClick={onSignup}
          >
            {buttonDisabled ? "No Signup" : "Signup"}
          </button>
          <button
            type="button"
            text-white
            className="w-full p-3 text-center rounded-[12px] h-14  bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500"
          >
            Login
          </button>
        </div>
        <Link className="text-black" href="/login">
          Visit Login!
        </Link>
      </div>
    </div>
  );
}
