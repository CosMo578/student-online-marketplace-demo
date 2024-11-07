"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useState } from "react";

const SellerNavBar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="p-5 py-7 lg:px-8 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                onClick={() => setIsOpen((prev) => !prev)}
                type="button"
                className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 lg:hidden"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="h-6 w-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>

              <Link className="text-primary-300 ms-2 flex md:me-24" href="/">
                <Image
                  className="me-3 text-3xl"
                  src="/pti-logo.svg"
                  alt=""
                  width={50}
                  height={50}
                />
                <span className="hidden self-center whitespace-nowrap text-2xl font-semibold lg:block">
                  Seller Dashboard
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-200 bg-white pt-32 transition-transform lg:translate-x-0 ${!isOpen && "-translate-x-full"}`}
      >
        <div className="h-full overflow-y-auto bg-white px-3 pb-4">
          <ul className="flex flex-col gap-5 font-medium">
            <Link href="/seller-dashboard">
              <li
                className={`${pathname == "/seller-dashboard" ? "bg-primary text-white" : "bg-neutral-100 text-neutral-600"} group flex items-center gap-4 rounded-lg p-5`}
              >
                Products
              </li>
            </Link>

            <Link href="/seller-dashboard/create-product">
              <li
                className={`${pathname == "/seller-dashboard/create-product" ? "bg-primary text-white" : "bg-neutral-100 text-neutral-600"} group flex items-center gap-4 rounded-lg p-5`}
              >
                Create Products
              </li>
            </Link>
          </ul>
        </div>
      </aside>
    </>
  );
};
export default SellerNavBar;
