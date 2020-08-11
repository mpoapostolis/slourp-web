import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import Chip from "../components/Chip";
import qs from "query-string";
import { useAccount } from "../provider";
import { useHistory } from "react-router-dom";

import PopOver from "../components/PopOver";
import ListItem from "../components/ListItem";
import {
  useQuery,
  usePaginatedQuery,
  useMutation,
  queryCache,
} from "react-query";
import { getTags } from "../api/tags";
import Qr from "../components/QrReader";
import { SET_POS } from "../provider/names";
import { getProducts, ProductResponse, Product } from "../api/products";
import { getFavorites, deleteFavorite, addFavorite } from "../api/favorites";
import { useInView } from "react-intersection-observer";
import Modal from "../components/Modal";

export default function Home() {
  const history = useHistory();
  const account = useAccount();
  const [cursor, setCursor] = useState(1);
  const [scanQr, setScanQr] = useState(false);
  const [cartItems, setCartItem] = useState<Product[]>([]);
  const [buyModal, setBuyModal] = useState(false);
  const [productSuggestion, setProductSuggestion] = useState<string[]>([]);
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
  const { resolvedData: products, isFetching } = usePaginatedQuery(
    ["products", { productSearchTerm: params.productSearchTerm, cursor }],
    getProducts,
    {
      staleTime: 15000,
      onSuccess: (res: ProductResponse) => {
        setProductSuggestion(
          res.data.slice(0, 10).map((obj) => obj.product_name)
        );
      },
    }
  );

  const { data: favorites = [] } = useQuery(["favorites"], getFavorites, {
    enabled: account.token,
  });

  const [_deleteFavorite] = useMutation(deleteFavorite, {
    onSuccess: (_res, id) => {
      const tmp = favorites.filter((f) => f.product_id !== id);
      queryCache.setQueryData("favorites", tmp);
    },
  });

  const [_addFavorite] = useMutation(addFavorite, {
    onSuccess: (_res, id) => {
      const product = { ...products?.data.find((o) => o.id === id) } as any;
      product.product_id = product.id;
      queryCache.setQueryData("favorites", [...favorites, product]);
    },
  });

  const pushQuery = (obj: Record<string, any>) => {
    history.push({
      search: qs.stringify({ ...params, ...obj }, { arrayFormat: "comma" }),
    });
  };

  const handleTagCLick = (tag: string) => {
    const idx = _tags.indexOf(tag);
    if (~idx) {
      let tags = Array.isArray(_tags)
        ? _tags.filter((t) => t !== tag)
        : undefined;
      pushQuery({ tags });
    } else {
      let arr = Array.isArray(_tags) ? _tags : [_tags];
      pushQuery({ tags: [...arr, tag] });
    }
  };

  const [ref, inView] = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      setCursor((c) => c + 1);
    }
  }, [inView]); //eslint-disable-line

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
          position="right"
          className="rounded-tl-md border-r-2 rounded-bl-md focus:outline-none  py-3 px-5 w-full h-full"
          label={
            <input
              type="search"
              value={params.storeSearchTerm || ""}
              onChange={(evt) => {
                pushQuery({
                  storeSearchTerm: evt.currentTarget.value.length
                    ? evt.currentTarget.value
                    : undefined,
                  storeId: evt.currentTarget.value.length
                    ? params.storeId
                    : undefined,
                });
              }}
              className="focus:outline-none font-bold text-gray-600 w-full h-full"
              placeholder="Κατάστημα 🏢"
            />
          }
        >
          <ul>
            <ListItem>
              <div className="flex">
                <img
                  className="w-5 h5 mr-4"
                  src="/images/pin.svg"
                  aria-label="location pin"
                  alt="location"
                />
                <span>κοντά μου</span>
              </div>
            </ListItem>
          </ul>
        </PopOver>

        <PopOver
          className="rounded-tl-md border-r-2 rounded-bl-md focus:outline-none  w-full h-full"
          label={
            <input
              type="search"
              value={params.productSearchTerm || ""}
              onChange={(evt) =>
                pushQuery({
                  productSearchTerm: evt.currentTarget.value.length
                    ? evt.currentTarget.value
                    : undefined,
                })
              }
              className="focus:outline-none py-3 px-5 font-bold text-gray-600 bg-transparent  w-full h-full"
              placeholder="Προίον 🛍️"
            />
          }
        >
          <ul>
            {productSuggestion.map((title) => (
              <ListItem
                onClick={() =>
                  pushQuery({
                    productSearchTerm: title,
                  })
                }
                key={title}
              >
                {title}
              </ListItem>
            ))}
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
      {products?.total ? (
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products?.data.map((obj, idx) => (
            <Card
              onBuyNow={(obj: Product) => {
                setCartItem([obj]);
                setBuyModal(true);
              }}
              onAddToCart={(obj: Product) =>
                setCartItem((s) => s && [...s, obj])
              }
              key={idx}
              {...obj}
              deleteFavorite={_deleteFavorite}
              addFavorite={_addFavorite}
              favorite={favorites.map((obj) => obj.product_id).includes(obj.id)}
            />
          ))}
        </div>
      ) : (
        <img
          className="w-full h-full"
          alt="not-found"
          src="/images/not-found.svg"
        />
      )}
      <div ref={ref} className="flex w-full justify-center">
        {isFetching && <div className="spinner" />}
      </div>

      {scanQr && (
        <Qr
          onScan={(str) => {
            if (str) {
              qs.parse(str);
              pushQuery(qs.parse(str));
              setScanQr(false);
            }
          }}
          onClose={() => setScanQr(false)}
        />
      )}
      <Modal
        productList={cartItems}
        onClose={() => setBuyModal(false)}
        open={buyModal}
      />
    </div>
  );
}
