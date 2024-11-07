"use client";
import { useShoppingCart } from "@/app/Context/ShoppingCartContext";
import data from "/data.json";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ChatModal from "@/components/ChatModal";
import ImageSwiper from "@/components/ImageSwiper";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Bookmark } from 'lucide-react';
import Image from 'next/image';

const ProductDetails = () => {
  const searchParams = useSearchParams();
  const [openModal, setOpenModal] = useState(false);
  const productId = searchParams.get("id");
  const { increaseCartQty } = useShoppingCart();

  let product = data.find((product) => product.id == productId);

  return (
    <>
      <Header />

      <section className="my-8 px-5 lg:px-20">
        <div className="flex items-start gap-8">
          <ImageSwiper images={product?.images} />

          <div className="flex w-[40%] flex-col gap-8 pt-16">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">{product?.title}</h2>

              <p className="text-xl">
                NGN {Intl.NumberFormat().format(product?.price)}
              </p>
            </div>

            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-lg bg-primary p-4 font-semibold text-white"
              onClick={() => increaseCartQty(product?.id)}
            >
              Add to WishList <Bookmark />
            </button>

            <div className="space-y-3">
              <h2 className="text-xl font-semibold">Product Description</h2>
              <p>{product?.description}</p>
            </div>

            <div className="flex items-stretch justify-between">
              <div className="flex items-center gap-3">
                <Image
                  className="cursor-pointer rounded-full"
                  src="/user-dummy.png"
                  alt="user photo"
                  width={60}
                  height={60}
                />
                {/* <div className="size-14 rounded-full bg-red-500"></div> */}
                <div>
                  <h3 className="text-xl font-semibold">Akpor Raphael</h3>
                  <p>4.7 / 5.0 rating </p>
                </div>
              </div>

              <button
                onClick={() => setOpenModal(true)}
                className="rounded-lg bg-primary px-4 py-2 text-center font-bold text-white"
              >
                Contact Seller
              </button>
            </div>

            <div className="rounded-md bg-[#EBF2F7] px-6 py-4">
              <h2 className="mb-2 text-2xl font-medium">Safety tips</h2>

              <ul className="list-inside list-disc">
                <li>Avoid paying in advance, even for delivery</li>
                <li>Meet with the seller at a safe public place </li>
                <li>
                  Inspect the item and ensure it&apos;s exactly what you want
                </li>
                <li>
                  Make sure that the packed item is the one you&apos;ve
                  inspected
                </li>
                <li>Only pay if you&apos;re satisfied</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ChatModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        productPrice={product?.price}
        productName={product?.title}
      />

      <Footer />
    </>
  );
};

export default ProductDetails;
