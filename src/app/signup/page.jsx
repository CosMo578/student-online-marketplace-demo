"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import MyCheckbox from "@/components/MyCheckbox";
import MyTextInput from "@/components/MyTextInput";
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
import Image from "next/image";

const Signup = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const provider = new GoogleAuthProvider();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptedTerms: false,
  };

  const schemaObject = Yup.object({
    firstName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    lastName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
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
    acceptedTerms: Yup.boolean()
      .required("Required")
      .oneOf([true], "You must accept the terms and conditions."),
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
    const res = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password,
    );
    console.log(values.firstName);
    console.log(values);
    // Add a second document with a generated ID.

    await addDoc(collection(db, "User_Detail"), {
      Userid: res.user.uid,
      First_Name: values.firstName,
      Last_Name: values.lastName,
      Email: values.email,
    });
    setIsSubmitting((prev) => !prev);
  };

  return (
    <section className="grid min-h-screen w-[100vw] py-10 lg:place-items-center">
      <Formik
        initialValues={initialValues}
        validationSchema={schemaObject}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col gap-5 p-6 lg:mx-auto lg:w-[50%]">
          <button
            type="button"
            onClick={SignUpWithPopUp}
            className="flex w-full items-center justify-center rounded-lg border-2 px-6 py-3"
          >
            Sign Up with Google
            <span className="m-0 ms-4 text-3xl leading-none">
              <Image
                src="/svg/google.svg"
                alt="google icon"
                width={30}
                height={30}
              />
            </span>
          </button>
          <div className="grid gap-6 md:grid-cols-2">
            <MyTextInput
              label="First Name"
              name="firstName"
              id="firstName"
              type="text"
              placeholder="Tate"
              focus
            />

            <MyTextInput
              label="Last Name"
              name="lastName"
              id="lastName"
              type="text"
              placeholder="McRae"
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

          <MyCheckbox name="acceptedTerms">
            I accept the terms and conditions
          </MyCheckbox>

          <button
            className="w-full rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-bold text-white focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
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
