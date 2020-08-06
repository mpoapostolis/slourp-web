import React from "react";

type Props = {
  className?: string;
  children: string;
  active?: boolean;
  onClick?: (e: string) => void;
};
function Chip(props: Props) {
  return (
    <div
      onClick={() => props?.onClick?.(props.children)}
      className={`px-5 py-2 cursor-pointer  text-sm rounded-full mx-1 ${
        props.active
          ? "bg-indigo-400 text-white font-bold"
          : "bg-gray-300 text-gray-700"
      }`}
    >
      {props.children}
    </div>
  );
}
export default Chip;
