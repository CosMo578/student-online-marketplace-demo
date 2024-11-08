"use client";
import Link from "next/link";
import Image from "next/image";
import data from "/data.json";
import { db } from "@/app/config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { useShoppingCart } from "@/app/Context/ShoppingCartContext";
import { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";

function ProductsListing({ filteredProducts }) {
  const products = data;
  const [prod, setProd] = useState([]);
  // const [sortedProducts, setSortedProducts] = useState([]);
  const { addSavedItem } = useShoppingCart();

  // useEffect(() => {
  //   const filteredItems = products.filter((item) => {
  //     return searchParams.toLowerCase() === ""
  //       ? "Not Found"
  //       : item.title.toLowerCase().includes(searchParams.toLowerCase().trim());
  //   });
  //   setSortedProducts(filteredItems);
  // }, [searchParams, products]);

  const getProd = async () => {
    const ref = collection(db, "products");
    const data = await getDocs(ref);
    const fildata = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setProd(fildata);
  };
  getProd();

  return (
    <div className="grid gap-5 px-5 pt-10 md:grid-cols-2 lg:grid-cols-4 lg:px-20">
      {filteredProducts?.map((product, index) => {
        return (
          <div
            key={product?.id}
            className="overflow-hidden rounded-lg bg-gray-200 shadow"
          >
            <Link
              href={`/products/${product?.title.replace(/\s+/g, "-").toLowerCase()}?id=${product?.id}`}
            >
              <Image
                className="w-full object-cover"
                src={product?.images[0]}
                alt="product image"
                width="640"
                height="640"
              />
            </Link>

            <div className="flex flex-col p-4 pt-5">
              <h2>{product?.title}</h2>
              <p className="py-3 text-xl font-semibold">
                ₦ {Intl.NumberFormat().format(product?.price)}
              </p>

              <button
                onClick={() => addSavedItem(product.id)}
                className="flex items-center justify-center gap-2 rounded-lg bg-primary p-4 font-semibold text-white"
              >
                Add to WishList <Bookmark />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductsListing;
