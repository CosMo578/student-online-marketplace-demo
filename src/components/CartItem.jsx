import Image from "next/image";
import data from "/data.json";
import { useShoppingCart } from "@/app/Context/ShoppingCartContext";
import { Minus, Plus } from "lucide-react";

export function CartItem({ id, quantity }) {
  const { increaseCartQty, decreaseCartQty, removeFromCart } =
    useShoppingCart();

  let item = data?.find((product) => product.id == id);
  if (item == null) return null;

  return (
    <div key={item.id} className="border-b-2 py-4">
      <div className="mb-6 flex items-center gap-4">
        <Image
          className="rounded-md"
          src={item.images[0]}
          alt="item image"
          width={125}
          height={75}
        />

        <div>
          <h2 className="text-xl font-semibold">{item.title}</h2>
          <p className="mt-2 text-xl">
            NGN {Intl.NumberFormat().format(item?.price)}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          className="rounded-md bg-red-500 px-4 py-1.5 text-white"
          onClick={() => removeFromCart(item.id)}
        >
          Remove
        </button>

        <div className="flex items-center gap-3">
          <button
            className="flex items-center justify-center rounded-md bg-neutral-500 p-3 text-white"
            onClick={() => decreaseCartQty(item.id)}
          >
            <Minus className="size-3 font-semibold" />
          </button>

          <p className="text-base">{quantity}</p>

          <button
            className="flex items-center justify-center rounded-md bg-neutral-500 p-3 text-white"
            onClick={() => increaseCartQty(item.id)}
          >
            <Plus className="size-3 font-semibold" />
          </button>
        </div>
      </div>
    </div>
  );
}
