import { ChevronRight } from 'lucide-react';
import Link from "next/link";

const SettingNavBar = () => {
  return (
    <nav className="flex h-screen w-[30vw] flex-col justify-evenly rounded-lg p-4 shadow-lg">
      <ul className="flex h-full flex-col justify-evenly [&_li]:flex [&_li]:items-center [&_li]:justify-between [&_li]:border-b-2 [&_li]:border-neutral-400 [&_li]:p-3">
        <Link href="/settings">
          <li>
            Personal Details
            <span className="text-2xl">
              <ChevronRight/>
            </span>
          </li>
        </Link>
        <Link href="/settings/change-phone-number">
          <li>
            Change Phone Number
            <span className="text-2xl">
              <ChevronRight/>
            </span>
          </li>
        </Link>
        <Link href="/settings/delivery-details">
          <li>
            Delivery Details
            <span className="text-2xl">
              <ChevronRight/>
            </span>
          </li>
        </Link>
        <Link href="/settings/change-password">
          <li>
            Change Password
            <span className="text-2xl">
              <ChevronRight/>
            </span>
          </li>
        </Link>
        <Link href="/settings/linked-accounts">
          <li>
            Linked Accounts
            <span className="text-2xl">
              <ChevronRight/>
            </span>
          </li>
        </Link>
        <Link href="/settings/account-status">
          <li>
            Account Status
            <span className="text-2xl">
              <ChevronRight/>
            </span>
          </li>
        </Link>
      </ul>
    </nav>
  );
};

export default SettingNavBar;
