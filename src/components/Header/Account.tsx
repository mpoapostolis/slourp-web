import React from "react";
import PopOver from "../PopOver";
import { useAccount } from "../../provider";
import { LOGOUT } from "../../provider/names";
import { queryCache } from "react-query";

export default () => {
  const account = useAccount();
  const logout = () => {
    queryCache.removeQueries("favorites");
    account.dispatch({ type: LOGOUT });
  };
  return (
    <PopOver
      position="right"
      label={
        account.avatar ? (
          <img
            alt="avatar"
            src={account.avatar}
            className="-mt-2 border w-8 h-8 cursor-pointer select-none rounded-full bg-gray-400 flex items-center justify-center"
          />
        ) : (
          <div className="-mt-2 border w-8 h-8 cursor-pointer select-none rounded-full bg-gray-400 flex items-center justify-center">
            {account?.user_name[0].toUpperCase()}
          </div>
        )
      }
    >
      <div className="px-4 py-2 font-bold flex cursor-pointer items-center text-grey-300">
        {account.avatar ? (
          <img
            alt="avatar"
            src={account.avatar}
            className="w-6 mr-5 select-none rounded-full bg-gray-400 flex items-center justify-center"
          />
        ) : (
          <div className="w-6 h-6 mr-5 text-xs select-none rounded-full bg-gray-400 flex items-center justify-center">
            {account?.user_name[0].toUpperCase()}
          </div>
        )}
        <strong>{account.user_name}</strong>
      </div>

      <div className="px-4 py-2 font-bold flex cursor-pointer items-center text-grey-300">
        <img src="/images/loyalty.svg" alt="loyalty" className="w-6 mr-5" />
        <strong>{account.loyalty_points}</strong> &nbsp; Slourps
      </div>
      <div
        onClick={logout}
        className="px-4 py-2 font-bold flex cursor-pointer items-center text-grey-300"
      >
        <img src="/images/logout.svg" alt="loyalty" className="w-6 h-4 mr-5" />
        Αποσύνδεση
      </div>
    </PopOver>
  );
};
