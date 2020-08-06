import React from "react";
import Header from "../components/Header";
import { motion } from "framer-motion";
import Routes from "../routes";

const variants = {
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

export default () => (
  <main className={`bg-gray-100 main__page`}>
    <Header />
    <br />
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
    >
      <Routes />
    </motion.div>
  </main>
);
