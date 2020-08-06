import React from "react";
import { motion } from "framer-motion";
import Card from "../components/Card";
import { variants } from ".";

function Favorites() {
  return (
    <div className="container px-5 mb-10 mx-auto">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array(10)
          .fill("")
          .map((_, idx) => (
            <motion.div
              initial="initial"
              animate="animate"
              variants={variants}
              transition={{ delay: 0.25 + idx * 0.1, duration: 0.125 }}
              key={idx}
            >
              <Card
                desc={
                  "Με τον όρο Lorem ipsum αναφέρονται τα κείμενα εκείνα τα οποία είναι ακατάληπτα, δεν μπορεί δηλαδή κάποιος να βγάλει κάποιο λογικό νόημα από αυτά, και έχουν δημιουργηθεί με σκοπό να παρουσιάσουν στον αναγνώστη μόνο τα γραφιστικά χαρακτηριστικά, αυτά καθ' εαυτά, ενός κειμένου ή μιας οπτικής παρουσίασης και όχι να ."
                }
              />
            </motion.div>
          ))}
      </div>
    </div>
  );
}

export default Favorites;
