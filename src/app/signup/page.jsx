"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import MyTextInput from "@/components/MyTextInput";
import MyRadioInput from "@/components/MyRadioInput";
import MyPasswordInput from "@/components/MyPasswordInput";
import Link from "next/link";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, db } from "../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/navigation";
// import Image from "next/image";

const Signup = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const provider = new GoogleAuthProvider();

  const initialValues = {
    accountType: "",
    userName: "",
    matNum: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const schemaObject = Yup.object({
    accountType: Yup.string().required("Required"),
    userName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    matNum: Yup.string()
      .matches(
        /^M\.\d{2}\/(ND|HND)\/[A-Z]+\/\d{5}$/,
        "Invalid matriculation number format",
      )
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

  const SignUpWithPopUp = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        router.push("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  const handleSubmit = async (values, actions) => {
    setIsSubmitting((prev) => !prev);
    try {
      console.log(values);

      const res = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password,
      );

      await addDoc(collection(db, "Users"), {
        userId: res.user.uid,
        userName: values.userName,
        matNum: values.matNum,
        email: values.email,
        accountType: values.accountType,
      });

      console.log("Sign up successful");
      router.push("/login");
    } catch (error) {
      console.error("Error adding user to Firestore:", error);
      alert("Signup failed. Please try again.");
      
    } finally {
      setIsSubmitting((prev) => !prev);
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
            placeholder="tatemcrae88@gmail.com"
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
