"use client";
import * as Yup from "yup";
import Link from "next/link";
import { useState } from "react";
import { Formik, Form } from "formik";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase.js";
import MyTextInput from "@/components/MyTextInput";
import MyRadioInput from "@/components/MyRadioInput";
import MyPasswordInput from "@/components/MyPasswordInput";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Signup = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const initialValues = {
    accountType: "",
    userName: "",
    matNum: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  function generateMatricPattern() {
    const currentYear = new Date().getFullYear();
    const sessionYear = currentYear - 2;
    const nextYear = currentYear - 1;

    return new RegExp(
      `^M\\.(${sessionYear.toString().slice(-2)}|${nextYear.toString().slice(-2)})\\/(ND|HND)\\/(CSIT|PEG|PNGPD|EEED|ESMT|SLT|PMBS|CET|ISET|MPRE|MEC|WEOT)\\/\\d{5}$`,
    );
  }

  const schemaObject = Yup.object({
    accountType: Yup.string().required("Required"),
    userName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    matNum: Yup.string()
      .matches(generateMatricPattern(), "Invalid matriculation number")
      .required("Matriculation number is required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
      )
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
  });

  const handleSubmit = async (values, actions) => {
    setIsSubmitting(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password,
      );

      const userId = userCredential.user.uid;
      await setDoc(doc(db, "users", userId), {
        userName: values.userName,
        matNum: values.matNum,
        email: values.email,
        accountType: values.accountType,
      });

      alert("Sign up successful");
      router.push("/login");
    } catch (error) {
      alert("Signup failed " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="grid min-h-screen w-[100vw] py-10 lg:place-items-center">
      <Formik
        initialValues={initialValues}
        validationSchema={schemaObject}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col gap-5 p-6 lg:mx-auto lg:w-[50%]">
          <ul className="mb-8 grid w-full gap-6 md:grid-cols-2">
            <li>
              <MyRadioInput
                label="Sign up as a Seller"
                id="seller"
                value="seller"
                name="accountType"
              />
            </li>

            <li>
              <MyRadioInput
                label="Sign up as a Buyer"
                id="buyer"
                value="buyer"
                name="accountType"
              />
            </li>
          </ul>

          <div className="grid gap-6 md:grid-cols-2">
            <MyTextInput
              label="User Name"
              name="userName"
              id="userName"
              type="text"
              placeholder="Enter your username"
            />

            <MyTextInput
              label="Mat. Number"
              name="matNum"
              id="matNum"
              type="text"
              placeholder="M.21/ND/CSIT/14769"
            />
          </div>

          <MyTextInput
            label="Email Address"
            name="email"
            id="email"
            type="email"
            placeholder="tonystark@gmail.com"
          />

          <MyPasswordInput
            label="Enter Password"
            name="password"
            id="password"
            placeholder="*********"
          />

          <MyPasswordInput
            label="Confirm Password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="*********"
          />

          <button
            className="w-full rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-bold text-white focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating Your Account..." : "SignUp"}
          </button>
          <p className="text-center">
            Already have an account?{" "}
            <Link
              className="ms-2 cursor-pointer text-primary hover:underline"
              href="/login"
            >
              Login
            </Link>
          </p>
        </Form>
      </Formik>
    </section>
  );
};

export default Signup;
