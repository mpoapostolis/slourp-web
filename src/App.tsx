import React from "react";
import "./App.css";
import Layout from "./Layout";
import AccountProvider from "./provider";
import { BrowserRouter, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

function App() {
  return (
    <BrowserRouter>
      <AccountProvider>
        <AnimatePresence exitBeforeEnter>
          <Route component={Layout} />
        </AnimatePresence>
      </AccountProvider>
    </BrowserRouter>
  );
}

export default App;
