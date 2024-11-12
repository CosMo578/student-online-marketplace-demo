"use client";
import { useContext, useState } from "react";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { db, storage } from "@/app/config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { AuthContext } from "@/app/Context/AuthContext";
import { X } from "lucide-react";

const UploadProducts = () => {
  const [files, setFiles] = useState([]);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const imageFiles = selectedFiles.filter((file) =>
      file.type.startsWith("image/"),
    );

    if (imageFiles.length !== selectedFiles.length) {
      alert("Only image files are allowed.");
    } else {
      setFiles(imageFiles);
    }
  };

  const handleProductCreation = async (e) => {
    e.preventDefault();
    if (files.length < 1) {
      alert("You must upload an image for this product");
      return;
    }

    if (category == "") {
      alert("select a category");
      return;
    }

    try {
      setUploading(true);

      const imageUrls = await Promise.all(
        files.map(async (file) => {
          const fileRef = ref(storage, `products/${file.name}`);
          await uploadBytes(fileRef, file);
          return getDownloadURL(fileRef);
        }),
      );

      const userDocRef = doc(db, "users", currentUser.uid);
      const userDocSnap = await getDoc(userDocRef);
      const userData = userDocSnap.data();
      const userName = userData?.userName;

      // Add product data to Firestore
      await addDoc(collection(db, "products"), {
        sellerId: currentUser.uid,
        userName: userName,
        name: productName,
        price: productPrice,
        category: category,
        description: description,
        images: imageUrls,
        createdAt: new Date(),
      });

      setUploading(false);
      alert("Product uploaded successfully!");
    } catch (error) {
      console.error("Error uploading product:", error);
      alert("Failed to upload product. Please try again.");
    } finally {
      setProductName("");
      setProductPrice("");
      setCategory("");
      setDescription("");
      setFiles([]);
      setUploading(false);
    }
  };

  return (
    <section>
      <form
        onSubmit={handleProductCreation}
        className="mx-auto flex flex-col items-center space-y-4 px-4 pb-8 pt-20 lg:max-w-[60%]"
      >
        <div className="w-full">
          <label
            htmlFor="dropzone-file"
            className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <svg
                className="mb-4 size-12 text-primary"
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
                  Click to upload
                </span>{" "}
                or drag and drop
              </p>
              <p className="text-sm text-gray-500">image (MAX. 10MB)</p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              multiple
              required
            />
          </label>
        </div>

        <div className="flex flex-wrap gap-4 py-4">
          {files.map((file, index) => {
            return (
              <div
                className="me-3 flex items-center rounded-md bg-gray-200 p-3"
                key={index}
              >
                <p>{file.name}</p>
                <button
                  className="ms-4 rounded-md bg-red-500 p-2 text-white"
                  onClick={() =>
                    setFiles(files.filter((f) => f.name !== file.name))
                  }
                >
                  <X />
                </button>
              </div>
            );
          })}
        </div>

        <div className="flex max-w-full cursor-pointer items-stretch gap-2 [&_input]:w-1/2 [&_input]:rounded-md">
          <input
            type="text"
            placeholder="Product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Product price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
          />
        </div>

        <select
          className="w-full cursor-pointer rounded-md"
          name="category"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="" disabled hidden selected>
            Select a category
          </option>
          <option value="courseMaterials">Course Materials</option>
          <option value="clothes">Clothes</option>
          <option value="electronics">Electronics</option>
          <option value="kitchenUtensils">Kitchen Utensils</option>
          <option value="furniture">Furniture</option>
          <option value="shoes">Shoes</option>
          <option value="miscellaneous">Miscellaneous</option>
        </select>

        <textarea
          rows={5}
          className="w-full resize-none rounded-md"
          name="description"
          id="description"
          placeholder="Product description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <button
          type="submit"
          className="w-full cursor-pointer rounded-md bg-primary py-3 font-semibold text-white"
        >
          {uploading ? "Uploading products to DB..." : "Upload Product"}
        </button>
      </form>
    </section>
  );
};

export default UploadProducts;
