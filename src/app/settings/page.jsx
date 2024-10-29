"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { db } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { useContext, useEffect } from 'react'
import { AuthContext } from "../Context/AuthContext";
import { collection, getDocs, doc, updateDoc, where, query } from "firebase/firestore";

import MyTextInput from "@/components/MyTextInput";

const Settings = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [users, setUsers] = useState("")
  const [file, setFile] = useState("")


  const schemaObject = Yup.object({
    firstName: Yup.string().max(15, "Must be 15 characters or less"),
    // .required("Required"),
    lastName: Yup.string().max(20, "Must be 20 characters or less"),
    // .required("Required"),
    userName: Yup.string().min(4, "Must be 4 characters or more"),
    // .required("Required"),
    dob: Yup.date(),
    location: Yup.string().min(25, "Must be 25 characters or more"),
  });



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

  const {currentUser} = useContext(AuthContext)

  const handleSubmit = async(values, actions) => {
    setIsSubmitting((prev) => !prev);

    const metadata = {
      contentType: 'image/jpeg'
    };
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    uploadTask.on(
        (error) => {
            console.log(error)
        }, 
        () => {
        const productCollectionRef = collection(db, "Users") 
        getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
          const dbref = collection(db, "User_Detail")
          const updateRef = doc(dbref, users.id)
          const result = await updateDoc(updateRef, {
            First_Name: values.firstName,
            Last_Name: values.lastName,
            Username: values.userName,
            Location: values.location,
            UserPics: downloadURL,
            uid: currentUser.uid
          })
        });
    })
  };
  return (
    <>
      <input
        onChange={(e) => {setFile(e.target.files[0])}}
        className="mr-10"
        type="file"
        name="profile-photo"
        id="profile-photo"
      />

      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          userName: "",
          dob: {
            day: "",
            month: "",
            year: "",
          },
          location: "",
        }}
        validationSchema={schemaObject}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col gap-5 p-6">
          <MyTextInput
            label="First Name"
            name="firstName"
            type="text"
            placeholder={users.First_Name}
          />
          <MyTextInput
            label="Last Name"
            name="lastName"
            type="text"
            placeholder={users.Last_Name}
          />
          <MyTextInput
            label="Username"
            name="userName"
            type="text"
            placeholder={users.Username}
          />
          <MyTextInput
            label="Date of Birth"
            name="dob"
            type="date"
            placeholder={users.DOB}
          />
          <MyTextInput
            label="Location"
            name="location"
            type="text"
            placeholder={users.Location}
          />

          <button
            className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-semibold text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating Profile..." : "Update Profile"}
          </button>
        </Form>
      </Formik>
    </>
  );
};
export default Settings;
