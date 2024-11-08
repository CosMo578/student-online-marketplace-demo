"use client";
import * as Yup from "yup";
import Link from "next/link";
import { useState } from "react";
import { Formik, Form } from "formik";
import { auth } from "../config/firebase";
import { useRouter } from "next/navigation";
import MyTextInput from "@/components/MyTextInput";
import { signInWithEmailAndPassword } from "firebase/auth";
import MyPasswordInput from "@/components/MyPasswordInput";

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const initialValues = {
    email: "",
    password: "",
  };

  const schemaObject = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values) => {
    try {
      setIsSubmitting(true);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password,
      );
      const token = await userCredential.user.getIdToken();
      document.cookie = `token=${token}; path=/`;

      router.push("/products");
    } catch (error) {
      alert("Login error!! \n", error.message);
    } finally {
      setIsSubmitting(false);
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
          <h1 className="mb-6 text-center text-2xl font-semibold">
            Continue shopping from where you left. <br /> Dive Right back in.
          </h1>

          <MyTextInput
            label="Email Address"
            name="email"
            id="email"
            type="email"
            placeholder="tonystark@gmail.com"
          />

          <MyPasswordInput
            label="Password"
            name="password"
            id="password"
            placeholder="*********"
          />

          <button
            className="w-full rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-bold text-white focus:outline-none focus:ring-4 sm:w-auto"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging you in..." : "Login"}
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
