"use client";
import Link from "next/link";
import Drawer from "./Drawer";
import Image from "next/image";
import { getAuth, signOut } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { auth, db } from "@/app/config/firebase";
import { AuthContext } from "@/app/Context/AuthContext";
import { useShoppingCart } from "@/app/Context/ShoppingCartContext";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  Bookmark,
  LayoutDashboard,
  ListCollapse,
  LogOut,
  MessageCircleMore,
} from "lucide-react";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const Header = ({ value, setValue, select, setSelect }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [accountType, setAccountType] = useState("");
  const { currentUser } = useContext(AuthContext);
  const { savedItems } = useShoppingCart();
  const pathname = usePathname();

  const userId = auth?.currentUser?.uid;

  useEffect(() => {
    async function getUserByUid() {
      try {
        if (!userId) {
          return;
        }
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const accountType = userSnap.data().accountType;
          setAccountType(accountType);
        } else {
          console.log("No such user found!");
          return null;
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
    getUserByUid();
  }, [userId]);

  const logout = async () => {
    try {
      signOut(auth);
      document.cookie = "token=; Max-Age=0; path=/"; // Clear token
      router.push("/"); // Redirect to login
    } catch (error) {
      console.log(error);
    }
  };

  const storeContactInfo = async () => {
    const contactUrl = prompt("Enter your WhatsApp/WhatsApp Business link");
    if (!contactUrl.includes("https://wa.me/")) {
      alert("Invalid WhatsApp link");
      return;
    } else {
      const docRef = await doc(db, "users", userId);
      await updateDoc(docRef, { businessLink: contactUrl });
      alert("Successfully updated WhatsApp Link");
    }
  };

  return (
    <nav className="z-20 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between gap-4 p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image src="/pti-logo.svg" alt="PTI logo" width={60} height={60} />
        </Link>

        <div className="flex gap-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="relative inline-flex items-center rounded-lg bg-neutral-200 p-3 text-center text-black"
            >
              <Bookmark />
              <span className="sr-only">Cart Quantity</span>
              <div className="absolute -end-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-primary text-xs font-bold text-white">
                {savedItems?.length}
              </div>
            </button>

            <Drawer open={open} setOpen={setOpen} />
          </div>

          {currentUser ? (
            <Menu as="div" className="relative ml-3">
              <MenuButton className="relative flex rounded-full bg-gray-800 text-sm">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                {currentUser?.photoURL ? (
                  <Image
                    className="cursor-pointer rounded-full"
                    src={currentUser?.photoURL}
                    alt="user photo"
                    width={50}
                    height={50}
                  />
                ) : (
                  <Image
                    className="cursor-pointer rounded-full"
                    src="/user-dummy.png"
                    alt="user photo"
                    width={50}
                    height={50}
                  />
                )}
              </MenuButton>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                {accountType === "seller" && (
                  <>
                    <MenuItem>
                      <Link
                        href="/seller/my-products"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                      >
                        <ListCollapse className="me-2 inline size-4" />
                        My Products
                      </Link>
                    </MenuItem>

                    <MenuItem>
                      <Link
                        href="/seller/create-product"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                      >
                        <LayoutDashboard className="me-2 inline size-4" />
                        Create Product
                      </Link>
                    </MenuItem>

                    <MenuItem>
                      <div
                        onClick={storeContactInfo}
                        className="flex cursor-pointer items-center px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                      >
                        <MessageCircleMore className="me-2 inline size-4" />
                        Update Contact Info
                      </div>
                    </MenuItem>
                  </>
                )}

                <MenuItem>
                  <span
                    onClick={() => logout()}
                    className="flex cursor-pointer items-center px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
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

        {pathname == "/products" && (
          <form className="relative flex flex-col overflow-hidden rounded-lg border border-gray-300 bg-gray-50 lg:flex-row lg:items-stretch lg:gap-3 lg:pe-10">
            <select
              id="category"
              className="w-full cursor-pointer rounded-lg text-sm lg:w-[40%]"
              value={select}
              onChange={(e) => setSelect(e.target.value)}
            >
              {[
                { text: "all" },
                { text: "courseMaterials" },
                { text: "clothes" },
                { text: "electronics" },
                { text: "kitchenUtensils" },
                { text: "furniture" },
                { text: "shoes" },
                { text: "miscellaneous" },
              ]?.map((option, index) => {
                return (
                  <option
                    key={index}
                    value={option.text}
                    onClick={() => setSelect(option.text)}
                    className="uppercase"
                  >
                    {option.text == "all"
                      ? "Filter item by category"
                      : option.text}
                  </option>
                );
              })}
            </select>

            <div className="overflow-hidden lg:w-[60%]">
              <label
                htmlFor="default-search"
                className="sr-only mb-2 text-sm font-medium text-gray-900"
              >
                Search
              </label>

              <div className="pointer-events-none absolute end-0 hidden items-center pe-3 lg:inset-y-0 lg:flex">
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
                type="text"
                id="default-search"
                className="block border-0 p-4 text-gray-900"
                placeholder="Search for products by name..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required
              />
            </div>
          </form>
        )}
      </div>
    </nav>
  );
};

export default Header;
