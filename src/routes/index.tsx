import React from "react";

import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Favorites from "./Favorites";

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
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/favorites" component={Favorites} />
    </Switch>
  );
}

export default MyApp;
