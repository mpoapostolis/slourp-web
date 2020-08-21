import React from "react";

import { Switch, Route, useLocation } from "react-router-dom";
import Home from "./Home";
import History from "./History";

export const variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.25,
      ease: "easeInOut",
    },
  },
};

function MyApp() {
  const location = useLocation();
  return (
    <Switch key={location.pathname}>
      <Route path="/" exact component={Home} />
      <Route path="/history" exact component={History} />
    </Switch>
  );
}

export default MyApp;
