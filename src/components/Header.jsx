"use client";
import Link from "next/link";
import Drawer from "./Drawer";
import Image from "next/image";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { auth } from "@/app/config/firebase";
import { AuthContext } from "@/app/Context/AuthContext";
import { useShoppingCart } from "@/app/Context/ShoppingCartContext";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Heart, LogOut, LucideShoppingCart, Settings } from "lucide-react";

const Header = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { searchParams, setSearchParams } = useShoppingCart();

  const logout = async () => {
    try {
      signOut(auth);
      document.cookie = "token=; Max-Age=0; path=/"; // Clear token
      router.push("/login"); // Redirect to login
    } catch (error) {
      console.log(error);
    }
  };

  const { cartItems } = useShoppingCart();

  return (
    <nav className="z-20 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center whitespace-nowrap text-2xl font-semibold">
            StudCommerce
          </span>
        </Link>

        <div className="flex gap-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
          <div className="flex gap-4">
            {cartItems?.length !== 0 && (
              <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="relative inline-flex items-center rounded-lg bg-neutral-200 p-3 text-center text-black"
              >
                <LucideShoppingCart />
                <span className="sr-only">Cart Quantity</span>
                <div className="absolute -end-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-primary text-xs font-bold text-white">
                  {cartItems?.length}
                </div>
              </button>
            )}

            <Drawer open={open} setOpen={setOpen} />
          </div>

          {currentUser ? (
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  {currentUser?.photoURL && (
                    <Image
                      className="cursor-pointer rounded-full"
                      src={currentUser?.photoURL}
                      alt="user photo"
                      width={50}
                      height={50}
                    />
                  )}
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                {/* <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                    >
                      Your Profile
                    </a>
                  </MenuItem> */}

                <MenuItem>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                  >
                    <Settings className="me-2 inline size-4" />
                    Settings
                  </Link>
                </MenuItem>

                <MenuItem>
                  <Link
                    href="/favourites"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                  >
                    <Heart className="me-2 inline size-4" /> Favourites
                  </Link>
                </MenuItem>
                <MenuItem>
                  <span
                    onClick={() => logout()}
                    className="block cursor-pointer px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                  >
                    <LogOut className="me-2 inline size-4" /> Sign out
                  </span>
                </MenuItem>
              </MenuItems>
            </Menu>
          ) : (
            <Link href="/login">
              <button
                type="button"
                className="rounded-lg bg-primary px-4 py-2 text-center font-bold text-white"
              >
                Login
              </button>
            </Link>
          )}
        </div>

        <form className="relative rounded-lg border border-gray-300 bg-gray-50 pr-10 ps-10">
          <label
            htmlFor="default-search"
            className="sr-only mb-2 text-sm font-medium text-gray-900"
          >
            Search
          </label>
          <div className="">
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
              <svg
                className="h-4 w-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>

            <input
              type="search"
              id="default-search"
              className="me-12 block p-4 text-gray-900 outline-none focus:outline-none"
              placeholder="Search Anything..."
              value={searchParams}
              onChange={(e) => setSearchParams(e.target.value)}
              required
            />

            <button
              type="submit"
              className="absolute bottom-2.5 end-2.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </nav>
  );
};

export default Header;
