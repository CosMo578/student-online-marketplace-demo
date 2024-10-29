"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { useRouter } from "next/navigation";
import MyCheckbox from "@/components/MyCheckbox";
import MyTextInput from "@/components/MyTextInput";
import MyPasswordInput from "@/components/MyPasswordInput";
import Link from "next/link";
import Image from "next/image";

const Login = async () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const initialValues = {
    email: "",
    password: "",
    rememberMe: false,
  };

  const schemaObject = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
      )
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    rememberMe: Yup.boolean().optional(),
  });

  const SignInWithPopUp = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    router.push("/");
  };

  const handleSubmit = async (values, actions) => {
    try {
      setIsSubmitting((prev) => !prev);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password,
      );
      const token = await userCredential.user.getIdToken();
      document.cookie = `token=${token}; path=/`;

      router.push("/");

      console.log(auth.currentUser.uid);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <section className="grid h-screen w-[100vw] items-center lg:place-items-center">
      <Formik
        initialValues={initialValues}
        validationSchema={schemaObject}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col gap-5 p-6 lg:mx-auto lg:w-[60%]">
          <h1 className="mb-6 text-center text-2xl">
            Login to get access to all our amazing products
          </h1>

          <button
            onClick={SignInWithPopUp}
            type="button"
            className="flex w-full items-center justify-center rounded-lg border-2 px-6 py-3"
          >
            Login with Google
            <Image
              className="ms-4"
              src="/svg/google.svg"
              alt="google icon"
              width={30}
              height={30}
            />
          </button>

          <MyTextInput
            label="Email Address"
            name="email"
            id="email"
            type="email"
            placeholder="tatemcrae88@gmail.com"
          />

          <MyPasswordInput
            label="Password"
            name="password"
            id="password"
            placeholder="*********"
          />

          <div className="flex items-center justify-between accent-primary">
            <MyCheckbox name="rememberMe">Remember me</MyCheckbox>

            <Link
              className="ms-2 font-medium text-primary hover:cursor-pointer hover:underline"
              href="/forgot-password"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            className="w-full rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-bold text-white focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
          <p className="text-center">
            Don&apos;t have an account?{" "}
            <Link
              className="ms-2 text-primary hover:cursor-pointer hover:underline"
              href="/signup"
            >
              SignUp
            </Link>
          </p>
        </Form>
      </Formik>
    </section>
  );
};

export default Login;
