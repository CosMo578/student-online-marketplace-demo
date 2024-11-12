import Link from "next/link";
import Image from "next/image";
import { Bookmark } from "lucide-react";

function ProductsListing({ filteredProducts, addSavedItem }) {
  return (
    <div className="grid items-start gap-5 px-5 pt-10 md:grid-cols-2 lg:grid-cols-4 lg:px-20">
      {filteredProducts?.map((product) => {
        return (
          <div
            key={product?.id}
            className="overflow-hidden rounded-lg bg-gray-200 shadow"
          >
            <Link
              href={`/products/${product?.name.replace(/\s+/g, "-").toLowerCase()}?id=${product?.id}`}
            >
              <Image
                className="h-[250px] w-full object-cover"
                src={product?.images[0]}
                alt="product image"
                width="300"
                height="300"
              />
            </Link>

            <div className="flex flex-col p-4 pt-5">
              <h2>{product?.name}</h2>
              <p className="py-3 text-xl font-semibold">
                ₦ {Intl.NumberFormat().format(product?.price)}
              </p>

              <button
                onClick={() => addSavedItem(product.id)}
                className="flex items-center justify-center gap-2 rounded-lg bg-primary p-4 font-semibold text-white"
              >
                Add to WishList <Bookmark />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductsListing;
