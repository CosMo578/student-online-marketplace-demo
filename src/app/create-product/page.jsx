"use client";
import { useState } from "react";
import { Download } from "lucide-react";
import { db, storage } from "@/app/config/firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

const UploadProducts = () => {
  const [file, setFile] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newDescription, setNewDescription] = useState("");
  //   const [product, setProduct] = useState([]);

  //   const getProduct = async () => {
  //     try {
  //       const productCollectionRef = collection(db, "products");
  //       const data = await getDocs(productCollectionRef);
  //       const filData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  //       setProduct(filData);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   getProduct();

//   const uploadFile = async () => {
//     const metadata = {
//       contentType: "image/jpeg",
//     };

//     const imageURLList = [];
//     for (let i = 0; i < file?.length; i++) {
//       const image = file[i];
//       const storageRef = ref(storage, `images/${image?.name}`);
//       await uploadBytes(storageRef, image);
//       const url = await getDownloadURL(storageRef);
//       imageURLList.push(url);
//     }

//     const productCollectionRef = collection(db, "product");

//     await addDoc(productCollectionRef, {
//       Title: newTitle,
//       Price: Number(newPrice),
//       Category: newCategory,
//       photoURL: imageURLList,
//       Description: newDescription,
//       Date: new Date(),
//     });
//   };

  const uploadProduct = async () => {
    try {
      const sellerId = auth.currentUser.uid;

      const imageURLList = [];
      for (let i = 0; i < file?.length; i++) {
        const image = file[i];
        const storageRef = ref(storage, `images/${image?.name}`);
        await uploadBytes(storageRef, image);
        const url = await getDownloadURL(storageRef);
        imageURLList.push(url);
      }

      const productWithSellerId = {
        sellerId,
        title: newTitle,
        price: Number(newPrice),
        category: newCategory,
        images: imageURLList,
        description: newDescription,
        createdAt: new Date(),
      };

      const productCollection = collection(db, "products");
      await addDoc(productCollection, productWithSellerId);

      alert("Product Uploaded Successfully");
    } catch (error) {
      alert("Error uploading product: ", error);
    }
  };

  return (
    <>
      <section className="flex">
        <div className="mx-auto my-auto gap-5 pt-20 text-[1rem]">
          <div className="grid gap-3">
            <label className="font-semibold">
              Product Name <span className="text-Pink">*</span>
            </label>
            <input
              className="border-Grey h-14 w-[320px] rounded border pl-3 font-semibold outline-none lg:w-[500px]"
              placeholder="Product Name"
              type="text"
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>
          <div className="grid gap-3">
            <label className="pt-5 font-semibold">
              Product Price <span className="text-Pink">*</span>
            </label>
            <input
              className="border-Grey h-14 w-[320px] rounded border pl-3 font-semibold outline-none lg:w-[500px]"
              placeholder="Product Price"
              type="text"
              onChange={(e) => setNewPrice(e.target.value)}
            />
          </div>
          <div className="grid gap-3">
            <label className="pt-5 font-semibold">
              Product Category <span className="text-Pink">*</span>
            </label>
            <input
              className="border-Grey h-14 w-[320px] rounded border pl-3 font-semibold outline-none lg:w-[500px]"
              placeholder="Product Category"
              type="text"
              onChange={(e) => setNewCategory(e.target.value)}
            />
          </div>
          <div className="grid gap-3">
            <label className="pt-5 font-semibold">
              Product Description <span className="text-Pink">*</span>
            </label>
            <textarea
              className="border-Grey h-[15rem] w-[320px] rounded border pl-3 pt-5 font-semibold outline-none lg:w-[500px]"
              placeholder="Product Description"
              type="text"
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </div>
          
          <div className="grid gap-3 pt-5">
            <input
              onChange={(e) => {
                const newFiles = [];
                for (let i = 0; i < e.target.files.length; i++) {
                  newFiles.push(e.target.files[i]);
                }
                setFile(newFiles);
              }}
              className="hidden"
              type="file"
              multiple
              name=""
              id="file"
            />
            <label
              className="mb-5 flex cursor-pointer items-center gap-3 font-semibold"
              htmlFor="file"
            >
              <Download />
              <p>Add your Avatar</p>
            </label>
          </div>

          <div className="mx-auto flex w-[60%] items-center justify-center">
            <label
              htmlFor="dropzone-file"
              className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                <svg
                  className="text-primary-200 mb-4 size-12"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>

                <p className="mb-2 text-base text-gray-500">
                  <span className="text-primary-100 font-semibold">
                    Click to upload photos
                  </span>{" "}
                  or drag and drop
                </p>
                <p className="text-sm text-gray-500">PDF (MAX. 10MB)</p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                multiple
                onChange={(e) => {
                const newFiles = [];
                for (let i = 0; i < e.target.files.length; i++) {
                  newFiles.push(e.target.files[i]);
                }
                setFile(newFiles);
              }}
              />
            </label>
          </div>

          <button
            className="h-14 w-[320px] rounded bg-primary text-[1rem] font-semibold text-white lg:w-[500px]"
            onClick={uploadProduct}
          >
            Upload File
          </button>
        </div>
      </section>
    </>
  );
};

export default UploadProducts;
