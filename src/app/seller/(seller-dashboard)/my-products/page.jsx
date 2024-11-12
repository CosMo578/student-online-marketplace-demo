"use client";
import { db } from "@/app/config/firebase";
import { AuthContext } from "@/app/Context/AuthContext";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from "react";

const MyProducts = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser?.uid;

  useEffect(() => {
    const getAllSellerProducts = async () => {
      if (!userId) {
        return;
      }

      try {
        const productRef = collection(db, "products");

        // Query products created by the specified user ID
        const q = await query(productRef, where("sellerId", "==", userId));
        const querySnapshot = await getDocs(q);

        const userProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(userProducts);
      } catch (error) {
        alert(error.message);
      }
    };
    getAllSellerProducts();
  }, [userId]);

  const deleteProduct = async (docId) => {
    const docRef = doc(db, "products", docId);
    try {
      await deleteDoc(docRef);
      window.location.reload();
      console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  return (
    <section className="px-6 py-4 lg:p-10">
      <div className="mt-8">
        <h2 className="mb-4 text-xl font-semibold lg:text-3xl">Products</h2>

        <div className="grid gap-5 pt-4 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => {
            return (
              <div
                key={product.id}
                className="overflow-hidden rounded-lg bg-gray-200 shadow-lg"
              >
                <Image
                  className="h-[250px] w-full object-cover"
                  src={product?.images[0]}
                  alt="product image"
                  width="350"
                  height="350"
                />

                <div className="flex flex-col p-4 pt-5">
                  <h2>{product.name}</h2>
                  <p className="py-3 text-xl font-semibold">
                    ₦ {Intl.NumberFormat().format(product?.price)}
                  </p>
                  <button
                    className="w-full rounded-md bg-red-500 py-3 text-white"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Delete Product
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default MyProducts;
