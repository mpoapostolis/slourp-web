import React from "react";
import PopOver from "../PopOver";
import { useAccount } from "../../provider";
import { LOGOUT } from "../../provider/names";

export default () => {
  const account = useAccount();
  const logout = () => account.dispatch({ type: LOGOUT });
  return (
    <PopOver
      position="right"
      label={
        account.avatar ? (
          <img
            src={account.avatar}
            className="-mt-2 border w-10 h-10 cursor-pointer select-none rounded-full bg-gray-400 flex items-center justify-center"
          />
        ) : (
          <div className="-mt-2 border w-10 h-10 cursor-pointer select-none rounded-full bg-gray-400 flex items-center justify-center">
            {account?.user_name[0].toUpperCase()}
          </div>
        )
      }
    >
      <button onClick={logout}>Αποσύνδεση</button>
    </PopOver>
  );
};
