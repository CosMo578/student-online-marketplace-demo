"use client";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

const Seller = () => {
  const searchParams = useSearchParams();
  return (
    <section className="p-8">
      <div className='bg-gray-300'>
        <div>
          <div>Seller Name</div>
          <div>4.7 / 5.0 rating</div>
        </div>

        <div>
          <h2>Products</h2>
          <div>
            <div>
              <Image src="" alt="" width="80" height="" />
              <h2>Product Name</h2>
              <p>Product Price</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Seller;
