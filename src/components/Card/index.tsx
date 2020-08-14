import React, { useMemo } from "react";
import { Product } from "../../api/products";
import { useAccount } from "../../provider";
import { useHistory } from "react-router-dom";
import qs from "query-string";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../../provider/names";

export default (
  props: Product & {
    favorite: boolean;
    deleteFavorite: (id: string) => void;
    addFavorite: (id: string) => void;
    onBuyNow?: () => void;
  }
) => {
  const account = useAccount();
  const history = useHistory();
  const params = qs.parse(history.location.search, { arrayFormat: "comma" });

  const pushQuery = (obj: Record<string, any>) => {
    history.push({
      search: qs.stringify({ ...params, ...obj }, { arrayFormat: "comma" }),
    });
  };

  const addToCart = () => {
    const {
      favorite,
      deleteFavorite,
      addFavorite,
      onBuyNow,
      ...product
    } = props;
    account.dispatch({ type: ADD_TO_CART, payload: product });
  };

  const removeFromCart = () => {
    account.dispatch({ type: REMOVE_FROM_CART, payload: props.id });
  };

  const isInCart = useMemo(
    () => Boolean(account.cart?.filter((c) => c.id === props.id)?.length),
    [account.cart, props.id]
  );

  const favoriteIcon = props.favorite ? "💔" : "❤️";
  return (
    <div className="w-full pb-3 max-w-sm mx-auto shadow border rounded-lg overflow-hidden">
      <div className="relative">
        <img
          src="https://source.unsplash.com/random"
          className="flex items-end justify-end h-56 w-full bg-cover object-cover"
          alt="background-cover"
        />
        {props.favorite && (
          <div className="absolute shadow-md z-40 flex m-auto right-0 top-0 mr-3 bg-indigo-500 px-3 py-1 text-white rounded-bl-lg rounded-br-lg">
            Αγαπημένο
          </div>
        )}
        <div className="bgImgCover flex flex-col-reverse top-0 left-0 pl-4 pb-2 text-white w-full z-30 h-full absolute">
          <span>{props.price}€</span>
          <h3 className="font-bold uppercase">{props.product_name}</h3>
        </div>
      </div>

      <div className="px-5 flex my-2 pt-1">
        <div className="text-indigo-500 relative font-bold  w-full leading-5 mt-2">
          <span
            onClick={() =>
              pushQuery({
                storeId: props.store_id,
                storeSearchTerm: props.store_name,
              })
            }
            className="underline cursor-pointer mr-4 w-full"
          >
            {props.store_name}
          </span>
          <br />
          <a
            target="_"
            href={`https://www.google.com/maps/dir/@//${props.coords.y},${props.coords.x}/@${props.coords.y},${props.coords.x},17z`}
          >
            <img
              aria-label="location pin"
              alt="location"
              className="absolute w-6 right-0 top-0"
              src="/images/pin.svg"
            />
          </a>
          <span className="text-gray-600 font-light text-xs ">
            {props.address}{" "}
          </span>
        </div>
      </div>
      {account.token && (
        <div className="w-full mt-5  px-3 flex justify-end">
          <button
            onClick={props?.onBuyNow}
            className="hover:shadow focus:outline-none hover:bg-indigo-500 hover:text-white transition-all duration-100  bg-gray-300 rounded text-sm px-4 py-2 mr-2 text-gray-700 font-bold w-full"
          >
            Αγόρα Τώρα
          </button>
          {params.storeId && (
            <div className="relative">
              {isInCart && (
                <span
                  role="img"
                  aria-label="check"
                  className="font-bold shadow -mt-3 -mr-1  right-0 w-6 h-6 flex items-center justify-center text-xs text-center absolute bg-green-500 text-white rounded-full "
                >
                  ✓{" "}
                </span>
              )}

              <button
                onClick={isInCart ? removeFromCart : addToCart}
                className="hover:shadow focus:outline-none transition-shadow bg-gray-300 rounded px-4 py-2 mr-2"
              >
                <span role="img" aria-label="cart">
                  🛒
                </span>
              </button>
            </div>
          )}
          <button
            onClick={(evt) => {
              evt.preventDefault();
              props.favorite
                ? props.deleteFavorite(props.id)
                : props.addFavorite(props.id);
            }}
            className="hover:shadow focus:outline-none transition-shadow bg-gray-300 rounded px-4 py-2"
          >
            <span role="img" aria-label="favorite">
              {favoriteIcon}
            </span>
          </button>
        </div>
      )}
    </div>
  );
};
