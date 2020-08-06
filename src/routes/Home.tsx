import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import Chip from "../components/Chip";
import qs from "query-string";
import { useAccount } from "../provider";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import PopOver from "../components/PopOver";
import ListItem from "../components/ListItem";
import { useQuery } from "react-query";
import { getTags } from "../api/tags";
import Qr from "../components/QrReader";
import { SET_POS } from "../provider/names";

const variants = {
  initial: {
    y: "10vh",
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
};

export default function Home() {
  const account = useAccount();
  const history = useHistory();
  const [scanQr, setScanQr] = useState(false);
  const params = qs.parse(history.location.search, { arrayFormat: "comma" });
  const _tags = (params.tags as string[]) ?? [];

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      account.dispatch({ type: SET_POS, payload: pos.coords });
    });
  }, []); //eslint-disable-line

  const { data: tags = [] } = useQuery("tags", getTags, {
    staleTime: 15000,
  });

  const push = (tags?: string[]) => {
    history.push({
      search: qs.stringify({ ...params, tags }, { arrayFormat: "comma" }),
    });
  };

  const handleTagCLick = (tag: string) => {
    const idx = _tags.indexOf(tag);
    if (~idx) {
      let newArr = Array.isArray(_tags)
        ? _tags.filter((t) => t !== tag)
        : undefined;
      push(newArr);
    } else {
      let arr = Array.isArray(_tags) ? _tags : [_tags];
      push([...arr, tag]);
    }
  };

  return (
    <div className="container px-5 mb-10 mx-auto">
      <h1 className="text-2xl mt-5 text-gray-600 font-bold leading-8">
        Καλώς ήρθες <br />
        <span role="img" aria-label="smiley-face">
          {account?.user_name && `${account?.user_name} 😊`}
        </span>
      </h1>
      <br />
      <div className="flex border shadow-md rounded-lg w-full bg-white  text-gray-700 leading-tight focus:outline-none">
        <PopOver
          className="appearance-none rounded-tl-md border-r-2 rounded-bl-md focus:outline-none  w-full h-full"
          label={
            <input
              className="focus:outline-none py-3 px-5  bg-transparent  w-full h-full"
              placeholder="Προίον 🛍️"
            />
          }
        >
          <ul>
            <ListItem>test1</ListItem>
            <ListItem>test1</ListItem>
            <ListItem>test1</ListItem>
            <ListItem>test1</ListItem>
          </ul>
        </PopOver>

        <PopOver
          position="right"
          className="appearance-none rounded-tl-md border-r-2 rounded-bl-md focus:outline-none  py-3 px-5 w-full h-full"
          label={
            <input
              className="focus:outline-none w-full h-full"
              placeholder="Κατάστημα 🏢"
            />
          }
        >
          <ul>
            <ListItem>κοντά μου </ListItem>
            <ListItem>test1</ListItem>
            <ListItem>test1</ListItem>
            <ListItem>test1</ListItem>
            <ListItem>test1</ListItem>
          </ul>
        </PopOver>

        <button
          onClick={() => setScanQr(true)}
          className="appearance-none px-3 py-2 focus:outline-none bg-transparent text-lg"
        >
          <span role="img" aria-label="camera">
            📷
          </span>
        </button>
      </div>
      <br />
      <div className={`flex justify-start my-3 overflow-x-auto`}>
        {tags.map((obj, idx) => (
          <Chip
            onClick={handleTagCLick}
            active={_tags.includes(obj.tag_name)}
            key={idx}
          >
            {obj.tag_name}
          </Chip>
        ))}
      </div>
      <br />
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
      {scanQr && <Qr onClose={() => setScanQr(false)} />}
    </div>
  );
}
