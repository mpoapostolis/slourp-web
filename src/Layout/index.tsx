import React from "react";
import Header from "../components/Header";
import Routes from "../routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default () => (
  <>
    <Header />
    <Routes />
    <ToastContainer />
  </>
);
