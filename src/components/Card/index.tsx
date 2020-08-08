import React from "react";
import { Product } from "../../api/products";

export default (
  props: Product & {
    favorite: boolean;
    deleteFavorite: (id: string) => void;
    addFavorite: (id: string) => void;
  }
) => {
  const favoriteIcon = props.favorite ? "💔" : "❤️";
  return (
    <div className="w-full max-w-sm mx-auto shadow border rounded-lg overflow-hidden">
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1532667449560-72a95c8d381b"
          className="flex items-end justify-end h-56 w-full bg-cover object-cover"
        />
        {props.favorite && (
          <div className="absolute shadow-md flex m-auto right-0 top-0 mr-3 bg-indigo-500 px-3 py-1 text-white rounded-bl-lg rounded-br-lg">
            Αγαπημένο
          </div>
        )}
      </div>

      <div className="px-5 pt-3">
        <h3 className="text-gray-700 font-bold uppercase">
          {props.product_name}
        </h3>
        <span className="text-gray-700 mt-2">{props.price}€</span>
      </div>
      <div className="w-full  my-3 px-3 flex justify-end">
        <button className="hover:shadow focus:outline-none hover:bg-indigo-500 hover:text-white transition-all duration-100  bg-gray-300 rounded text-sm px-4 py-2 mr-2 text-gray-700 font-bold w-full">
          Αγόρα Τώρα
        </button>
        <button className="hover:shadow focus:outline-none transition-shadow bg-gray-300 rounded px-4 py-2 mr-2">
          <span role="img" aria-label="cart">
            🛒
          </span>
        </button>
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
    </div>
  );
};
