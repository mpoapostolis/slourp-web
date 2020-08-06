import React from "react";
import "./App.css";
import Layout from "./Layout";
import AccountProvider from "./provider";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <AccountProvider>
      <BrowserRouter>
        <Layout />;
      </BrowserRouter>
    </AccountProvider>
  );
}

export default App;
