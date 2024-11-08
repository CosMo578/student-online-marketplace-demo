"use client";
import { LucideArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

const Seller = () => {
  const params = useParams();
  const postId = params.sellerId;
  console.log(postId);

  return (
    <section className="px-20 py-10">
      <Link
        className="mb-4 flex w-fit items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white"
        href="/products"
      >
        <LucideArrowLeft />
        Back
      </Link>

      <div className="mt-10 flex items-center gap-6">
        <div className="size-36 rounded-full bg-gray-300"></div>
        <div className="space-y-1.5">
          <h2 className="text-xl font-semibold lg:text-3xl">{postId}</h2>
          <p>4.7 / 5.0 rating</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-xl font-semibold lg:text-3xl">Products</h2>

        <div className="grid gap-5 pt-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="overflow-hidden rounded-lg bg-gray-200 shadow">
            {/* <Image
              className="w-full object-cover"
              src={product?.images[0]}
              alt="product image"
              width="640"
              height="640"
            /> */}

            <div className="flex flex-col p-4 pt-5">
              <h2>Product 1</h2>
              <p className="py-3 text-xl font-semibold">
                {/* ₦ {Intl.NumberFormat().format(product?.price)} */}₦ 4,800
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg bg-gray-200 shadow">
            {/* <Image
              className="w-full object-cover"
              src={product?.images[0]}
              alt="product image"
              width="640"
              height="640"
            /> */}

            <div className="flex flex-col p-4 pt-5">
              <h2>Product 1</h2>
              <p className="py-3 text-xl font-semibold">
                {/* ₦ {Intl.NumberFormat().format(product?.price)} */}₦ 4,800
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg bg-gray-200 shadow">
            {/* <Image
              className="w-full object-cover"
              src={product?.images[0]}
              alt="product image"
              width="640"
              height="640"
            /> */}

            <div className="flex flex-col p-4 pt-5">
              <h2>Product 1</h2>
              <p className="py-3 text-xl font-semibold">
                {/* ₦ {Intl.NumberFormat().format(product?.price)} */}₦ 4,800
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg bg-gray-200 shadow">
            {/* <Image
              className="w-full object-cover"
              src={product?.images[0]}
              alt="product image"
              width="640"
              height="640"
            /> */}

            <div className="flex flex-col p-4 pt-5">
              <h2>Product 1</h2>
              <p className="py-3 text-xl font-semibold">
                {/* ₦ {Intl.NumberFormat().format(product?.price)} */}₦ 4,800
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Seller;
