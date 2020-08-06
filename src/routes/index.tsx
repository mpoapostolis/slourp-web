import React from "react";
import { AnimatePresence } from "framer-motion";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";

function MyApp() {
  return (
    <AnimatePresence exitBeforeEnter>
      <Switch>
        <Route component={Home} />
      </Switch>
    </AnimatePresence>
  );
}

export default MyApp;
