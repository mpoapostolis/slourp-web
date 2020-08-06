import React from "react";
import "./App.css";
import Layout from "./Layout";
import AccountProvider from "./provider";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <AccountProvider>
        <Layout />
      </AccountProvider>
    </BrowserRouter>
  );
}

export default App;
