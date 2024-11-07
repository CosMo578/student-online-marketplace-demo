import Image from "next/image";
import data from "/data.json";
import { useShoppingCart } from "@/app/Context/ShoppingCartContext";
import Link from 'next/link';

export function CartItem({ id, quantity }) {
  const { increaseCartQty, decreaseCartQty, removeFromCart } =
    useShoppingCart();

  let item = data?.find((product) => product.id == id);
  if (item == null) return null;

  return (
    <Link
      href={`/products/${item?.title.replace(/\s+/g, "-").toLowerCase()}?id=${item?.id}`}
    >
      <div
        key={item.id}
        className="cursor-pointer overflow-hidden rounded-lg bg-gray-200"
      >
        <div className="flex items-center gap-4">
          <Image
            className="h-full max-md:w-[40%]"
            src={item.images[0]}
            alt="item image"
            width={170}
            height={95}
          />

          <div className='p-2'>
            <h2 className="lg:text-xl font-semibold">{item.title}</h2>
            <p className="mt-2 lg:text-xl">
              ₦ {Intl.NumberFormat().format(item?.price)}
            </p>
          </div>
        </div>

        {/* <div className="flex items-center justify-between">
        <button
          className="rounded-md bg-red-500 px-4 py-1.5 text-white"
          onClick={() => removeFromCart(item.id)}
        >
          XIcon
        </button>
      </div>
         */}
      </div>
    </Link>
  );
}
