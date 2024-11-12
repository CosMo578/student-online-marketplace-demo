"use client";
import { useShoppingCart } from "@/app/Context/ShoppingCartContext";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ImageSwiper from "@/components/ImageSwiper";
import { useParams, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Bookmark, LucideArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/app/config/firebase";
import { AuthContext } from "@/app/Context/AuthContext";

const ProductDetails = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");
  const { addSavedItem } = useShoppingCart();
  const [product, setProduct] = useState();
  const [businessLink, setBusinessLink] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [rateProduct, setRateProduct] = useState(false);
  const [productRatings, setProductRatings] = useState(false);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const getProductData = async () => {
      const productRef = doc(db, "products", productId);
      const productDetails = await getDoc(productRef);

      const userId = productDetails?.data().sellerId;
      const userDocRef = doc(db, "users", userId);
      const userDocSnap = await getDoc(userDocRef);
      const userData = userDocSnap.data();

      setBusinessLink(userData.businessLink);
      setProduct(productDetails?.data());
    };

    const fetchRatings = async () => {
      const ratingsQuery = query(
        collection(db, "ratings"),
        where("productId", "==", productId),
      );
      const ratingsSnapshot = await getDocs(ratingsQuery);
      const ratingsData = ratingsSnapshot.docs.map((doc) => doc.data());
      setProductRatings(ratingsData);
    };

    getProductData();
    fetchRatings();
  }, []);

  const uploadRating = async (e) => {
    e.preventDefault();
    const userDocRef = doc(db, "users", currentUser.uid);
    const userDocSnap = await getDoc(userDocRef);
    const userData = userDocSnap.data();
    let userName = userData.userName;

    try {
      const ref = collection(db, "ratings");
      await addDoc(ref, {
        userName,
        rating,
        comment,
        productId,
        date: new Date(),
      });

      alert("You have successfully rated this product");
      setRating("");
      setComment("");
      setRateProduct(false);

      window.location.reload();
    } catch (error) {
      alert("Error adding your rating: " + error.message);
    }
  };

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

            <section className="mt-6 space-y-2 lg:block">
              <h2 className="font-semibold lg:text-2xl">Ratings</h2>

              {productRatings.length > 0 ? (
                productRatings.map((rating, index) => (
                  <div
                    key={index}
                    className="lg:w-fit min-w-[40%] space-y-2 rounded-md bg-gray-200 px-4 py-2"
                  >
                    <h2 className="space-x-4 text-xl font-semibold">
                      {rating.userName}
                    </h2>
                    <div>
                      {rating.rating},{" "}
                      {rating?.date &&
                        new Date(
                          rating.date?.seconds * 1000,
                        ).toLocaleDateString()}
                    </div>
                    <p>{rating.comment}</p>
                  </div>
                ))
              ) : (
                <p>There are no ratings for this product yet</p>
              )}
            </section>

            <div className="mt-4 flex-col lg:flex lg:w-[70%] lg:gap-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2>Purchased this product yet?</h2>
                <button
                  onClick={() => setRateProduct(true)}
                  className="w-fit rounded-lg bg-primary px-4 py-2 text-white"
                >
                  Leave a rating
                </button>
              </div>

              {rateProduct && (
                <form
                  onSubmit={(e) => uploadRating(e)}
                  className="flex flex-col gap-2"
                >
                  <select
                    name="rating"
                    id="rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="cursor-pointer rounded-md border border-gray-400 p-3"
                    required
                  >
                    <option value="" disabled selected hidden>
                      Select a rating
                    </option>
                    <option value="5 - Excellent">5 - Excellent</option>
                    <option value="4 - Good">4 - Good</option>
                    <option value="3 - Average">3 - Average</option>
                    <option value="2 - Bad">2 - Bad</option>
                    <option value="1 - Very Bad">1 - Very Bad</option>
                  </select>

                  <textarea
                    cols={10}
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="resize-none rounded-md border border-gray-400 p-3"
                    placeholder="Describe your experience (optional)"
                    required
                  ></textarea>
                  <button
                    type="submit"
                    className="rounded-md bg-primary py-3 font-semibold text-white"
                  >
                    Post
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="flex w-full flex-col gap-8 pt-16 lg:w-[40%]">
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

              {businessLink && (
                <Link
                  href={businessLink}
                  target="_blank"
                  // onClick={() => setOpenModal(true)}
                  className="rounded-lg bg-primary px-4 py-2 text-center font-bold text-white"
                >
                  Contact Seller
                </Link>
              )}
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
      <Footer />
    </>
  );
};

export default ProductDetails;
