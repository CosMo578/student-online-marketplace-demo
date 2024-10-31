// import Header from "@/components/Header";
// import Hero from "@/components/Hero";

import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-gray-50 py-4 shadow-md">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <a className="text-primary-300 block" href="/">
              <span className="sr-only">Home</span>
              {/* <Image
                className="text-3xl"
                src="/logoipsum.svg"
                alt=""
                width={40}
                height={25}
              /> */}
              <h1 className='text-2xl font-semibold text-primary'>Student Marketplace</h1>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <Link
                className="bg-primary hover:bg-primary rounded-lg px-6 py-2.5 font-semibold text-white shadow"
                href="/login"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const Hero = () => {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-24 lg:flex lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Empowering Students
            <strong className="text-primary block font-extrabold sm:block">
              Connecting Resources
            </strong>
            all in one place
          </h1>

          <p className="mt-4 text-gray sm:text-xl/relaxed">
            Buy, Sell, or trade textbooks, coursematerials, <br /> and more - all in a secure student focused platform.
          </p>

          <Link href="/signup">
            <button className="bg-primary hover:bg-primary-500 mt-4 rounded-lg px-8 py-4 font-semibold text-white sm:w-auto">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

const LandingPage = () => {
  return (
    <div className="max-h-screen">
      <Header />
      <Hero />
    </div>
  );
};
export default LandingPage;
