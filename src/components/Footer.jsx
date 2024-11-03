import Link from "next/link";

const Footer = () => {
  return (
    <footer className="m-4 rounded-lg bg-white shadow">
      <div className="mx-auto w-full max-w-screen-xl p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            href="/"
            className="mb-4 flex items-center space-x-3 sm:mb-0 rtl:space-x-reverse"
          >
            <span className="self-center whitespace-nowrap text-2xl font-semibold">
              Student MarketPlace
            </span>
          </Link>

          <span className="block text-sm text-gray-500 sm:text-center">
            © 2024{" "}
            <Link href="/" className="hover:underline">
              Student MarketPlace
            </Link>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
