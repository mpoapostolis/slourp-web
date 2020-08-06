import React from "react";

import { Switch, Route, useLocation } from "react-router-dom";
import Home from "./Home";
import Favorites from "./Favorites";
import { motion } from "framer-motion";

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
    <Switch location={location} key={location.key}>
      <motion.main
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={variants}
      >
        <Route path="/" exact component={Home} />
        <Route path="/favorites" component={Favorites} />
      </motion.main>
    </Switch>
  );
}

export default MyApp;
