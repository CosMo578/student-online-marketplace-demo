"use client";
import { db } from "@/app/config/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { LucideArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { Router } from "next/router";
import { useEffect, useState } from "react";

const Seller = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const userId = searchParams.get("id");
  const postId = params.sellerId;

  useEffect(() => {
    const getAllSellerProducts = async () => {
      try {
        const productRef = collection(db, "products");

        // Query products created by the specified user ID
        const q = query(productRef, where("sellerId", "==", userId));
        const querySnapshot = await getDocs(q);

        const userProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log(userId);
        console.log(userProducts);
        setProducts(userProducts);
      } catch (error) {
        alert(error.message);
      }
    };
    getAllSellerProducts();
  }, []);

  return (
    <section className="px-6 py-4 lg:px-20 lg:py-10">
      <button
        className="mb-4 flex w-fit items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white"
        onClick={() => Router.back()}
      >
        <LucideArrowLeft />
        Back
      </button>

      <div className="mt-10 flex items-center gap-6">
        <Image
          className="rounded-full"
          src="/user-dummy.png"
          alt="product image"
          width="150"
          height="150"
        />
        <div className="space-y-1.5">
          <h2 className="text-xl font-semibold lg:text-3xl">{postId}</h2>
          <p>4.7 / 5.0 rating</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-xl font-semibold lg:text-3xl">Products</h2>

        <div className="grid gap-5 pt-4 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => {
            return (
              <div
                key={product.id}
                className="overflow-hidden rounded-lg bg-gray-200 shadow"
              >
                <Image
                  className="w-full object-cover"
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
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default Seller;
