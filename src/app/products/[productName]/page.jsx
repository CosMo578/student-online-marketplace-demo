"use client";
import { useShoppingCart } from "@/app/Context/ShoppingCartContext";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ImageSwiper from "@/components/ImageSwiper";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Bookmark, LucideArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/app/config/firebase";
import { AuthContext } from "@/app/Context/AuthContext";

const ProductDetails = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");
  const { addSavedItem } = useShoppingCart();
  const [product, setProduct] = useState();
  const [businessLink, setBusinessLink] = useState("");

  useEffect(() => {
    const getProductData = async () => {
      const productRef = doc(db, "products", productId);
      const productDetails = await getDoc(productRef);

      const userId = auth?.currentUser?.uid;
      const userDocRef = doc(db, "users", userId);
      const userDocSnap = await getDoc(userDocRef);
      const userData = userDocSnap.data();
      setBusinessLink(userData.businessLink);
      console.log(userData);

      setProduct(productDetails?.data());
    };
    getProductData();
  }, []);

  return (
    <>
      <Header />

      <section className="my-8 px-5 lg:px-20">
        <div className="flex flex-col items-start gap-8 lg:flex-row">
          <div className="w-full lg:w-[60%]">
            <Link
              className="mb-4 flex w-fit items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white"
              href="/products"
            >
              <LucideArrowLeft />
              Back
            </Link>

            <ImageSwiper images={product?.images} />

            <section className="mt-6 hidden space-y-2 lg:block">
              <h2 className="font-semibold lg:text-2xl">Ratings</h2>

              <div>
                {/* !TODO */}
                {/* Fetch ratings from database */}
                <p>There are no ratings for this product yet </p>
              </div>
            </section>

            <div className="mt-4 hidden items-center lg:flex lg:gap-4">
              <h2>Purchased this product yet?</h2>
              <p className="w-fit rounded-lg bg-primary px-4 py-2 text-white">
                Leave a rating
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-8 pt-16 lg:w-[40%]">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold lg:text-2xl lg:font-bold">
                {product?.name}
              </h2>

              <p className="text-xl">
                NGN {Intl.NumberFormat().format(product?.price)}
              </p>
            </div>

            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-lg bg-primary p-4 font-semibold text-white"
              onClick={() => addSavedItem(productId)}
            >
              Add to WishList <Bookmark />
            </button>

            <div className="space-y-3">
              <h2 className="text-xl font-semibold">Product Description</h2>
              <p>{product?.description}</p>
            </div>

            <div className="flex flex-col items-center justify-between gap-3 lg:items-stretch">
              <Link
                href={`/seller/${product?.userName}?id=${product?.sellerId}`}
                className="flex flex-col items-center gap-3 lg:flex-row"
              >
                <Image
                  className="cursor-pointer rounded-full"
                  src="/user-dummy.png"
                  alt="user photo"
                  width={70}
                  height={70}
                />
                {/* <div className="size-14 rounded-full bg-red-500"></div> */}
                <div>
                  <h3 className="text-xl font-semibold">{product?.userName}</h3>
                  <p>4.5 / 5.0 rating </p>
                </div>
              </Link>

              <Link
                href={businessLink}
                target="_blank"
                // onClick={() => setOpenModal(true)}
                className="rounded-lg bg-primary px-4 py-2 text-center font-bold text-white"
              >
                Contact Seller
              </Link>
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

            <section className="mt-6 space-y-2 lg:hidden">
              <h2 className="font-semibold lg:text-2xl">Ratings</h2>

              <div>
                {/* !TODO */}
                {/* Fetch ratings from database */}
                <p>There are no ratings for this product yet </p>
              </div>
            </section>

            <div className="mt-4 items-center gap-2 lg:hidden lg:gap-4">
              <h2>Purchased this product yet?</h2>
              <button className="w-fit rounded-lg bg-primary px-4 py-2 text-white">
                Leave a rating
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ProductDetails;
