"use client";

import * as Yup from "yup";
import { useState } from "react";
import { Formik, Form } from "formik";
import MyTextInput from "@/components/MyTextInput";
import { Navigate } from "react-router-dom";
import { AuthContext } from "@/app/Context/AuthContext";
import { useContext } from "react";
import { db } from "@/app/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/config/firebase";
import { createContext, useEffect } from 'react'
import { collection, getDocs, doc, updateDoc, where, query } from "firebase/firestore";



const DeliveryDetails = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedState, setSelectedState] = useState("");
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
      addressLine1: values.addressLine1,
      addressLine2: values.addressLine2,
      city: values.city,
      state: values.state,
    })
    //! Delete Timeout fn then handle POST Operation Here
    setIsSubmitting((prev) => !prev);
    
  };
  const { currentUser } = useContext(AuthContext);
  // eslint-disable-next-line react/prop-types
  const ProtectedRoute = ({ children }) =>{
    if(!currentUser){
      return <Navigate to="/Login"/>
    }
    
    return children
  };

  return (
    <>
    <ProtectedRoute>

      <Formik
        initialValues={{
          addressLine1: "",
          addressLine2: "",
          city: "",
          state: "",
        }}
        validationSchema={Yup.object({
          addressLine1: Yup.string()
          .min(10, "Must be 10 characters or more")
            .required("Required"),
            addressLine2: Yup.string()
            .min(10, "Must be 10 characters or more")
            .optional(),
            city: Yup.string()
            .min(4, "Must be 4 characters or more")
            .required("Required"),
            state: Yup.string()
            .min(4, "Must be 4 characters or more")
            .required("Required"),
          })}
          onSubmit={handleSubmit}
          >
        <Form className="flex flex-col gap-5 p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <MyTextInput
              label="Address Line 1"
              name="addressLine1"
              type="text"
              placeholder={users.addressLine1}
            />
            <MyTextInput
              label="Address Line 2 (Optional)"
              name="addressLine2"
              type="text"
              placeholder={users.addressLine2}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <MyTextInput
              label="City"
              name="city"
              type="text"
              placeholder={users.city}
              />
            <MyTextInput
              label="State"
              name="state"
              type="text"
              placeholder={users.state}
              />
          </div>

          <button
            className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-semibold text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Updating Delivery Details..."
              : "Update Delivery Details"}
          </button>
        </Form>
      </Formik>
              </ProtectedRoute>
    </>
  );
};
export default DeliveryDetails;
