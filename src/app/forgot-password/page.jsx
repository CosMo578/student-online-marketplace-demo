"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useState } from "react";

import MyTextInput from "@/components/MyTextInput";
import Link from "next/link";

const ForgotPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (values, actions) => {
    setIsSubmitting((prev) => !prev);

    //! Delete Timeout fn then handle POST Operation Here
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      actions.setSubmitting(false);
      //! Reset submit status after POST operation is completed
      setIsSubmitting((prev) => !prev);
    }, 400);
  };

  return (
    <>
      <section className="grid h-screen w-[100vw] items-center lg:place-items-center">
        <Link
          className="absolute left-[10%] top-[10%] w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-semibold text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
          href="/login"
        >
          Back
        </Link>
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
          })}
          onSubmit={handleSubmit}
        >
          <Form className="flex flex-col gap-5 p-6 lg:mx-auto lg:w-[60%]">
            <h1 className="mb-6 text-center text-2xl">
              We&apos;ll send you a link to reset your password
            </h1>
            <MyTextInput
              label="Email Address"
              name="email"
              type="email"
              placeholder="tatemcrae88@gmail.com"
            />

            <button
              className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-semibold text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </Form>
        </Formik>
      </section>
    </>
  );
};

export default ForgotPassword;
