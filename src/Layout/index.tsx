import React, { useEffect } from "react";
import Header from "../components/Header";
import Routes from "../routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAccount } from "../provider";
import { LOGOUT } from "../provider/names";

export default () => {
  const account = useAccount();

  useEffect(() => {
    window.addEventListener("__logout", () => {
      account.dispatch({ type: LOGOUT });
    });
    return () => {
      window.removeEventListener("__logout", () => void 0);
    };
  }, []); //eslint-disable-line

  return (
    <>
      <Header />
      <Routes />
      <ToastContainer />
    </>
  );
};
