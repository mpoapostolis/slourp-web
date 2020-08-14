import React, { useState, useEffect } from "react";
import Card from "../../components/Card";
import Chip from "../../components/Chip";
import qs from "query-string";
import { useAccount } from "../../provider";
import { useHistory } from "react-router-dom";

import {
  useQuery,
  usePaginatedQuery,
  useMutation,
  queryCache,
} from "react-query";
import { getTags } from "../../api/tags";
import { SET_POS, CLEAR_CART } from "../../provider/names";
import { getProducts, Product } from "../../api/products";
import { getFavorites, deleteFavorite, addFavorite } from "../../api/favorites";
import { useInView } from "react-intersection-observer";
import Modal from "../../components/Modal";
import Inputs from "./Inputs";

export default function Home() {
  const history = useHistory();
  const account = useAccount();
  const [cursor, setCursor] = useState(1);

  const [productList, setProductList] = useState<Product[]>([]);
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
    [
      "products",
      {
        productSearchTerm: params.productSearchTerm,
        cursor,
        storeId: params.storeId,
      },
    ],
    getProducts,
    {
      staleTime: 15000,
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
    account.dispatch({ type: CLEAR_CART });
  }, [params.storeId]); //eslint-disable-line

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

      <Inputs />

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
        <div
          className={`grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${
            isFetching ? "opacity-50" : ""
          }`}
        >
          {products?.data.map((obj, idx) => (
            <Card
              onBuyNow={() => setProductList([obj])}
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

      {account?.cart?.length && account.token && params.storeId && (
        <div
          onClick={() => setProductList(account.cart)}
          className="fixed z-50 bottom-0 cursor-pointer bg-white m-5 text-2xl shadow-lg rounded-full px-3 py-2 right-0"
        >
          <div className="font-bold -mt-4 -mr-1 right-0 w-6 h-6 flex items-center justify-center text-xs text-center absolute bg-red-500 text-white rounded-full ">
            {account.cart.length}
          </div>
          🛒
        </div>
      )}
      <Modal
        productList={productList}
        open={productList.length > 0}
        onClose={() => setProductList([])}
      />
    </div>
  );
}
