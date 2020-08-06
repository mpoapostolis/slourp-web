import React from "react";
import Rating from "../Rating";
import { HTMLProps } from "react";
import { Link } from "react-router-dom";

type Props = {
  desc: string;
} & HTMLProps<HTMLDivElement>;

export default (props: Props) => (
  <Link to="/id">
    <div className="relative cursor-pointer">
      <img
        className="shadow-lg h-56 w-full object-cover relative rounded-lg"
        src="https://dummyimage.com/qvga"
      />
      <div className="absolute bottom-0 left-0 w-1/3 bg-gray-200 rounded-tr-lg p-2 text-xs">
        <span className="font-bold">{`{name}`} </span> <br />
        <span className="font-bold">25€</span>
        <Rating />
      </div>
    </div>
  </Link>
);
