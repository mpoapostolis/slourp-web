import React from "react";
import { HTMLProps } from "react";

function ListItem(props: HTMLProps<HTMLLIElement>) {
  return (
    <li
      onClick={props.onClick}
      className="cursor-pointer hover:bg-gray-200 py-2"
    >
      <h1 className="font-bold p-5 text-gray-600 py-1  text-lg">
        {props.children}
      </h1>
    </li>
  );
}

export default ListItem;
