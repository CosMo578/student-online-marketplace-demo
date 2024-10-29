import Image from 'next/image';

const LinkedAccounts = () => {
  return (
    <div className="mx-auto mt-10 w-[90%]">
      <h2 className="mb-2 text-2xl font-medium">Linked Accounts</h2>
      <p className="text-neutral-500">
        We&apos;ll use this to let you sign in and populate your profile
        information
      </p>
      <div className="mt-6 flex items-center gap-3">
        <span className="text-6xl">
          <Image
            src="/svg/google.svg"
            alt="google icon"
            width={20}
            height={20}
          />
        </span>
        <p className="font-medium">Google</p>
        <button className="ml-auto rounded-lg bg-gray-400 p-3 text-white">
          Linked
        </button>
      </div>
    </div>
  );
};
export default LinkedAccounts;
