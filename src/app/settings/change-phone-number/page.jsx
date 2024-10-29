"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { db } from "@/app/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/config/firebase";
import { createContext, useEffect } from 'react'
import { collection, getDocs, doc, updateDoc, where, query } from "firebase/firestore";

import MyTextInput from "@/components/MyTextInput";
import Link from "next/link";

const ChangeNumber = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [users, setUsers] = useState("")




  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const currentUserUid = user.uid;
    
        // Filter based on UID (or email, if preferred)
        const q = query(collection(db, "User_Detail"), where("Userid", "==", currentUserUid));
        getDocs(q)
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              // Process the retrieved data
              const userData = ({id:doc.id, ...doc.data()});
              setUsers(userData);
              console.log(userData.email);
            });
          })
          .catch((error) => {
            console.error("Error getting documents: ", error);
          });
      } else {
        // User is not signed in
        console.log("User is not signed in");
      }
    });

},[])

const handleSubmit = async(values, actions) => {
    setIsSubmitting((prev) => !prev);
    const dbref = collection(db, "User_Detail")
    const updateRef = doc(dbref, users.id)
    const result = await updateDoc(updateRef, {
      Phone: values.phoneNumber,
    })
    setIsSubmitting((prev) => !prev);
  };
  return (
    <>
      <Formik
        initialValues={{
          phoneNumber: "",
        }}
        validationSchema={Yup.object({
          phoneNumber: Yup.string()
            .required("Required")
            .length(11, "Must be 11 characters")
            .matches(/^\d+$/, "Must be a number"), // Ensures the string contains only digits
        })}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col gap-5 p-6">
          <MyTextInput label="Phone Number" name="phoneNumber" type="tel" />

          <button
            className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-semibold text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Changing Phone Number..." : "Change Phone Number"}
          </button>
        </Form>
      </Formik>
    </>
  );
};
export default ChangeNumber;
