import Image from "next/image";
import { useShoppingCart } from "@/app/Context/ShoppingCartContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import { XIcon } from "lucide-react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/config/firebase";

export function CartItem({ id }) {
  const { removeSavedItem } = useShoppingCart();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProductData = async () => {
      const productRef = doc(db, "products", id);
      const productDetails = await getDoc(productRef);
      setProduct(productDetails?.data());
    };

    getProductData();
  }, [id]);

  return (
    <>
      <div className="relative">
        <Link
          href={`/products/${product?.name.replace(/\s+/g, "-").toLowerCase()}?id=${id}`}
        >
          <div className="cursor-pointer overflow-hidden rounded-lg bg-gray-200">
            <div className="flex items-center gap-4">
              <Image
                className="h-full max-md:w-[40%]"
                src={product?.images?.[0]}
                alt="item image"
                width={170}
                height={95}
              />

              <div className="p-2">
                <h2 className="font-semibold lg:text-xl">{product?.name}</h2>
                <p className="mt-2 lg:text-xl">
                  ₦ {Intl.NumberFormat().format(product?.price)}
                </p>
              </div>
            </div>
          </div>
        </Link>
        <button
          className="absolute right-0 top-0 z-10 hidden size-10 items-center justify-center rounded-md bg-red-500 text-white lg:flex"
          onClick={() => removeSavedItem(id)}
        >
          <XIcon />
        </button>
      </div>

      <button
        className="rounded-md bg-red-500 py-2 text-white lg:hidden"
        onClick={() => removeSavedItem(id)}
      >
        Remove
      </button>
    </>
  );
}
