import Image from "next/image";
import data from "/data.json";
import { useShoppingCart } from "@/app/Context/ShoppingCartContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import { XIcon } from "lucide-react";

export function CartItem({ id }) {
  const { removeSavedItem } = useShoppingCart();

  let item = data?.find((product) => product.id == id);
  if (item == null) return null;

  return (
    <>
      <div className="relative">
        <Link
          href={`/products/${item?.title.replace(/\s+/g, "-").toLowerCase()}?id=${item?.id}`}
        >
          <div className="cursor-pointer overflow-hidden rounded-lg bg-gray-200">
            <div className="flex items-center gap-4">
              <Image
                className="h-full max-md:w-[40%]"
                src={item?.images[0]}
                alt="item image"
                width={170}
                height={95}
              />

              <div className="p-2">
                <h2 className="font-semibold lg:text-xl">{item.title}</h2>
                <p className="mt-2 lg:text-xl">
                  ₦ {Intl.NumberFormat().format(item?.price)}
                </p>
              </div>
            </div>
          </div>
        </Link>
        <button
          className="absolute right-0 top-0 z-10 hidden size-10 items-center justify-center rounded-md bg-red-500 text-white lg:flex"
          onClick={() => removeSavedItem(item?.id)}
        >
          <XIcon />
        </button>
      </div>

      <button
        className="lg:hidden rounded-md bg-red-500 text-white py-2"
        onClick={() => removeSavedItem(item?.id)}
      >
        Remove
      </button>
    </>
  );
}
