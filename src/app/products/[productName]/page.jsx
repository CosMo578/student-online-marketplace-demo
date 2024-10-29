"use client";
import { useShoppingCart } from "@/app/Context/ShoppingCartContext";
import data from "/data.json";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ImageSwiper from "@/components/ImageSwiper";
import { useSearchParams } from "next/navigation";

const ProductDetails = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");
  const { increaseCartQty } = useShoppingCart();

  let product = data.find((product) => product.id == productId);

  return (
    <>
      <Header />

      <section className="my-8 px-5 lg:px-20">
        <div className="flex items-start gap-8">
          <ImageSwiper images={product?.images} />

          <div className="flex w-[40%] flex-col gap-2 pt-16">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">{product?.title}</h2>

              <p className="text-xl">
                NGN {Intl.NumberFormat().format(product?.price)}
              </p>
            </div>

            <button
              type="button"
              className="rounded-lg bg-primary px-4 py-2 text-center font-bold text-white"
              onClick={() => increaseCartQty(product?.id)}
            >
              Add to Cart
            </button>

            <button
              type="button"
              className="rounded-lg border-2 border-primary bg-transparent px-4 py-2 text-center font-bold text-primary"
            >
              Add to wishlist
            </button>
          </div>
        </div>

        <div className="mt-6 w-1/2">
          <h2 className="text-xl font-semibold">Product Description</h2>
          <p>{product?.description}</p>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ProductDetails;
