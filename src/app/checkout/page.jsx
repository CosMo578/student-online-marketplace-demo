"use client";
import CheckoutPage from "@/components/CheckoutPage";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useShoppingCart } from "../Context/ShoppingCartContext";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const Checkout = () => {
  const { totalVal } = useShoppingCart();

  return (
    <div className="grid h-screen w-full place-items-center">
      <div>
        <h1 className="text-2xl font-semibold">
          Make ${Intl.NumberFormat().format(totalVal)} payment for cart items
        </h1>

        <div className="mt-8">
          <Elements
            stripe={stripePromise}
            options={{
              mode: "payment",
              amount: convertToSubcurrency(totalVal),
              currency: "usd",
            }}
          >
            <CheckoutPage amount={totalVal} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
