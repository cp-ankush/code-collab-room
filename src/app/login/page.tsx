"use client";
import React, { useState } from "react";
import Link from "next/link";
import useRouter from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onLogin = () => {};
  return (
    <div className="p-10 m-10 flex flex-row justify-center bg-white min-h-full ">
      <div className="w-1/2 bg-stone-800">Hi</div>
      <div className="w-1/2 bg-white m-10">
        <div className="m-16">
          <p className="text-black font-bold text-2xl">Hey, Hello👋</p>

          <h4 className="text-black">
            Enter your email and password to Login.
          </h4>
        </div>
        <div className="mt-10 w-400 m-16">
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
            // onClick={onLogin}
          >
            Signup
          </button>
          <button
            type="button"
            text-white
            className="w-full p-3 text-center rounded-[12px] h-14  bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500"
            onClick={onLogin}
          >
            Login
          </button>
        </div>
        <Link className="text-black" href="/signup">
          Visit Signup!
        </Link>
      </div>
    </div>
  );
}
