import React from "react";
import { Link, useLocation } from "react-router-dom";
import Login from "./Login";
import { useAccount } from "../../provider";
import Account from "./Account";

const Header = () => {
  const location = useLocation();
  const account = useAccount();
  const isActive = (path: string) =>
    path === location.pathname ? "border-b-2 border-indigo-500" : "";

  return (
    <nav className="bg-white mb-10 z-50 px-8 sticky top-0 pt-2 shadow-md">
      <div className="-mb-px text-gray-700 items-center flex justify-between">
        <img
          alt="logo"
          src="/images/logo.png"
          className="w-20 hidden sm:block"
        />
        {account.token ? (
          <div className="-mb-px text-gray-700 flex">
            <Link
              to="/"
              className={`no-underline text-teal-dark ${isActive(
                "/"
              )} uppercase tracking-wide font-bold text-xs py-3 sm:mr-8 mr-5`}
            >
              <span>Αρχικη</span>
            </Link>

            <Link
              to="/favorites"
              className={`no-underline text-grey-dark ${isActive(
                "/favorites"
              )} uppercase tracking-wide font-bold text-xs py-3  sm:mr-8 mr-5`}
            >
              <span>Αγαπημενα</span>
            </Link>
          </div>
        ) : (
          <div />
        )}
        <div className="flex ">{account.token ? <Account /> : <Login />}</div>
      </div>
    </nav>
  );
};
export default Header;
