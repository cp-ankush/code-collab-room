"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignupPage() {
  const router = useRouter();

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    username: Yup.string()
      .matches(/^[a-zA-Z]/, "*Username first character must be alphabet")
      .min(6, "*Username must be at least 6 characters")
      .max(15, "*Username must not be exceed 15 characters")
      .required("*Name is required"),
    email: Yup.string()
      .email("*Invalid email address")
      .required("*Email is required"),
    password: Yup.string()
      .min(6, "*Password must be at least 6 characters")
      .required("*Password is required"),
  });
  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      response.status == 200 && toast.success(response?.data?.message);
      router.push("/login");
    } catch (error) {
      // @ts-ignore: catch error message can be any
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

      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={onSignup}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <div>
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
                  <Field
                    type="text"
                    className="w-full p-3 border border-gray-400 rounded-lg mb-4 focus:outline-none focus: border-gray-400 text-black"
                    placeholder="Username"
                    name="username"
                    // @ts-ignore: catch error message can be any
                    onChange={(e) => {
                      setUser({ ...user, username: e.target.value });
                      setFieldValue("username", e.target.value);
                    }}
                  />
                  <ErrorMessage
                    className="text-red-600 font-bold"
                    name="username"
                    component="span"
                  />
                  <h4 className="text-black from-neutral-600 ">Email</h4>
                  <Field
                    type="text"
                    name="email"
                    className="w-full p-3  border border-gray-400 rounded-lg mb-4 focus:outline-none focus: border-gray-400 text-black"
                    placeholder="Enter your email"
                    // @ts-ignore: catch error message can be any
                    onChange={(e) => {
                      setUser({ ...user, email: e.target.value });
                      setFieldValue("email", e.target.value);
                    }}
                  />
                  <ErrorMessage
                    className="text-red-600 font-bold"
                    name="email"
                    component="span"
                  />
                  <h4 className="text-black from-neutral-600">Password</h4>
                  <Field
                    type="password"
                    name="password"
                    className="w-full p-3  border border-gray-400 rounded-lg mb-4 focus:outline-none focus: border-gray-400 text-black"
                    placeholder="Enter your password"
                    // @ts-ignore: catch error message can be any
                    onChange={(e) => {
                      setUser({ ...user, password: e.target.value });
                      setFieldValue("password", e.target.value);
                    }}
                  />
                  <ErrorMessage
                    className="text-red-600 font-bold"
                    name="password"
                    component="span"
                  />
                </div>
                <div className=" m-16 flex flex-row gap-12">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full p-3 text-center rounded-[12px] h-14  bg-gradient-to-r from-purple-500 via-pink-600 to-red-400"
                  >
                    {buttonDisabled ? "No Signup" : "Signup"}
                  </button>
                  <button
                    type="button"
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
          </Form>
        )}
      </Formik>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
